import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActiveService } from "../active.service";
import { CombineMetricsService} from '../combine-metrics.service';
import { BinningService } from '../binning.service'
import { Metric } from '../metric';
import { Active } from '../active';


@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})

export class ControlsComponent implements OnInit {
  metrics: Metric[];
  channels: Array<string>;
  
  //default values
  active = new Active(0, [], "average");
  
  displayValues = ["minimum", "maximum", "average"];
  
  binning = {
    min: <number> 0,
    max: <number> 100,
    count: <number> 3
  }
  
  //TODO: better color picker
  coloring = {
    low: "#0000ff",
    high: "#ffffff"
  };
  
  changed = false;
  
  stationCount: number;
  constructor(private activeService: ActiveService, private combineMetricsService: CombineMetricsService, private binningService: BinningService) { }
  
  ngOnInit() {
    this.activeService.setActive(this.active);
  
    this.activeService.getActive.subscribe(
      active => {
        this.active = active;
        this.stationCount = this.combineMetricsService.getStationCount(this.active.metricIndex);
      }
    );
    
    this.combineMetricsService.getMetrics.subscribe(
      metrics => { 
        this.metrics = metrics;
        this.binningService.makeBins(this.binning, this.coloring);
      }
    );
    
    this.combineMetricsService.getChannels.subscribe(
      channels => { 
        this.channels = channels;
      }
    );
  }

  valueChanged(){
    this.changed = true;
  }
  
  onSubmit(){
    console.log("active changed")
    this.changed = false;
    this.activeService.setActive(this.active);
    this.binningService.makeBins(this.binning, this.coloring);
  }
  
}
