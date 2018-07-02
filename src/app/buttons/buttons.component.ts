import { Component, OnInit , Input, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { Metric } from '../metric';
@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {
  @Input() metric : Metric;
  constructor(public dialog: MatDialog,
    public snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }
  
  // Copies share metric link to clipboard 
  copyShareLink(): void {
    //This is from stackoverflow
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = window.location.href.replace(/metric=.+(&|$)/,"metric=" + this.metric.name + "&") + this.metric.display.toString();
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
  
  // Opens dialog to select download type
  // TODO: add download types
  openDownloadDialog(): void {
    let dialogRef = this.dialog.open(DownloadDialog, {
      data: {url: "test"}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Open download snackbar
        this.snackBar.open('Downloading '+ result, '', {
          duration: 3000
        });
      }
    });
  }
  
  // Opens help dialog
  //TODO: this
  showHelp(): void {
    alert("HELP ME")
    console.log("HELP!")
  }
}


// Dialog for download type selector
@Component({
  selector: 'download-dialog',
  templateUrl: './download-dialog.html',
  styleUrls: ['./buttons.component.css']
})
export class DownloadDialog {
  constructor(
    public dialogRef: MatDialogRef<DownloadDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    
    download(type: string): void{
      console.log(type)
    }
    
    types = ["xml", "csv", "text", "json", "jsonp"];
    //show download
    
}