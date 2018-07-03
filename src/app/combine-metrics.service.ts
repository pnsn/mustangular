// Takes in station, metric, and measurement data and makes an object

import { Injectable} from '@angular/core';
import { Subject ,  Observable } from 'rxjs';
import { Metric } from './metric';
import { Channel } from './channel';
import { Measurement } from './measurement';

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
    
    // Go through each metric
    for (let metric of metrics){
      // Create a new metric object (See: metric.ts)
      let unit = metric.tables[0].columns[0].description.match(/(?<=<p>)(.*)(?=<\/p>)/i)[0];

      let combinedMetric = new Metric(metric.name, metric.title.replace("Metric", ""), metric.description, unit);
      
      // Sort through measurements and add them to correct metric
      for (let m of measurements[metric.name]){
        let stationCode = m.net + "." + m.sta;
        let station = combinedMetric.stations[stationCode];

        if(stations[stationCode]) {
          
          // Create station if its the first pass 
          if (!station) {
            station = Object.create(stations[stationCode]);
            station.code = stationCode;
            station.channels = {};
            combinedMetric.display.data.count++;
          }
          
          // Add channel to station
          let channelCode = m.cha;
          let channels = station.channels;
          
          if (!channels[channelCode]) {
            channels[channelCode] = new Channel(channelCode);
            channels[channelCode].measurements = new Array<Measurement>();
          }
          
          // Add measurement to channel
          channels[channelCode].measurements.push(new Measurement(m.end, m.lddate, m.qual, m.start, m.target, m.value));
        
          station.channels = channels;

          combinedMetric.stations[stationCode] = station;
        }

      }
      combinedMetrics.push(combinedMetric);
    }
    
    // Sends metrics out to subscriptions
    this.metrics.next(combinedMetrics);
  }
}
