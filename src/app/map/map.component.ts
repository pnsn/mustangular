// Initiates data requests and handles top info bar

import { Component, OnInit , OnDestroy} from '@angular/core';
import { MetricsService } from '../metrics.service';
import { Metric } from '../metric';
import { MeasurementsService } from '../measurements.service';
import { StationsService } from '../stations.service';
import { Query } from '../query';
import { CombineMetricsService} from '../combine-metrics.service';
import { ParametersService } from '../parameters.service';
import { DataService } from '../data.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [MetricsService, CombineMetricsService, MeasurementsService, StationsService, ParametersService]
})

export class MapComponent implements OnInit,OnDestroy {

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
  subscription : Subscription = new Subscription();
  ngOnInit() {
    
    // Wait for query parameters to be populated
    const sub = this.parametersService.getQuery().subscribe(
      query => { 
        this.query = query;
        
        // Start requesting data
        if (this.query.metric.length > 0) {
          this.getMetrics();
        }
      }
    );
    this.subscription.add(sub);
    // Initiates query parameter fetching
    this.parametersService.setQueryParameters();
  }
  
  ngOnDestroy () {
    this.subscription.unsubscribe();
  }
  
  // Get list of available metrics from IRIS
  private getMetrics(): void {
    this.message = "Requesting Metrics from MUSTANG.";
    const sub = this.metricsService.getMetrics(this.query.getString(["metric"])).subscribe(
      metrics => {
        this.getStations(this.query.getString(["net","sta","loc","cha"]), metrics);
      },
      err => {
        this.message = "Unable to fetch Metrics from MUSTANG. Please return to form and try again."
        console.log("I GOT AN ERROR", err);
      }
    );
    this.subscription.add(sub);
    

  }
  
  // Get list of all stations from IRIS FDSNWS
  private getStations(qString:string, metrics:Metric[]): void {
    this.message = "Accessing FDSNWS Station Information.";
    const sub = this.stationsService.getStations(qString).subscribe(
      stations => {
        this.getMeasurements(this.query.getString(), metrics, stations);
      },
      err => {
         this.message = "Unable to fetch station information from FDSNWS. Please check parameters and try again."
          console.log("I GOT AN ERROR", err.error);
      }
    );
    this.subscription.add(sub);
  }
  
  // Get measurements from MUSTANG
  private getMeasurements(qString:string, metrics:Metric[], stations:object): void {
    this.message = "Requesting Measurements from MUSTANG.";
    const sub = this.measurementsService.getMeasurements(qString).subscribe(
      measurements => {
        this.combineMetrics(measurements, stations, metrics);
      },
      err => {
         this.message = "Unable to fetch Measurements from MUSTANG. Please return to form and try again."
          console.log("I GOT AN ERROR", err);
      }
    );
    this.subscription.add(sub);
  }
  
  // Combine all the data and update status
  private combineMetrics(measurements:object, stations:object, metrics:Metric[]){
    this.message = "Processing Data.";
    // Wait for active metric
    this.dataService.getActiveMetric().subscribe(
      activeMetric => { 
        this.activeMetric = activeMetric;
        this.inProgress = false;
        this.message = "Processing Complete."; //hide the blocker thingy      
      }
    );
    
    // Wait for metric data
    const sub = this.combineMetricsService.getMetrics().subscribe(
      metrics => {
        if(metrics && metrics.length > 0){
          this.dataService.setDisplay(this.parametersService.getDisplay());
          this.dataService.setMetrics(metrics);
        } else {
          this.message = "No data returned. Please return to form and try again."
        }
      }
    ) 
    this.subscription.add(sub);
    // Combine measurements/metrics/stations
    this.combineMetricsService.combineMetrics(measurements, stations, metrics);


  }
}
