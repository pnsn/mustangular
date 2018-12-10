// Generates station graphs

import { Component, OnInit , Inject, OnDestroy} from '@angular/core';
import { MakeMarkersService } from '../make-markers.service'
import { DataService} from '../data.service';
import { Station } from '../station';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Metric } from '../metric';
import { Subscription } from "rxjs";
import { ParametersService } from '../parameters.service';

@Component({
  selector: 'app-station',
  template: ''
})

export class StationComponent implements OnInit, OnDestroy {

  constructor(
    private makeMarkersService: MakeMarkersService,
    private dataService: DataService,
    public dialog: MatDialog,
    public parametersService: ParametersService
  ) {}

  activeStation : Station; // Selected station
  metrics: Metric[]; // Copy of all metric data
  activeMetric : Metric; // Currently active metric
  subscription : Subscription = new Subscription(); // Handles connections
  dates : any;
  
  ngOnInit() {
    // Get station when it is selected
    const sub = this.makeMarkersService.getActiveStation().subscribe(
      activeStation => { 
        if(activeStation){
          this.activeStation = activeStation;
          this.dates = this.parametersService.getQueryDates();
          this.openStationDialog();
          
        }
      }
    );
    
    this.subscription.add(sub);
    
    // Get currently selected metric
    const sub1 = this.dataService.getActiveMetric().subscribe(
      activeMetric => {
        this.activeMetric = Object.assign(activeMetric);
        this.metrics = this.dataService.getMetrics();
      }
    );
    
    this.subscription.add(sub1);
  }
  
  ngOnDestroy () {
    this.subscription.unsubscribe();
  }
  
  // Formats data for chart
  convertDataToChart(station : Station) : any{
    let results = [];
    
    for (let c in station.channels){
      let chan = station.channels[c];
      
      let ch = {
        name: chan.name,
        series:[]
      }
      
      for (let m of chan.measurements) {
        let date = new Date(m.start);
        //adjusts for browsers wanting to use local time
        let adjustedDate = new Date(d.getTime() + d.getTimezoneOffset() * 60000);
        
        ch.series.push({
          value: m.value,
          name: newDate
        });
        
      }
      results.push(ch);
    }
    return results;
  }


  // Opens dialog to sort channels
  openStationDialog(): void {
    let results = this.convertDataToChart(this.activeStation);
    let dialogRef = this.dialog.open(StationDialog, {
      data: {
        station: this.activeStation,
        metric: this.activeMetric,
        values: results,
        start: this.dates.start,
        end: this.dates.end
      },
      width: '80%',
      height: '60%'
    });
  }
}

// Dialog for channel sorter
@Component({
  selector: 'station-dialog',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})

export class StationDialog {
  constructor(
    public dialogRef: MatDialogRef<StationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    station = this.data.station;
    metric = this.data.metric;
    
    xAxisLabel = "Measurement Start Date";
    yAxisLabel = this.metric.unit;
    
    legendTitle = "Click to view PDF";
    
    colorScheme = {
      domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"]
    };
    
    results = this.data.values;
    
    select(event) : void {
      if(typeof event === 'string' || event instanceof String) {
        let url = "https://service.iris.edu/mustang/noise-pdf/1/query?target=";
        window.open(url + this.station.code +"."+ event + "." + this.station.qual +
        "&starttime=" + this.data.start + "&endtime=" +this.data.end+"&format=plot");
      }
    }
}