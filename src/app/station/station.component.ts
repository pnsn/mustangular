// TODO: Generates station graphs

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}


  // TODO: get all metric data
  ngOnInit() {
    // this.station = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.service.getHero(params.get('station')))
    //
    // );
    
    let stationCode = this.route.snapshot.paramMap.get('station');
    console.log(stationCode)
    // this.hero$ = this.service.getHero(id);
  }

}
