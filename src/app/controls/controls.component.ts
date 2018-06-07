import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Metric } from '../metric';
import { DataService } from '../data.service';
import { Display } from '../display';
@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})

export class ControlsComponent implements OnInit {
  metrics: Metric[]; 
  channels: Array<string>;
  activeMetric : Metric; 
  display: Display;

  //if there isn't coloring on the metric property already, make it up
  displayValues = ["minimum", "maximum", "average"];
  
  changed = false;

  constructor(
    private dataService: DataService
  ) { }
  
  ngOnInit() {
    //make sure this is slicing off a copy of the metric
    this.dataService.getActiveMetric().subscribe(
      activeMetric => {
        this.activeMetric = Object.assign(activeMetric);
        this.display = activeMetric.display;
        this.metrics = this.dataService.getMetrics(); //a copy of the metric -> doesn't modify original
      }
    );
  }

  metricChanged(newMetricName : string) {
    for (let metric of this.metrics) {
      
      //update Metric with new information
      if(metric.name == this.activeMetric.name) {
        metric.display = this.display;
      }
      
      // switch to newMetric
      if(metric.name == newMetricName ){
        this.activeMetric = metric;
        this.display = this.activeMetric.display;
      }
    }
    this.valueChanged();
  }
  
  valueChanged(){
    this.changed = true;
  }
  
  onSubmit(){ //not actually submitting anything right now
    this.changed = false;
    this.dataService.updateMetrics(this.metrics, this.activeMetric.name);
  }
  
}
