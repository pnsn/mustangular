import { Injectable } from '@angular/core';
import { Metric } from './metric';
import { Channel } from './channel';
import { Measurement } from './measurement';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CombineMetricsService {

  constructor() { }
  
  private channels = new BehaviorSubject<Array<string>>([]);
  private metrics = new BehaviorSubject<Metric[]>([]);
  private stationCount = [];
  
  getMetrics = this.metrics.asObservable();
  getChannels = this.channels.asObservable();
  
  getStationCount(metricIndex:number) : number {
    return this.stationCount[metricIndex];
  }
  
  //returns metrics with stations and measurements added
  combineMetrics(measurements: any, stations: any, metrics: any) : void {
    let availableChannels = [];
    let combinedMetrics = new Array<Metric>();
    let index = 0;
    for (let metric of metrics){
      this.stationCount[index] = 0;
      let combinedMetric = new Metric(metric.name, metric.title, metric.description, metric.tables[0].columns[0].name, {});
      for (let m of measurements[metric.name]){
        let stationCode = m.net + "." + m.sta;
        let station = combinedMetric.stations[stationCode];
        
        if (!station) {
          station = Object.create(stations[stationCode]);
          station.channels = {};
          this.stationCount[index]++;
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
      index++;
    }
    

    this.channels.next(availableChannels);
    this.metrics.next(combinedMetrics);
  }
  
  //need a stationcount
}
