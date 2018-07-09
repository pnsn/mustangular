// TODO: Generates station graphs

import { Component, OnInit , Inject} from '@angular/core';
import { MakeMarkersService } from '../make-markers.service'
import { DataService} from '../data.service';
import { Station } from '../station';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Metric } from '../metric';

@Component({
  selector: 'app-station',
  template: ''
})
export class StationComponent implements OnInit {

  constructor(
    private makeMarkersService: MakeMarkersService,
    private dataService: DataService,
    public dialog: MatDialog
  ) {}

  activeStation : Station;
  metrics: Metric[]; // Copy of all metric data
  activeMetric : Metric; // Currently active metric
  
  
  // TODO: get all metric data
  ngOnInit() {
    this.makeMarkersService.getActiveStation().subscribe(
      activeStation => { 
        if(activeStation){
          this.activeStation = activeStation;
          this.openStationDialog();
        }

      }
    );
    
    this.dataService.getActiveMetric().subscribe(
      activeMetric => {
        this.activeMetric = Object.assign(activeMetric);
        this.metrics = this.dataService.getMetrics();
    });
  }
  
  convertDataToChart(station : Station) : Array<object>{
    let results = [];
    for (let c in station.channels){
      let chan = station.channels[c];
      let ch = {
        name: chan.name,
        series:[]
      }
      for (let m of chan.measurements){
        ch.series.push({
          value: m.value,
          name: new Date(m.start)
        });
        
      }
      results.push(ch)
    }
    return results;
  }


  // Opens dialog to sort channels
  openStationDialog(): void {
    let values = this.convertDataToChart(this.activeStation);
    
    let dialogRef = this.dialog.open(StationDialog, {
      data: {
        station: this.activeStation,
        metric: this.activeMetric,
        values: values
      }
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
    
    legendTitle = "Channels"
    
    colorScheme = {
      domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"],
      
    };
    
    onSelect(event) : void {
      console.log(event)
    }
    
    view = [800, 500];
    
    results = this.data.values;

}