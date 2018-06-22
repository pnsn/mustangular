import { Component, OnInit, SimpleChanges, Inject } from '@angular/core';
import { Metric } from '../metric';
import { DataService } from '../data.service';
import { Display } from '../display';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})

export class ControlsComponent implements OnInit {
  metrics: Metric[]; 
  activeMetric : Metric; 
  display: Display;

  //if there isn't coloring on the metric property already, make it up
  displayValues : Array<string> = ["Minimum", "Maximum", "Average", "5th Percentile", "95th Percentile"];
  
  changed = false;

  constructor(
    private dataService: DataService,
    public dialog: MatDialog
  ) {}
  
  openShareDialog(): void {
    let dialogRef = this.dialog.open(ShareDialog, {
      // width: '250px'
      data: this.activeMetric;
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  
  openChannelsDialog(): void {
    let dialogRef = this.dialog.open(ChannelsDialog, {
      data: this.display.channels.available
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.display.channels.available = result;
      this.valueChanged();
    });
  }
  

  showHelp(): void {
    console.log("HELP!")
  }
  
  ngOnInit() {
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
  
  onSubmit(){ 
    this.changed = false;
    this.dataService.updateMetrics(this.metrics, this.activeMetric.name);
  }
}

@Component({
  selector: 'share-dialog',
  templateUrl: './share-dialog.html',
})
export class ShareDialog {

  constructor(
    public dialogRef: MatDialogRef<ShareDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    url = window.location.href.replace(/metric=.+(&|$)/,"metric=" + data.name + "&") + data.display.toString();
    //TODO:replace metrics with active metric
    
    
  close(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'channels-dialog',
  templateUrl: './channels-dialog.html',
})
export class ChannelsDialog {
  constructor(
    public dialogRef: MatDialogRef<ShareDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
}