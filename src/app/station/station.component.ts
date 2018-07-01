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
    console.log("station init")
    this.makeMarkersService.getActiveStation().subscribe(
      activeStation => { 
        this.activeStation = activeStation;
        this.openStationDialog();
        console.log("hi",this.activeStation);
      }
    );
    
    this.dataService.getActiveMetric().subscribe(
      activeMetric => {
        this.activeMetric = Object.assign(activeMetric);
        this.metrics = this.dataService.getMetrics();
    });
  }


  // Opens dialog to sort channels
  openStationDialog(): void {
    let dialogRef = this.dialog.open(StationDialog, {
      data: {
        station: this.activeStation,
        metric: this.activeMetric
      }
    });
    
    // dialogRef.afterClosed().subscribe(result => {
    //   this.valueChanged();
    // });
  }
  
}

// Dialog for channel sorter
@Component({
  selector: 'station-dialog',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})

export class StationDialog {
  constructor(
    public dialogRef: MatDialogRef<StationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    
    station = this.data.station;
    metric = this.data.metric;
    
}