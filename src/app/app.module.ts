// This is an Angular thing that tells the apps what to import

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
import { StationComponent , StationDialog} from './station/station.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MakeMarkersService } from './make-markers.service';
import { BinningService } from './binning.service';
import { ParametersService } from './parameters.service';
import { DataService } from './data.service';
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
  MatFormFieldModule,
  MatListModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSliderModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { SortablejsModule } from 'angular-sortablejs';
import { MarkersComponent } from './markers/markers.component';
import { ControlsComponent, ChannelsDialog} from './controls/controls.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ColorPickerModule} from 'ngx-color-picker';
import { KeyComponent } from './key/key.component';
import { ButtonsComponent, DownloadDialog, HelpDialog} from './buttons/buttons.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    FormComponent,
    StationComponent,
    MarkersComponent,
    ControlsComponent,
    ChannelsDialog,
    DownloadDialog,
    StationDialog,
    HelpDialog,
    KeyComponent,
    ButtonsComponent
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
    MatFormFieldModule,
    MatListModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule,
    FlexLayoutModule,
    AngularFontAwesomeModule,
    ColorPickerModule,
    NgxChartsModule,
    NoopAnimationsModule,
    SortablejsModule.forRoot({ animation: 150 })
  ],
  providers: [
    MakeMarkersService,
    BinningService,
    DataService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  entryComponents: [ChannelsDialog, DownloadDialog, StationDialog, HelpDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
