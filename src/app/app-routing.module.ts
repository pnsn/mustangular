import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapComponent } from './map/map.component';
import { FormComponent } from './form/form.component';
import { StationComponent} from './station/station.component';


const routes: Routes = [
 { path: 'map', component: MapComponent},
 { path: 'form', component: FormComponent },
 { path: 'station', component: StationComponent },
 { path: '', redirectTo: 'form', pathMatch: 'full' }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}