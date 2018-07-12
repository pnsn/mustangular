// Takes in station, metric, and measurement data and makes an object

import { Injectable} from '@angular/core';
import { Subject ,  Observable} from 'rxjs';
import { Metric } from './metric';
import { Channel } from './channel';
import { Measurement } from './measurement';
import { Station } from './station';
@Injectable()
export class CombineMetricsService {

  constructor() { }
  private metrics = new Subject<Metric[]>(); // Subscribeable metrics
  
  // Returns metrics
  getMetrics() : Observable<Metric[]> {
    return this.metrics.asObservable();
  }   
  
  // Combines metrics with station data and measurements 
  combineMetrics(measurements: any, stations: any, metrics: any) : void {
    let combinedMetrics = new Array<Metric>();
    let measurementCount = 0;
    
    // Go through each metric
    for (let metric of metrics){

      // Create a new metric object (See: metric.ts)
      let r = new RegExp('<\/*p>', 'g');
      let unit = metric.tables[0].columns[0].description.replace(r, "");

      let combinedMetric = new Metric(metric.name, metric.title.replace("Metric", ""), metric.description, unit);
      
      if(measurements[metric.name]) {
        // Sort through measurements and add them to correct metric
        for (let m of measurements[metric.name]){
          measurementCount++;
          let stationCode = m.net + "." + m.sta;
          let station = combinedMetric.stations[stationCode];

          if(stations[stationCode]) {
          
            // Create station if its the first pass 
            if (!station) {
              station = Object.assign(stations[stationCode]);
              station.code = stationCode;
              station.qual = "M";
              combinedMetric.display.data.count++;
            }

            // Add channel to station
            let loc = m.loc ? m.loc : "--";
            let channelCode = loc + "." + m.cha;
            let channels = station.channels;
            
            if (!channels[channelCode]){
              channels[channelCode] = new Channel(channelCode, loc, m.cha);
            } 
            // Add measurement to channel
            channels[channelCode].measurements.push(new Measurement(m.end, m.lddate, m.start, m.value));
        
            station.channels = channels;

            combinedMetric.stations[stationCode] = station;
          }

        }
      
      }

      combinedMetrics.push(combinedMetric);

    }
  
    if(measurementCount > 0){
      // Sends metrics out to subscriptions
      this.metrics.next(combinedMetrics);
    } else {
      this.metrics.next();  
    }
  }
}
