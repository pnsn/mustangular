import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { BinningService } from "@services/binning.service";

@Component({
  selector: "app-coloring",
  templateUrl: "./coloring.component.html",
  styleUrls: ["./coloring.component.scss"],
})
export class ColoringComponent implements OnInit {
  @Input() metricColoring: string; // Gets coloring from parent component
  @Output() changeColoring = new EventEmitter<string>(); // Sends coloring back to parent

  colorings: any[];
  currentColoring: any;
  constructor(private binningService: BinningService) {}

  ngOnInit(): void {
    this.colorings = this.binningService.getColorings();
    for (const coloring of this.colorings) {
      coloring.background = "linear-gradient(to right";

      for (const color of coloring.colors) {
        coloring.background += "," + color;
      }

      coloring.background += ")";
    }
    this.setColoring(this.metricColoring);
  }

  selectionChanged(event): void {
    if (event !== this.metricColoring) {
      this.changeColoring.emit(event);
    }
    this.setColoring(event);
  }

  setColoring(color): void {
    for (const coloring of this.colorings) {
      if (color === coloring.name) {
        this.currentColoring = coloring;
      }
    }
  }
  // return selection to controls
}
