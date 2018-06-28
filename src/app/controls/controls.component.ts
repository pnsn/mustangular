// Component handles the right side form controls
// Contains popups for sorting channels and downloading info

import { Component, OnInit, SimpleChanges, Inject } from '@angular/core';
import { Metric } from '../metric';
import { DataService } from '../data.service';
import { Display } from '../display';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})

export class ControlsComponent implements OnInit {
  
  constructor(
    private dataService: DataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
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
        this.activeMetric = Object.assign(activeMetric);
        this.display = activeMetric.display;
        this.metrics = this.dataService.getMetrics();
    });
  }
  
  // Copies share metric link to clipboard 
  copyShareLink(): void {
    //This is from stackoverflow
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = window.location.href.replace(/metric=.+(&|$)/,"metric=" + this.activeMetric.name + "&") + this.activeMetric.display.toString();
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    // Open copy link snackbar
    this.snackBar.open('Link copied to clipboard!', '', {
      duration: 3000
    });
  }
  
  // Opens dialog to sort channels
  openChannelsDialog(): void {
    let dialogRef = this.dialog.open(ChannelsDialog, {
      data: this.display.channels.available
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.display.channels.available = result;
      this.valueChanged();
    });
  }
  
  // Opens dialog to select download type
  // TODO: add download types
  openDownloadDialog(): void {
    let dialogRef = this.dialog.open(DownloadDialog, {
      data: {url: "test"}
    });
    
    // dialogRef.afterClosed().subscribe(result => {
    //
    // });
  }
  
  // Opens help dialog
  //TODO: this
  showHelp(): void {
    console.log("HELP!")
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
  styleUrls: ['./controls.component.css']
})
export class ChannelsDialog {
  constructor(
    public dialogRef: MatDialogRef<ChannelsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
}

// Dialog for download type selector
@Component({
  selector: 'download-dialog',
  templateUrl: './download-dialog.html',
  styleUrls: ['./controls.component.css']
})
export class DownloadDialog {
  constructor(
    public dialogRef: MatDialogRef<DownloadDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
}