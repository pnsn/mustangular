import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActiveService } from "../active.service";
import { CombineMetricsService} from '../combine-metrics.service';
import { Metric } from '../metric';
@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})

export class ControlsComponent implements OnInit {
  metrics: Metric[];
  channels: Array<string>;
  
  active = {
    "metric" : "",
    "channels" : []
  };
  
  stationCount: number;
  constructor(private activeService: ActiveService, private combineMetricsService: CombineMetricsService) { }
  
  ngOnInit() {
    this.activeService.getActiveMetric.subscribe(
      activeMetric => {
        this.active.metric = activeMetric;
        this.stationCount = this.combineMetricsService.getStationCount(this.active.metric);
      }
    );
    
    this.activeService.getActiveChannels.subscribe(
      activeChannels => this.active.channels = activeChannels
    );
    this.combineMetricsService.getMetrics.subscribe(
      metrics => { 
        this.metrics = metrics;
        if(this.metrics && this.metrics.length > 0) {
          this.activeService.changeMetric(this.metrics[0].name);
        } 
      }
    );
    
    this.combineMetricsService.getChannels.subscribe(
      channels => { 
        this.channels = channels;
      }
    );
  }


  changeChannels(channels) {
    console.log(channels)
    //this.activeService.changeChannels(channels);
  }
  changeMetric(metricName) {
    this.activeService.changeMetric(metricName);
  }
  
}
