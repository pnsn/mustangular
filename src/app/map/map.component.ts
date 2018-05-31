import { Component, OnInit } from '@angular/core';
import { MetricsService } from '../metrics.service';
import { Metric } from '../metric';
import { MeasurementsService } from '../measurements.service';
import { StationsService } from '../stations.service';
import { Query } from '../query';
import { CombineMetricsService} from '../combine-metrics.service';
import { ActiveService} from '../active.service';
import { Active } from '../active';
import { ParametersService } from '../parameters.service';
import { DataService } from '../data.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  query : Query;
  activeMetric : Metric;
  message: string;
  inProgress: boolean = true;
  
  //needs active metric
  constructor(
    private metricsService: MetricsService,
    private combineMetricsService: CombineMetricsService,
    private measurementsService: MeasurementsService,
    private stationsService: StationsService,
    private activeService: ActiveService,
    private parametersService: ParametersService,
    private dataService: DataService
    ) { }
  
  ngOnInit() {
    console.log("Map Component onInit");
    
    this.parametersService.getQuery().subscribe(
      query => { 
        this.query = query;
        console.log("have query parameters", this.query.metric)
        if (this.query.metric.length > 0) {
          this.getMetrics();
        }
      }
    );
    this.parametersService.setQueryParameters();
  }
  
  // Get list of available metrics from IRIS
  private getMetrics(): void {
    this.message = "Requesting Metrics from MUSTANG";
    this.metricsService.getMetrics(this.query.getString(["metric"])).subscribe(
      metrics => {
        this.getStations(this.query.getString(["net","sta","loc","cha"]), metrics);
      }
    );
  }
  
  // Get list of all stations
  private getStations(qString:string, metrics:Metric[]): void {
    this.message = "Accessing FDSNWS Station Information";
    this.stationsService.getStations(qString).subscribe(
      stations => {
        this.getMeasurements(this.query.getString(), metrics, stations);
      }
    );
  }
  
  //Get MUSTANG measurements
  private getMeasurements(qString:string, metrics:Metric[], stations:object): void {
    this.message = "Requesting Measurements from MUSTANG";
    this.measurementsService.getMeasurements(qString).subscribe(
      measurements => {
        this.combineMetrics(measurements, stations, metrics)
      }
    );
  }
  
  private combineMetrics(measurements:object, stations:object, metrics:Metric[]){
    this.message = "Processing Data.";
    
    this.combineMetricsService.getMetrics().subscribe(
      metrics => {
        this.dataService.setDisplay(this.parametersService.getDisplay());
        this.dataService.setMetrics(metrics);
      }
    )
    
    this.combineMetricsService.combineMetrics(measurements, stations, metrics);
    this.dataService.getActiveMetric().subscribe(
      activeMetric => { 
        this.activeMetric = activeMetric;
      }
    );
    
    this.inProgress = false;
    this.message = "Processing Complete."; //hide the blocker thingy
  }
}
