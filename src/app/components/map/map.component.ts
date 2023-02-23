// Initiates data requests and handles top info bar

import { Component, OnInit, OnDestroy } from "@angular/core";
import { IrisMetric, MetricsService } from "@services/metrics.service";
import { Metric } from "@models/metric";
import { MeasurementsService } from "@services/measurements.service";
import { StationsService } from "@services/stations.service";
import { Query } from "@models/query";
import { CombineMetricsService } from "@services/combine-metrics.service";
import { ParametersService } from "@services/parameters.service";
import { DataService } from "@services/data.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

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
    const sub = this.parametersService.getQuery().subscribe((query) => {
      this.query = query;

      // Start requesting data
      if (this.query.metric) {
        this.getMetrics();
      } else {
        this.router.navigate(["../form"], { queryParams: this.query });
      }
    });
    this.subscription.add(sub);

    // Initiates query parameter fetching
    this.parametersService.setQueryParameters();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Get list of available metrics from IRIS
  private getMetrics(): void {
    this.status.message = "Requesting Metrics from MUSTANG.";
    const sub = this.metricsService
      .getMetrics(this.query.getString(["metric"]))
      .subscribe(
        (metrics) => {
          this.getMeasurements(this.query.getString(), metrics);
        },
        () => {
          this.status = {
            message: "Unable to fetch metric information from MUSTANG.",
            error: true,
            info: "This error occurs when an invalid metric is entered.",
          };
        }
      );
    this.subscription.add(sub);
  }

  // Get list of all stations from IRIS FDSNWS
  private getStations(metrics: Metric[]): void {
    this.status.message = "Accessing Station Information.";
    const sub = this.stationsService
      .getStationsData(this.query.getString(["net", "sta"]))
      .subscribe(
        () => {
          this.dataService.setMetrics(metrics);
        },
        (err) => {
          this.status = {
            message: "Unable to fetch station information.",
            error: true,
            info: err.error,
          };
        }
      );
    this.subscription.add(sub);
  }

  // Get measurements from MUSTANG
  private getMeasurements(qString: string, metrics: Metric[]): void {
    this.status.message = "Requesting Measurements from MUSTANG.";
    const sub = this.measurementsService.getMeasurements(qString).subscribe(
      (measurements) => {
        this.combineMetrics(measurements, metrics);
      },
      () => {
        this.status = {
          message: "Unable to fetch Measurements from MUSTANG.",
          error: true,
          info: "This error occurs if MUSTANG does not recognize one or more of the search parameters.",
        };
      }
    );
    this.subscription.add(sub);
  }

  // Combine all the data and update status
  private combineMetrics(measurements: object, metrics: Metric[]): void {
    this.status.message = "Processing Data.";
    // Wait for active metric
    this.dataService.getActiveMetric().subscribe((activeMetric) => {
      this.activeMetric = activeMetric;
      this.inProgress = false;
    });

    // Wait for metric data
    const sub = this.combineMetricsService
      .getMetrics()
      .subscribe((combinedMetrics) => {
        if (combinedMetrics && combinedMetrics.length > 0) {
          this.dataService.display = this.parametersService.getDisplay();

          this.getStations(combinedMetrics);
          // get station data now
        } else {
          this.status = {
            message: "No data returned from MUSTANG.",
            error: true,
            info: "MUSTANG did not have any measurements with your specified parameters.",
          };
        }
      });

    this.subscription.add(sub);
    // Combine measurements/metrics/stations
    this.combineMetricsService.combineMetrics(measurements, metrics);
  }
}
