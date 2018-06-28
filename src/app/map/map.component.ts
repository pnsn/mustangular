// Initiates data requests and handles top info bar

import { Component, OnInit } from '@angular/core';
import { MetricsService } from '../metrics.service';
import { Metric } from '../metric';
import { MeasurementsService } from '../measurements.service';
import { StationsService } from '../stations.service';
import { Query } from '../query';
import { CombineMetricsService} from '../combine-metrics.service';
import { ParametersService } from '../parameters.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  constructor (
    private metricsService: MetricsService,
    private combineMetricsService: CombineMetricsService,
    private measurementsService: MeasurementsService,
    private stationsService: StationsService,
    private parametersService: ParametersService,
    private dataService: DataService
  ) {}
  
  query : Query; // Query parameters
  activeMetric : Metric; // Metric currently being viewed 
  message: string; // Status display message
  inProgress: boolean = true; // Is data still being processed?
  
  ngOnInit() {
    console.log("Map Component onInit");
    
    // Wait for query parameters to be populated
    this.parametersService.getQuery().subscribe(
      query => { 
        this.query = query;
        
        // Start requesting data
        if (this.query.metric.length > 0) {
          this.getMetrics();
        }
      }
    );
    
    // Initiates query parameter fetching
    this.parametersService.setQueryParameters();
  }
  
  // Get list of available metrics from IRIS
  private getMetrics(): void {
    this.message = "Requesting Metrics from MUSTANG.";
    this.metricsService.getMetrics(this.query.getString(["metric"])).subscribe(
      metrics => {
        this.getStations(this.query.getString(["net","sta","loc","cha"]), metrics);
      }
    );
  }
  
  // Get list of all stations from IRIS FDSNWS
  private getStations(qString:string, metrics:Metric[]): void {
    this.message = "Accessing FDSNWS Station Information";
    this.stationsService.getStations(qString).subscribe(
      stations => {
        this.getMeasurements(this.query.getString(), metrics, stations);
      }
    );
  }
  
  // Get measurements from MUSTANG
  private getMeasurements(qString:string, metrics:Metric[], stations:object): void {
    this.message = "Requesting Measurements from MUSTANG";
    this.measurementsService.getMeasurements(qString).subscribe(
      measurements => {
        this.combineMetrics(measurements, stations, metrics)
      }
    );
  }
  
  // Combine all the data and update status
  private combineMetrics(measurements:object, stations:object, metrics:Metric[]){
    this.message = "Processing Data.";
    
    // Wait for active metric
    this.dataService.getActiveMetric().subscribe(
      activeMetric => { 
        this.activeMetric = activeMetric;
      }
    );
    
    // Wait for metric data
    this.combineMetricsService.getMetrics().subscribe(
      metrics => {
        this.dataService.setDisplay(this.parametersService.getDisplay());
        this.dataService.setMetrics(metrics);
      }
    )
    
    // Combine measurements/metrics/stations
    this.combineMetricsService.combineMetrics(measurements, stations, metrics);

    this.inProgress = false;
    this.message = "Processing Complete."; //hide the blocker thingy
  }
}
