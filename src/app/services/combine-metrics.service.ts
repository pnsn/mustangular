import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { Metric } from "@models/metric";
import { Channel } from "@models/channel";
import { Measurement } from "@models/measurement";
import { Station } from "@models/station";

/** Takes in station, metric, and measurement data and comines */
@Injectable()
export class CombineMetricsService {
  private metrics = new Subject<Metric[]>(); // Subscribeable metrics

  // Returns metrics
  getMetrics(): Observable<Metric[]> {
    return this.metrics.asObservable();
  }

  // Combines metrics with station data and measurements
  combineMetrics(measurements: any, metrics: any): void {
    const combinedMetrics = new Array<Metric>();
    let measurementCount = 0;

    // Go through each metric
    for (const metric of metrics) {
      // Create a new metric object (See: metric.ts)
      const unit = metric.tables[0].columns[0].description.replace(
        /\.*<\/*p>/g,
        ""
      );
      const combinedMetric = new Metric(
        metric.name,
        metric.title.replace("Metric", ""),
        metric.description,
        unit
      );

      if (measurements[metric.name]) {
        // Sort through measurements and add them to correct metric
        for (const m of measurements[metric.name]) {
          measurementCount++;
          const stationCode = m.net + "." + m.sta;
          let station = combinedMetric.stations[stationCode];

          // Create station if its the first pass
          if (!station) {
            station = new Station(m.net, m.sta, stationCode, m.qual);
            combinedMetric.display.data.count++;
          }

          // Add channel to station
          const loc = m.loc ? m.loc : "--";
          const channelCode = loc + "." + m.cha;
          const channels = station.channels;

          if (!channels[channelCode]) {
            channels[channelCode] = new Channel(channelCode, loc, m.cha);
          }
          // Add measurement to channel
          channels[channelCode].measurements.push(
            new Measurement(m.end, m.lddate, m.start, m.value)
          );

          station.channels = channels;
          combinedMetric.stations[stationCode] = station;
        }
      }

      combinedMetrics.push(combinedMetric);
    }

    if (measurementCount > 0) {
      // Sends metrics out to subscriptions
      this.metrics.next(combinedMetrics);
    } else {
      this.metrics.next();
    }
  }
}
