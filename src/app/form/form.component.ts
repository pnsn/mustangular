import { Component, OnInit } from '@angular/core';
import { Query } from '../query';
import { MetricsService } from '../metrics.service';
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
  query : Query;
  
  constructor(private route: ActivatedRoute, private router: Router, private metricsService: MetricsService) { }
  
  ngOnInit() {
    this.getMetrics();
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
        this.selectedMetrics = params.metric ? params.metric.split(',') : "";
      });
      console.log(this.query)
  }
  
  // Get list of available metrics from IRIS
  private getMetrics(): void {
    this.loading= true;
    this.metricsService.getMetrics().subscribe(
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
  
  upperCase = (str : string) : string => {
    console.log(str)
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
    this.query.start = this.query.start.toISOString().replace(/Z.*$/gim, "");
    this.query.end = this.query.end.toISOString().replace(/Z.*$/gim, "");
    this.query.metric = this.selectedMetrics.toString();
    this.router.navigate(['../map'], { queryParams: this.query});
  }
}
