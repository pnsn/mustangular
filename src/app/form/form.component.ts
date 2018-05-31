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
  //TODO: get metric list form IRIS
  metrics : Metric[];
  selectedMetrics : any;
  loading: boolean = false;
  maxDate = new Date();
  query : Query;
  
  constructor (
    private router: Router,
    private metricsService: MetricsService,
    private parametersService: ParametersService
  ) { }
  
  ngOnInit() {
    console.log("FormComponent onInit");
    this.getMetrics();
    
    this.parametersService.getQuery().subscribe(
      query => { 
        this.query = query;
        this.selectedMetrics = query.metric ? query.metric.split(',') : [];
      }
    );
  
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

  // Disable dates that haven't happened yet and dates after end date
  startFilter = (d: Date): boolean => {
    const day = d;
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    
    if( this.query.end ){
      return day < tomorrow && day < new Date(this.query.end);
    } else {
      return day < tomorrow
    } 
  }
  
  // Take a string and make it capitalized 
  upperCase = (str : string) : string => {
    return str ? str.toUpperCase() : "";
  }
  
  // Disable dates that haven't happened yet and dates before start date  
  endFilter = (d: Date): boolean => {
    const day = d;
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    if( this.query.start ){
      return day < tomorrow && day > new Date(this.query.start);
    } else {
      return day < tomorrow
    } 
  }

  // Submit form 
  onSubmit() {
    var start = new Date(this.query.start);
    var end = new Date(this.query.end);
    this.query.net=this.query.net.replace(/\s/m,"");
    this.query.start = start.toISOString().replace(/Z.*$/gim, "");
    this.query.end = end.toISOString().replace(/Z.*$/gim, "");
    this.query.metric = this.selectedMetrics.toString();
    this.router.navigate(['../map'], { queryParams: this.query});
  }
}
