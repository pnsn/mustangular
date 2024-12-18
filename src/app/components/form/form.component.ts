// Entry form for MUSTANGular

import { Component, OnInit, OnDestroy } from "@angular/core";
import { Query } from "@models/query";
import { MetricsService } from "@services/metrics.service";
import { Router } from "@angular/router";
import { ParametersService } from "@services/parameters.service";
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { Subscription } from "rxjs";
import * as moment from "moment";
import { Metric } from "@models/metric";

export const MY_FORMATS = {
  parse: {
    dateInput: "YYYY-MM-DD",
  },
  display: {
    dateInput: "YYYY-MM-DD",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "YYYY-MM-DD",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
  providers: [
    MetricsService,
    ParametersService,
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class FormComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private metricsService: MetricsService,
    private parametersService: ParametersService
  ) {}

  metrics: Metric[] = []; // Available metrics from MUSTANG
  maxDate = new Date(); // Current date to prevent requests from future
  query = new Query(); // Holds all the query data
  selectedMetrics: Metric[] = []; // Selected metrics
  initialMetrics: string[] = []; // Metrics from URL
  loading = true; // Are metrics still loading?
  subscription: Subscription = new Subscription(); // Handles connections
  message: string; // Error messages
  start: moment.Moment;
  end: moment.Moment;

  ngOnInit(): void {
    // Get metrics to populate form
    this.getMetrics();

    // Wait for query to be populated from url
    const sub = this.parametersService.getQuery$().subscribe((query) => {
      this.query = query;
      this.initialMetrics = query.metric ? query.metric.split(",") : [];
      if (this.query.start && this.query.end) {
        this.start = moment(this.query.start);
        this.end = moment(this.query.end);
      }
      this.selectMetrics();
    });
    this.subscription.add(sub);

    // Tells parameter service to get parameters
    this.parametersService.setQueryParameters();
  }

  // Finds selected metrics
  selectMetrics(): void {
    if (this.metrics.length > 0 && this.initialMetrics.length > 0) {
      this.selectedMetrics = this.metrics.filter((m) => {
        this.initialMetrics.includes(m.name.toLocaleUpperCase());

        return this.initialMetrics.includes(m.name.toLocaleUpperCase());
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Get list of available metrics from EarthScope 
  private getMetrics(): void {
    this.loading = true;
    const sub = this.metricsService.getMetrics$().subscribe(
      (metrics) => {
        this.loading = false;
        this.metrics = [...metrics];
        this.selectMetrics();
      },
      () => {
        this.message = "Cannot fetch metrics. Please try again.";
      }
    );
    this.subscription.add(sub);
  }

  onClearMetrics(): void {
    this.selectedMetrics = [];
  }

  // Disable dates that haven't happened yet and dates after end date
  startFilter = (d: moment.Moment): boolean => {
    const day = d;
    const tomorrow = moment().add(1, "days");

    if (this.end) {
      return day < tomorrow && day < this.end;
    } else {
      return day < tomorrow;
    }
  };

  // Disable dates that haven't happened yet and dates before start date
  endFilter = (d: moment.Moment): boolean => {
    const day = d;
    const tomorrow = moment().add(1, "days");

    if (this.start) {
      return day < tomorrow && day > this.start;
    } else {
      return day < tomorrow;
    }
  };

  // Submit form
  onSubmit(): void {
    this.query.metric = this.selectedMetrics
      .map((m) => m.name.toUpperCase())
      .toString();
    this.query.sanitize(this.start, this.end);
    this.router.navigate(["../map"], { queryParams: this.query });
  }
}
