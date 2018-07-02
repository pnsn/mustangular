// Entry form for MUSTANGular

import { Component, OnInit, OnDestroy} from '@angular/core';
import { Query } from '../query';
import { MetricsService } from '../metrics.service';
import { Metric } from '../metric';
import { Router } from '@angular/router';
import { ParametersService } from '../parameters.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [MetricsService, ParametersService]
})

export class FormComponent implements OnInit,OnDestroy {
  
  constructor (
    private router: Router,
    private metricsService: MetricsService,
    private parametersService: ParametersService
  ) {}
  
  metrics : Metric[]; // Available metrics from MUSTANG
  maxDate = new Date(); // Current date to prevent requests from future
  query = new Query();// Holds all the query data
  selectedMetrics : any = []; // Selected metrics
  //TODO: Fix two way binding of selected metrics
  loading: boolean = false; // TODO: figure out if this is being used
  subscription : Subscription = new Subscription();
  
  ngOnInit() {
    
    // Get metrics to populate form
    this.getMetrics();
    
    // Wait for query to be populated from url
    const sub = this.parametersService.getQuery().subscribe(
      query => { 
        this.query = query;
        this.selectedMetrics = query.metric ? query.metric.split(',') : [];
        console.log(this.selectedMetrics)
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
        this.metrics = metrics;
      },
      err => {
          console.log("I GOT AN ERROR", err.error);
      }
    ); 
    this.subscription.add(sub);
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

