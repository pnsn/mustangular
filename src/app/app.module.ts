import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppComponent } from './app.component';
import 'hammerjs';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClientJsonpModule} from '@angular/common/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MapComponent } from './map/map.component';
import { FormComponent } from './form/form.component';
import { StationComponent } from './station/station.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MetricsService } from './metrics.service';
import { MeasurementsService } from './measurements.service';
import { StationsService } from './stations.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CombineMetricsService} from './combine-metrics.service';
import { MakeMarkersService } from './make-markers.service';
import { BinningService } from './binning.service';
import { ParametersService } from './parameters.service';
import { DataService } from './data.service'
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSliderModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { MarkersComponent } from './markers/markers.component';
import { ControlsComponent } from './controls/controls.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ColorPickerModule} from 'ngx-color-picker';
@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    FormComponent,
    StationComponent,
    MarkersComponent,
    ControlsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LeafletModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatToolbarModule,
    MatTooltipModule,
    FlexLayoutModule,
    AngularFontAwesomeModule,
    ColorPickerModule
  ],
  providers: [
    MetricsService,
    MeasurementsService,
    StationsService,
    CombineMetricsService,
    MakeMarkersService,
    BinningService,
    ParametersService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
