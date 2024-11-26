// Generates station graphs

import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { MakeMarkersService } from "@services/make-markers.service";
import { DataService } from "@services/data.service";
import { Station } from "@models/station";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { Metric } from "@models/metric";
import { Subscription } from "rxjs";
import { ParametersService } from "@services/parameters.service";

@Component({
  selector: "app-station",
  template: "",
})
export class StationComponent implements OnInit, OnDestroy {
  constructor(
    private makeMarkersService: MakeMarkersService,
    private dataService: DataService,
    public dialog: MatDialog,
    public parametersService: ParametersService
  ) {}

  activeStation: Station; // Selected station
  metrics: Metric[]; // Copy of all metric data
  activeMetric: Metric; // Currently active metric
  subscription: Subscription = new Subscription(); // Handles connections
  dates: any;

  ngOnInit(): void {
    // Get station when it is selected
    const sub = this.makeMarkersService
      .getActiveStation()
      .subscribe((activeStation) => {
        if (activeStation) {
          this.activeStation = activeStation;
          this.dates = this.parametersService.getQueryDates();
          this.openStationDialog();
        }
      });

    this.subscription.add(sub);

    // Get currently selected metric
    const sub1 = this.dataService
      .getActiveMetric$()
      .subscribe((activeMetric) => {
        this.activeMetric = Object.assign(activeMetric);
        this.metrics = this.dataService.getMetrics();
      });

    this.subscription.add(sub1);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Formats data for chart
  convertDataToChart(station: Station): any {
    const results = [];
    for (const [_code, channel] of station.channels) {
      const chan = channel;

      const ch = {
        name: chan.name,
        series: [],
      };

      for (const m of chan.measurements) {
        const date = new Date(m.start + "Z");
        // adjusts for browsers wanting to use local time
        const adjustedDate = new Date(
          date.getTime() + date.getTimezoneOffset() * 60000
        );
        ch.series.push({
          value: m.value,
          name: adjustedDate,
        });
      }
      results.push(ch);
    }
    return results;
  }

  // Opens dialog to sort channels
  openStationDialog(): void {
    const results = this.convertDataToChart(this.activeStation);
    this.dialog.open(StationDialogComponent, {
      data: {
        station: this.activeStation,
        metric: this.activeMetric,
        values: results,
        start: this.dates.start,
        end: this.dates.end,
      },
      width: "80%",
    });
  }
}

// Dialog for channel sorter
@Component({
  selector: "app-station-dialog",
  templateUrl: "./station.component.html",
  styleUrls: ["./station.component.scss"],
})
export class StationDialogComponent {
  yAxisLabel = "";
  maxLength = 35;
  constructor(
    public dialogRef: MatDialogRef<StationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.yAxisLabel = this.metric.unit || this.metric.display.metricType;
    if (this.yAxisLabel.length > this.maxLength)
      this.yAxisLabel = this.yAxisLabel.slice(0, this.maxLength) + "...";
  }

  station = this.data.station;
  metric = this.data.metric;

  xAxisLabel = "Measurement Start Date";

  legendTitle = "Click to view PSD-PDF";

  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"],
  };

  results = this.data.values;

  select(event): void {
    if (typeof event === "string" || event instanceof String) {
      const url = "https://service.earthscope.org/mustang/noise-pdf/1/query?target=";
      window.open(
        url +
          this.station.code +
          "." +
          event +
          "." +
          this.station.qual +
          "&starttime=" +
          this.data.start +
          "&endtime=" +
          this.data.end +
          "&format=plot"
      );
    }
  }
}
