import { Component, OnInit } from '@angular/core';
import { MetricsService } from '../metrics.service';
import { Metric } from '../metric';
import { MeasurementsService } from '../measurements.service';
import { Measurement } from '../measurement';
import { StationsService } from '../stations.service';
import { Station } from '../station'
import { Router, ActivatedRoute } from '@angular/router';
import { Query } from '../query';
import { CombineMetricsService} from '../combine-metrics.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  query : Query;
  metrics : Metric[];
  message: string;
  
  //needs active metric
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private metricsService: MetricsService,
    private combineMetricsService: CombineMetricsService,
    private measurementsService: MeasurementsService,
    private stationsService: StationsService) { }
  
  ngOnInit() {
    console.log("Map Component onInit");
    
    this.route.queryParamMap
      .subscribe(params => {
        console.log("params", params)
        if(params && params["params"]){
          var pa = params["params"];
          this.query = new Query(
            pa.net,
            pa.cha,
            pa.sta,
            pa.loc,
            pa.qual,
            pa.start,
            pa.end,
            pa.metric
          );
        } else {
          this.query = new Query();
        }
      });
    if (this.query.metric.length > 0) {
      this.message = "fetching metrics";
      this.getMetrics();
      
      
    } else {
      // this.router.navigate(['../form']);
    }

  }
  
  // Get list of available metrics from IRIS
  private getMetrics(): void {
    this.metricsService.getMetrics(this.query.getString(["metric"])).subscribe(
      metrics => {
        this.getStations(this.query.getString(["net","sta","loc","cha"]), metrics);
      }
    );
  }
  
  // Get list of all stations
  private getStations(qString:string, metrics:Metric[]): void {
    this.stationsService.getStations(qString).subscribe(
      stations => {
        this.getMeasurements(this.query.getString(), metrics, stations);
      }
    );
  }
  
  //Get MUSTANG measurements
  private getMeasurements(qString:string, metrics:Metric[], stations:object): void {
    this.measurementsService.getMeasurements(qString).subscribe(
      measurements => {
        this.message = "have metrics, combining them now"
        this.combineMetrics(measurements, stations, metrics)
      }
    );
  }
  
  private combineMetrics(measurements:object, stations:object, metrics:Metric[]){
    this.combineMetricsService.combineMetrics(measurements, stations, metrics);
    this.combineMetricsService.getMetrics.subscribe(
      metrics => { 
        this.metrics = metrics;
      }
    );
    this.message = "metrics combined?"
  }
}
