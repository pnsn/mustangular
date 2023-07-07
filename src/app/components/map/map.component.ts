// Initiates data requests and handles top info bar

import { Component, OnInit, OnDestroy } from "@angular/core";
import { IrisMetric, MetricsService } from "@services/metrics.service";
import { Metric } from "@models/metric";
import { MeasurementsService } from "@services/measurements.service";
import { Stations, StationsService } from "@services/stations.service";
import { Query } from "@models/query";
import { CombineMetricsService } from "@services/combine-metrics.service";
import { ParametersService } from "@services/parameters.service";
import { DataService } from "@services/data.service";
import { EMPTY, Observable, Subscription, zip } from "rxjs";
import { Router } from "@angular/router";
import { map, mergeAll, switchMap, tap } from "rxjs/operators";
import { Station } from "@models/station";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
  providers: [
    MetricsService,
    CombineMetricsService,
    MeasurementsService,
    ParametersService,
  ],
})
export class MapComponent implements OnInit, OnDestroy {
  constructor(
    private metricsService: MetricsService,
    private combineMetricsService: CombineMetricsService,
    private measurementsService: MeasurementsService,
    private stationsService: StationsService,
    private parametersService: ParametersService,
    private dataService: DataService,
    private router: Router
  ) {}

  query: Query; // Query parameters
  activeMetric: Metric; // Metric currently being viewed
  inProgress = true; // Is data still being processed?
  subscription: Subscription = new Subscription(); // Handles connections
  status: {
    message: string;
    error: boolean;
    info?: string;
  } = {
    message: "Loading",
    error: false,
  };

  ngOnInit(): void {
    // Wait for query parameters to be populated
    const sub = this.parametersService
      .getQuery$()
      .pipe(
        switchMap((query) => {
          this.query = query;

          // Start requesting data
          if (this.query.metric) {
            return this.getMetrics$();
          } else {
            this.router.navigate(["../form"], { queryParams: this.query });
            return EMPTY;
          }
        })
      )
      .subscribe();
    this.subscription.add(sub);

    const activeMetricSub = this.dataService
      .getActiveMetric$()
      .subscribe((activeMetric) => {
        this.activeMetric = activeMetric;
        this.inProgress = false;
      });

    // Initiates query parameter fetching
    this.parametersService.setQueryParameters();
    this.subscription.add(sub);
    this.subscription.add(activeMetricSub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Get list of available metrics from IRIS
  private getMetrics$(): Observable<Stations> {
    this.status.message = "Requesting Metrics from MUSTANG.";
    const metricQuery = this.query.getString(["metric"]);
    const measurementQuery = this.query.getString();
    const stationQuery = this.query.getString(["net", "sta"]);

    let combinedMetrics: Metric[];
    let metrics: Metric[];
    return this.metricsService.getMetrics$(metricQuery).pipe(
      tap({
        next: (results) => {
          metrics = results;
        },
        error: () => {
          this.status = {
            message: "Unable to fetch Measurements from MUSTANG.",
            error: true,
            info: "This error occurs if MUSTANG does not recognize one or more of the search parameters.",
          };
        },
      }),
      switchMap(() => {
        this.status.message = "Requesting Measurements from MUSTANG.";
        return this.measurementsService.getMeasurements$(measurementQuery);
      }),
      tap({
        error: () => {
          this.status = {
            message: "Unable to fetch Measurements from MUSTANG.",
            error: true,
            info: "This error occurs if MUSTANG does not recognize one or more of the search parameters.",
          };
        },
      }),
      switchMap((measurements) => {
        this.status.message = "Processing Data.";
        return this.combineMetricsService.combineMetrics$(
          measurements,
          metrics
        );
      }),
      switchMap((results) => {
        if (results && results.length > 0) {
          this.dataService.display = this.parametersService.getDisplay();
          this.status.message = "Accessing Station Information.";
          combinedMetrics = results;

          return this.stationsService.getStationsData$(stationQuery);
        } else {
          this.status = {
            message: "No data returned from MUSTANG.",
            error: true,
            info: "MUSTANG did not have any measurements with your specified parameters.",
          };
          return EMPTY;
        }
      }),
      tap({
        next: () => {
          this.dataService.setMetrics(combinedMetrics);
        },
        error: (err) => {
          this.status = {
            message: "Unable to fetch station information.",
            error: true,
            info: err.error,
          };
        },
      })
    );
  }
}
