import { Component, OnInit } from '@angular/core';
import { icon, latLng, marker, polyline, tileLayer } from 'leaflet';
import { MetricsService } from '../metrics.service';
import { Metric } from '../metric'
import { MeasurementsService } from '../measurements.service';
import { Measurement } from '../measurement'
import { Router, ActivatedRoute } from '@angular/router';
import { Query } from '../query';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  query : Query;
  metrics : Metric[];
  measurements = [];
  constructor(private route: ActivatedRoute, private router: Router, private metricsService: MetricsService, private measurementsService: MeasurementsService) { }

  ngOnInit() {
      
    this.route.queryParamMap
      .subscribe(params => {
        var pa = params.params;
        this.query = new Query(
          pa.net,
          pa.chan,
          pa.sta,
          pa.loc,
          pa.qual,
          pa.start, 
          pa.end,
          pa.metric
        );
      });
    if (this.query.metric.length > 0) {
      this.getMetrics();
      this.getMeasurements(this.query.getString());
    
    } else {
      // this.router.navigate(['../form']);
    }

  }
  
  // Get list of available metrics from IRIS
  private getMetrics(): void {
    this.metricsService.getMetrics().subscribe(
      metrics => {
        this.metrics = metrics
      }
    ); 
  }
  
  private getMeasurements(qString:string): void {
    console.log("string", qString)
    this.measurementsService.getMeasurements(qString).subscribe(
      measurements => {
        this.measurements = measurements
      }
    );
  }
  
  options = {
  	layers: [
  		tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18, attribution: '...' })
  	],
  	zoom: 5,
  	center: latLng(46.879966, -121.726909)
  };

// import markers and add to map here
}
