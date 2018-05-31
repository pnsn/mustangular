import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Metric } from './metric';
import { Channel } from './channel';
import { Measurement } from './measurement';

@Injectable()
export class CombineMetricsService {

  constructor() { }
  private metrics = new Subject<Metric[]>();
    
  getMetrics() : Observable<Metric[]> {
    return this.metrics.asObservable();
  }   
  
  //returns metrics with stations and measurements added
  combineMetrics(measurements: any, stations: any, metrics: any) : void {
    let availableChannels = [];
    let combinedMetrics = new Array<Metric>();
    for (let metric of metrics){
      let combinedMetric = new Metric(metric.name, metric.title, metric.description, metric.tables[0].columns[0].name);
      for (let m of measurements[metric.name]){
        let stationCode = m.net + "." + m.sta;
        let station = combinedMetric.stations[stationCode];
        
        if (!station) {
          station = Object.create(stations[stationCode]);
          station.channels = {};
          combinedMetric.data.count++;
        }
        let channelCode = m.cha;
        let channels = station.channels;
        if (!channels[channelCode]) {
          channels[channelCode] = new Channel(channelCode);
          channels[channelCode].measurements = new Array<Measurement>();
        }
        if (availableChannels.indexOf(channelCode) == -1 ){
          availableChannels.push(channelCode);
        }
        channels[channelCode].measurements.push(new Measurement(m.end, m.lddate, m.qual, m.start, m.target, m.value));
        
        station.channels = channels;

        combinedMetric.stations[stationCode] = station;
      }
      combinedMetrics.push(combinedMetric);
    }
    
    this.metrics.next(combinedMetrics);
  }
}
