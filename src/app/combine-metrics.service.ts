import { Injectable } from '@angular/core';
import { Metric } from './metric';
import { Channel } from './channel';
import { Measurement } from './measurement';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CombineMetricsService {

  constructor() { }
  
  private channels = new BehaviorSubject<Array>();
  private metrics = new BehaviorSubject<Metric[]>();
  getMetrics = this.metrics.asObservable();
  getChannels = this.channels.asObservable();
  
  //returns metrics with stations and measurements added
  combineMetrics(measurements: any, stations: any, metrics: Metric[]) : Metric[]{
    let availableChannels = [];
    for (let metric of metrics){
      metric.stations = {};
      for (let m of measurements[metric.name]){

        var stationCode = m.net + "." + m.sta;
        var station = metric.stations[stationCode];
        
        if (!station) {
          station = stations[stationCode];
          station.channels = {};
        }
        
        var channelCode = m.cha;
        var channels = station.channels;
        
        if (!channels[channelCode]) {
          channels[channelCode] = new Channel(channelCode);
          channels[channelCode].measurements = new Array<Measurement>();
        }
        
        if (availableChannels.indexOf(channelCode) == -1 ){
          availableChannels.push(channelCode);
        }
        channels[channelCode].measurements.push(new Measurement(m.end, m.lddate, m.qual, m.start, m.target, m.value));
        
        station.channels = channels;
        metric.stations[stationCode] = station;
      }
    }
    console.log(availableChannels)
    this.channels.next(availableChannels);
    this.metrics.next(metrics);
  }
}
