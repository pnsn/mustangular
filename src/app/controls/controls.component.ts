import { Component, OnInit, SimpleChanges } from '@angular/core';
import { CombineMetricsService} from '../combine-metrics.service';
import { BinningService } from '../binning.service';
import { Metric } from '../metric';
import { ActiveService } from '../active.service';
import { ParametersService } from '../parameters.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})

export class ControlsComponent implements OnInit {
  metricNames: string[];
  channels: Array<string>;
  activeMetric : Metric; //am I wiping this over???
  displayDefaults : any;
  //needs a ton of params
  
  //if there isn't coloring on the metric property already, make it up
  displayValues = ["minimum", "maximum", "average"];
  
  changed = false;

  constructor(
    private activeService: ActiveService,
    private combineMetricsService: CombineMetricsService,
    private binningService: BinningService,
    private parametersService: ParametersService,
    private dataService: DataService
  ) { }
  
  ngOnInit() {
    this.displayDefaults = this.parametersService.getDisplay();
    //make sure this is slicing off a copy of the metric
    this.dataService.getActiveMetric().subscribe(
      activeMetric => {
        this.activeMetric = activeMetric;
        this.metricNames = this.dataService.getMetricNames();
        console.log(this.metricNames)
        this.binningService.makeBins(this.activeMetric.binning, this.activeMetric.coloring);
      }
    );
    // this.combineMetricsService.getChannels.subscribe(
    //   channels => {
    //     this.channels = channels;
    //   }
    // );
  }

  valueChanged(){
    this.changed = true;
  }
  
  onSubmit(){ //not actually submitting anything right now
    this.changed = false;
    this.activeService.setActiveMetric(this.activeMetric);//FIXME: this is going to assign wrong data to new metric
  }
  
}
