import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActiveService } from "../active.service";

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})

export class ControlsComponent implements OnInit, OnChanges {
  @Input() metrics: Metric[];
  
  active = {
    "metric" : "",
    "channels" : []
  };
  
  constructor(private activeService: ActiveService) { }
  
  ngOnChanges(changes: SimpleChanges) {
    if (this.metrics && this.metrics.length > 0 ){
      this.activeService.changeMetric(this.metrics[0].name);
    }
    console.log(this.active.metric)
  }
  
  ngOnInit() {
    this.activeService.getActive.subscribe(activeMetric => this.active.metric = activeMetric);
  }

  changeMetric(metricName) {
    console.log(event)
    this.activeService.changeMetric(metricName);
  }
  
}
