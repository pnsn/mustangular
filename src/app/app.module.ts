// This is an Angular thing that tells the apps what to import

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClientJsonpModule} from '@angular/common/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MapComponent } from './components/map/map.component';
import { FormComponent } from './components/form/form.component';
import { StationComponent , StationDialogComponent} from './components/map/markers/station/station.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MakeMarkersService } from '@services/make-markers.service';
import { BinningService } from '@services/binning.service';
import { DataService } from '@services/data.service';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
// import { SortablejsModule } from 'ngx-sortablejs';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { MarkersComponent } from './components/map/markers/markers.component';
import { ControlsComponent} from './components/map/controls/controls.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ColorPickerModule} from 'ngx-color-picker';
import { KeyComponent } from './components/map/controls/key/key.component';
import { ButtonsComponent, DownloadDialogComponent, HelpDialogComponent} from './components/map/controls/buttons/buttons.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ColoringComponent } from './components/map/controls/coloring/coloring.component';
import { RemoveUnderscorePipe } from './pipes/remove-underscore.pipe';
import { LoadingComponent } from './components/loading/loading.component';
import { StationsService } from '@services/stations.service';
import { ChannelsDialogComponent } from './components/map/controls/channels-dialog/channels-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        MapComponent,
        FormComponent,
        StationComponent,
        MarkersComponent,
        ControlsComponent,
        ChannelsDialogComponent,
        DownloadDialogComponent,
        StationDialogComponent,
        HelpDialogComponent,
        KeyComponent,
        ButtonsComponent,
        ColoringComponent,
        RemoveUnderscorePipe,
        LoadingComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        LeafletModule,
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
        MatMomentDateModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatTooltipModule,
        FlexLayoutModule,
        FontAwesomeModule,
        ColorPickerModule,
        NgxChartsModule,
        NoopAnimationsModule,
        DragDropModule
    ],
    providers: [
        MakeMarkersService,
        BinningService,
        StationsService,
        DataService,
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
