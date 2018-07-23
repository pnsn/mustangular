import { Component, OnInit, Input , Output, EventEmitter} from '@angular/core';
import { BinningService } from '../binning.service';

@Component({
  selector: 'app-coloring',
  templateUrl: './coloring.component.html',
  styleUrls: ['./coloring.component.scss']
})
export class ColoringComponent implements OnInit {
  @Input() metricColoring : String; // Gets coloring from parent component
 @Output() changeColoring = new EventEmitter<string>(); //Sends coloring back to parent
  colorings : any[];
  constructor(private binningService : BinningService) { }
  ngOnInit() {
    this.colorings = this.binningService.getColorings();
    for (let coloring of this.colorings){
      coloring.background = "linear-gradient(to right";
      
      for (let color of coloring.colors) {
        coloring.background += "," + color;
      }
      
      coloring.background += ")";
    }
  }
  
  selectionChanged(event) : void {
    if(event != this.metricColoring) {
      this.changeColoring.emit(event);
    }
  }
  //return selection to controls
}
