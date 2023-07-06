// Component handles the right side form controls
// Contains popups for sorting channels

import { Component, OnInit } from "@angular/core";
import { Metric } from "@models/metric";
import { DataService } from "@services/data.service";
import { Display } from "@models/display";
import { MatDialog } from "@angular/material/dialog";
import { ParametersService } from "@services/parameters.service";
import { ChannelsDialogComponent } from "./channels-dialog/channels-dialog.component";
import { AggregateValue, DisplayValue } from "app/types";

@Component({
  selector: "app-controls",
  templateUrl: "./controls.component.html",
  styleUrls: ["./controls.component.scss"],
})
export class ControlsComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
    private parametersService: ParametersService
  ) {}

  metrics: Metric[]; // Copy of all metric data
  activeMetric: Metric; // Currently active metric
  display: Display; // Color/binning/value settings
  changed = false; // Status of form
  displayValues: Array<DisplayValue> = [
    "Minimum",
    "Maximum",
    "Average",
    "Median",
    "5th_Percentile",
    "95th_Percentile",
  ]; // All possible display values for select

  aggregateValues: Array<AggregateValue> = [
    "Minimum",
    "Maximum",
    "Most_Extreme",
  ]; // Aggregate options

  ngOnInit(): void {
    // Subscribe to changes of the active metric and update display/metric data
    this.dataService.getActiveMetric$().subscribe((activeMetric) => {
      if (activeMetric) {
        this.activeMetric = activeMetric;
        this.display = Object.assign(new Display(), activeMetric.display);
        this.metrics = this.dataService.getMetrics();
      }
    });
  }

  // Opens dialog to sort channels
  openChannelsDialog(): void {
    const dialogRef = this.dialog.open(ChannelsDialogComponent, {
      data: {
        channels: this.display.channels.available,
        activeChannels: this.display.channels.active,
        handle: ".handle",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.valueChanged();
        this.display.channels.available = result;
      }
    });
  }

  // When metric is changed, switch display data to new metric
  metricChanged(newMetricName: string): void {
    const activeMetric = this.metrics.find((m) => m.name === newMetricName);
    this.dataService.setActiveMetric(activeMetric);
    this.changed = false;
  }

  resetBins(): void {
    this.activeMetric.calculateBinning();
    this.dataService.setActiveMetric(this.activeMetric);
  }

  changeColoring(coloring): void {
    this.activeMetric.display.coloring = coloring;
    this.valueChanged();
  }

  // Activate submit button
  valueChanged(): void {
    this.changed = true;
  }

  // Submit metric changes
  onSubmit(): void {
    Object.assign(this.activeMetric.display, this.display);
    this.changed = false;
    this.parametersService.updateUrl(this.activeMetric.display);
    this.dataService.recalculateActiveMetric(this.activeMetric);
  }
}
