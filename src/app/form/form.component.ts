// Entry form for MUSTANGular

import { Component, OnInit, OnDestroy} from '@angular/core';
import { Query } from '../query';
import { MetricsService } from '../metrics.service';
import { Metric } from '../metric';
import { Router } from '@angular/router';
import { ParametersService } from '../parameters.service';
import { Subscription } from "rxjs";
import * as moment from 'moment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [MetricsService, ParametersService]
})

export class FormComponent implements OnInit,OnDestroy {
  
  constructor (
    private router: Router,
    private metricsService: MetricsService,
    private parametersService: ParametersService
  ) {}
  
  metrics : any = []; // Available metrics from MUSTANG
  maxDate = new Date(); // Current date to prevent requests from future
  query = new Query();// Holds all the query data
  selectedMetrics : string[] = []; // Selected metrics
  initialMetrics : string[] = []; // Metrics from URL
  loading: boolean = true;  // Are metrics still loading?
  subscription : Subscription = new Subscription(); // Handles connections
  message : string; // Error messages
  start : any;
  end : any;
  ngOnInit() {
    
    // Get metrics to populate form
    this.getMetrics();
    
    // Wait for query to be populated from url
    const sub = this.parametersService.getQuery().subscribe(
      query => { 
        this.query = query;
        this.initialMetrics = query.metric ? query.metric.split(',') : [];
        if(this.query.start && this.query.end){
          this.start = moment(this.query.start);
          this.end = moment(this.query.end);
        }
      }
    );
    this.subscription.add(sub);
    
    // Tells parameter service to get parameters
    this.parametersService.setQueryParameters();
  }
  
  ngOnDestroy (){
    this.subscription.unsubscribe();
  }
  
  // Get list of available metrics from IRIS
  private getMetrics(): void {
    this.loading= true;
    const sub = this.metricsService.getMetrics().subscribe(
      metrics => {
        this.loading = false;
        for(let metric of metrics){
          if( metric.tables[0].columns[0].name == "value") {
            this.metrics.push({name: metric.name.toUpperCase(), title: metric.title});
          }
        }
        this.selectedMetrics = this.initialMetrics.slice();
      },
      err => {
        this.message = "Cannot fetch metrics. Please try again."
      }
    ); 
    this.subscription.add(sub);
  }
  
  // Check if metric should be selected
  metricSelected(metricName : string) : boolean {
    return this.initialMetrics.indexOf(metricName) >= 0;
  }
  
  // Store selected metric
  onMetricSelect(event) : void {
    this.selectedMetrics = event;
  }
  
  // Take a string and make it capitalized 
  upperCase = (str : string) : string => {
    return str ? str.toUpperCase() : "";
  }

  // Disable dates that haven't happened yet and dates after end date
  startFilter = (d: Date): boolean => {
    const day = d;
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    
    if( this.query.end ){
      return day < tomorrow && day < new Date(this.query.end);
    } else {
      return day < tomorrow;
    } 
  }
  
  // Disable dates that haven't happened yet and dates before start date  
  endFilter = (d: Date): boolean => {
    const day = d;
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    if( this.query.start ){
      return day < tomorrow && day > new Date(this.query.start);
    } else {
      return day < tomorrow;
    } 
  }

  // Submit form 
  onSubmit() {
    this.query.metric = this.selectedMetrics.toString();
    this.query.sanitize(this.start, this.end);
    this.router.navigate(['../map'], { queryParams: this.query});
  }
}

