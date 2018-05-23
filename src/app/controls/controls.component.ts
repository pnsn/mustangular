import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActiveService } from "../active.service";
import { CombineMetricsService} from '../combine-metrics.service';
import { BinningService } from '../binning.service'
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
    "metricIndex" : 0,
    "channels" : [],
    "value": "average"
  };
  
  displayValues = ["minimum", "maximum", "average"];
  
  binning = {
    min: <number> 0,
    max: <number> 1,
    count: <number> 3
  }
  
  stationCount: number;
  constructor(private activeService: ActiveService, private combineMetricsService: CombineMetricsService, private binningService: BinningService) { }
  
  ngOnInit() {
    this.activeService.getActiveMetricIndex.subscribe(
      activeMetricIndex => {
        this.active.metricIndex = activeMetricIndex;
        this.stationCount = this.combineMetricsService.getStationCount(this.active.metricIndex);
      }
    );
    
    this.activeService.getActiveChannels.subscribe(
      activeChannels => this.active.channels = activeChannels
    );
    
    this.combineMetricsService.getMetrics.subscribe(
      metrics => { 
        this.metrics = metrics;
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
  changeMetric(metricIndex : number) {
    this.activeService.changeMetric(metricIndex);
  }
  
  changeValue(value: string) {
    this.activeService.changeValue(value);
  }
  
  changeBinning(value: number) {
    console.log(value)
  }
  
}
