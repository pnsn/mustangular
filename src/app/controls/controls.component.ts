// Component handles the right side form controls
// Contains popups for sorting channels

import { Component, OnInit, SimpleChanges, Inject} from '@angular/core';
import { Metric } from '../metric';
import { DataService } from '../data.service';
import { Display } from '../display';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})

export class ControlsComponent implements OnInit {
  
  constructor(
    public dialog: MatDialog,
    private dataService: DataService
  ) {}
  
  metrics: Metric[]; // Copy of all metric data
  activeMetric : Metric; // Currently active metric
  display: Display; // Color/binning/value settings
  changed = false; // Status of form
  displayValues : Array<string> = [
    "Minimum",
    "Maximum",
    "Average",
    "5th Percentile",
    "95th Percentile"
  ]; // All possible display values for select

  ngOnInit() {
    // Subscribe to changes of the active metric and update display/metric data
    this.dataService.getActiveMetric().subscribe(
      activeMetric => {
        if(activeMetric) {
          this.activeMetric = Object.assign(activeMetric);
          this.display = activeMetric.display;
          this.metrics = this.dataService.getMetrics();
        }
    });
  }
  
  // Opens dialog to sort channels
  openChannelsDialog(): void {
    let dialogRef = this.dialog.open(ChannelsDialog, {

      data: {
        channels: this.display.channels.available,
        options: {  
          onUpdate: (event: any) => {
            this.valueChanged();
          },
          ghostClass: "ghost",
          chosenClass: "chosen"
        },
        handle : '.handle'
    }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.display.channels.available = result;
      }
    });
  }
  
  // When metric is changed, switch display data to new metric
  metricChanged(newMetricName : string) {
    for (let metric of this.metrics) {
      
      // Update Metric with new information
      if(metric.name == this.activeMetric.name) {
        metric.display = this.display;
      }
      
      // Switch to newMetric
      if(metric.name == newMetricName ){
        this.activeMetric = metric;
        this.display = this.activeMetric.display;
      }
    }
    this.valueChanged();
  }
  
  // Activate submit button
  valueChanged(){
    this.changed = true;
  }
  
  // Submit metric changes
  onSubmit(){ 
    this.changed = false;
    this.dataService.updateMetrics(this.metrics, this.activeMetric.name);
  }
}

// Dialog for channel sorter
@Component({
  selector: 'channels-dialog',
  templateUrl: './channels-dialog.html',
  styleUrls: ['./controls.component.scss']
})
export class ChannelsDialog {
  constructor(
    public dialogRef: MatDialogRef<ChannelsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    
    channels = this.data.channels;
    channelSorterOptions = this.data.options;
}