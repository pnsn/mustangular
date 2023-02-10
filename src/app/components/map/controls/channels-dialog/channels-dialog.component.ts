import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

// Dialog for channel sorter
@Component({
  selector: "app-channels-dialog",
  templateUrl: "./channels-dialog.component.html",
  styleUrls: ["./channels-dialog.component.scss"],
})
export class ChannelsDialogComponent {
  channels;
  activeChannels;
  constructor(
    public dialogRef: MatDialogRef<ChannelsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.channels = this.data.channels;
    this.activeChannels = this.data.activeChannels;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.channels, event.previousIndex, event.currentIndex);
  }
}
