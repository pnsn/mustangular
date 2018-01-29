import { Component, OnInit } from '@angular/core';
import { Query } from '../query';
import { MetricService } from '../metric.service';
import { Metric } from '../metric'
import {Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})


export class FormComponent implements OnInit {
  //TODO: get metric list form IRIS
  metrics : Metric[];
  selectedMetrics : Metric[];
  loading: boolean = false;
  maxDate = new Date();
  query = new Query();
  
  constructor(private route: ActivatedRoute, private router: Router, private metricService: MetricService) { }

  ngOnInit() {
    this.getMetrics();
    this.route.queryParams
      .subscribe(params => {
        this.query.net = params.net;
        this.query.chan = params.chan;
        this.query.sta = params.sta;
        this.query.loc = params.loc;
        this.query.qual = params.qual;
        this.query.start = params.start;
        this.query.end = params.end;
        this.selectedMetrics = params.metric ? params.metric.split(',') : "";
      });
  }
  
  // Get list of available metrics from IRIS
  private getMetrics(): void {
    this.loading: true;
    this.metricService.getMetrics().subscribe(
      metrics => {
        this.loading = false;
        this.metrics = metrics
        console.log(this.metrics)
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
    console.log(this.query);
    this.query.metric = this.selectedMetrics.toString();
    this.router.navigate(['../map'], { queryParams: this.query }); 
  }
}
