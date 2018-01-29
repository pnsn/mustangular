import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapComponent } from './map/map.component';
import { FormComponent } from './form/form.component';
import { StationComponent} from './station/station.component';


const routes: Routes = [
  { path: '', redirectTo: 'form', pathMatch: 'full' },
  { path: 'form', component: FormComponent },
  { path: 'map?metric=', component: MapComponent},
  { path: 'map', redirectTo: 'form', pathMatch: 'full' },
  { path: 'station', component: StationComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}