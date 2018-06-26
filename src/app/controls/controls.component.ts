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
  metrics: Metric[]; 
  activeMetric : Metric; 
  display: Display;

  //if there isn't coloring on the metric property already, make it up
  displayValues : Array<string> = ["Minimum", "Maximum", "Average", "5th Percentile", "95th Percentile"];
  
  changed = false;

  constructor(
    private dataService: DataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}
  
  //Stupid workaround to copy text to clipboard
  copyShareLink(): void {
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

    //open snackbar
    this.snackBar.open('Link copied to clipboard!', '', {
      duration: 3000
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
  selector: 'channels-dialog',
  templateUrl: './channels-dialog.html',
  styleUrls: ['./controls.component.css']
})
export class ChannelsDialog {
  constructor(
    public dialogRef: MatDialogRef<ShareDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
}