// Initiates data requests and handles top info bar

import { Component, OnInit, OnDestroy } from "@angular/core";
import { MetricsService } from "@services/metrics.service";
import { Metric } from "@models/metric";
import { MeasurementsService } from "@services/measurements.service";
import { Stations, StationsService } from "@services/stations.service";
import { Query } from "@models/query";
import { CombineMetricsService } from "@services/combine-metrics.service";
import { ParametersService } from "@services/parameters.service";
import { DataService } from "@services/data.service";
import { EMPTY, Observable, Subscription, forkJoin } from "rxjs";
import { Router } from "@angular/router";
import { switchMap, tap } from "rxjs/operators";

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
    // Listen to changes in activeMetric and stop loading
    const activeMetricSub = this.dataService
      .getActiveMetric$()
      .subscribe((activeMetric) => {
        this.activeMetric = activeMetric;
        this.inProgress = false;
      });

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
            // Reroute to map if no metric set
            this.router.navigate(["../form"], { queryParams: this.query });
            return EMPTY;
          }
        })
      )
      .subscribe({
        error: (error) => {
          console.log(error);
        },
      });
    this.subscription.add(sub);

    // Initiates query parameter fetching
    this.parametersService.setQueryParameters();
    this.subscription.add(sub);
    this.subscription.add(activeMetricSub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Get all the data in correct order and sets data
  // Observable returns the results of the stations query
  private getMetrics$(): Observable<Stations> {
    this.status.message = "Requesting Metrics and Measurements from MUSTANG.";
    const metricQuery = this.query.getString(["metric"]);
    const measurementQuery = this.query.getString();
    const stationQuery = this.query.getString(["net", "sta"]);

    let combinedMetrics: Metric[];
    // get metrics and measurements at same time
    return forkJoin({
      metrics: this.metricsService.getMetrics$(metricQuery).pipe(
        tap({
          error: () => {
            this.status = {
              message: "Unable to fetch Metrics from MUSTANG.",
              error: true,
              info: "This error can occur if MUSTANG does not recognize one or more of the search parameters.",
            };
          },
        })
      ),
      measurements: this.measurementsService
        .getMeasurements$(measurementQuery)
        .pipe(
          tap({
            error: () => {
              this.status = {
                message: "Unable to fetch Measurements from MUSTANG.",
                error: true,
                info: "This error can occur if MUSTANG does not recognize one or more of the search parameters.",
              };
            },
          })
        ),
    }).pipe(
      // if successful, combine data
      switchMap(({ metrics, measurements }) => {
        this.status.message = "Processing Data.";
        return this.combineMetricsService
          .combineMetrics$(measurements, metrics)
          .pipe(
            tap({
              next: (results) => {
                combinedMetrics = results;
              },
              error: () => {
                this.status = {
                  message: "No data returned from MUSTANG.",
                  error: true,
                  info: "This error occurs if MUSTANG did not have any measurements with your specified parameters.",
                };
              },
            })
          );
      }),
      // then get station info
      switchMap(() => {
        this.dataService.display = this.parametersService.getDisplay();
        this.status.message = "Accessing Station Information.";
        return this.stationsService.getStationsData$(stationQuery).pipe(
          tap({
            error: () => {
              this.status = {
                message: "No station data found.",
                error: true,
                info: "This error occurs if no stations matching the given parameters were found.",
              };
            },
          })
        );
      }),
      tap({
        next: () => {
          this.dataService.setMetrics(combinedMetrics);
        },
      })
    );
  }
}
