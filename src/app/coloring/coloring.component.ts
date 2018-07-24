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
  currentColoring : string;
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
    this.setColoring(this.metricColoring);
  }
  
  selectionChanged(event) : void {
    if(event != this.metricColoring) {
      this.changeColoring.emit(event);
    }
    this.setColoring(event);
  }
  
  setColoring(color) {
    for (let coloring of this.colorings){
      if(color == coloring.name ) {
        this.currentColoring = coloring.background;
      }
    }
  }
  //return selection to controls
}
