import { Injectable } from '@angular/core';
import { Metric } from './metric';
import {Channel} from './channel';
import {Measurement} from './measurement';

@Injectable()
export class CombineMetricsService {

  constructor() { }
  
  //returns metrics with stations and measurements added
  combineMetrics(measurements: any, stations: any, metrics: Metric[]) : Metric[]{
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
        
        channels[channelCode].measurements.push(new Measurement(m.end, m.lddate, m.qual, m.start, m.target, m.value));
        
        station.channels = channels;
        metric.stations[stationCode] = station;
      }
    }
    return metrics;
  }
}
