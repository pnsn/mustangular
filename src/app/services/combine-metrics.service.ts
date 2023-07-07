import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Metric } from "@models/metric";
import { Measurement } from "@models/measurement";
import { MeasurementData } from "./measurements.service";

/** Takes in station, metric, and measurement data and comines */
@Injectable()
export class CombineMetricsService {
  combineMetrics$(
    measurements: MeasurementData,
    metrics: Metric[]
  ): Observable<Metric[]> {
    return new Observable<Metric[]>((subscriber) => {
      const combinedMetrics = new Array<Metric>();
      // Go through each metric
      for (const metric of metrics) {
        if (measurements[metric.name]) {
          // Sort through measurements and add them to correct metric
          for (const m of measurements[metric.name]) {
            const stationCode = m.net + "." + m.sta;
            const loc = m.loc ? m.loc : "--";
            const channelCode = loc + "." + m.cha;

            // Create station if its the first pass
            const station = metric.getOrCreateStation(
              m.net,
              m.sta,
              stationCode,
              m.qual
            );

            const channel = station.getOrCreateChannel(channelCode, loc, m.cha);

            // Add measurement to channel
            channel.measurements.push(
              new Measurement(m.end, m.lddate, m.start, m.value)
            );
          }
        }

        metric.display.data.count = metric._stations.size;

        combinedMetrics.push(metric);
      }
      subscriber.next(combinedMetrics);
      subscriber.complete();
    });
  }
}
