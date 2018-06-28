// Entry form for MUSTANGular

import { Component, OnInit } from '@angular/core';
import { Query } from '../query';
import { MetricsService } from '../metrics.service';
import { Metric } from '../metric';
import { Router } from '@angular/router';
import { ParametersService } from '../parameters.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
  
  constructor (
    private router: Router,
    private metricsService: MetricsService,
    private parametersService: ParametersService
  ) {}
  
  metrics : Metric[]; // Available metrics from MUSTANG
  maxDate = new Date(); // Current date to prevent requests from future
  query = new Query();// Holds all the query data
  selectedMetrics : any; // Selected metrics
  loading: boolean = false; // TODO: figure out if this is being used

  ngOnInit() {
    console.log("FormComponent onInit");
    
    // Get metrics to populate form
    this.getMetrics();
    
    // Wait for query to be populated from url
    this.parametersService.getQuery().subscribe(
      query => { 
        this.query = query;
        this.selectedMetrics = query.metric ? query.metric.split(',') : [];
      }
    );
    
    // Tells parameter service to get parameters
    this.parametersService.setQueryParameters();
  }
  
  // Get list of available metrics from IRIS
  private getMetrics(): void {
    this.loading= true;
    this.metricsService.getMetrics().subscribe(
      metrics => {
        this.loading = false;
        this.metrics = metrics
      }); 
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
    this.query.sanitize();
    this.router.navigate(['../map'], { queryParams: this.query});
  }
}
