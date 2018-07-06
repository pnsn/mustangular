# MustangularV2

An Angular application that displays station metrics from the IRIS MUSTANG service on a leaflet map.  (Created by Pacific Northwest Seismic Network - PNSN - 2018)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).


## General Information:

### Form:

The form capitalizes input to the text entry boxes. The metric select is populated from the IRIS MUSTANG metric service. The form cannot be submitted until a date range and one or more metrics are selected.

### Parameters:

Accepted URL parameters for changing the map view are:

    binmax = # (float) : sets maximum binning value, defaults to 95th percentile
    binmin = # (float) : sets minimum binning value, defaults to 5th percentile
    bincount = # (int) : sets number of bins, defaults to 3
    view = maximum | minimum | average | 5thpercentile | 95thpercentile (string) : sets the value for the station, defaults to average
    high = color : t op   
    low = color : 

### Metric Information:

The metric information is from the IRIS MUSTANG metric service.  ( https://service.iris.edu/mustang/metrics/1 )

### Channel Precedence:

The display channel is selected by the ordering of the channels.

### Displayed Values:



### Station Data:



### Binning:

The coloring of icons is determined by sorting the displayed values into bins. The upper and lower limits of binned values and the number of bins are configured by the user. The bins are even width and inclusive at the lower boundary and exclusive at the upper boundary. Any values that are outside of the limits of the bins are categorized as high or low outliers.

### Key:

The key has checkboxes for each "bin" that allows users to toggle the corresponding values on the map. The histogram on the key represents the proportion of stations that fall into that bin.

### Libraries:

    Angular
    Angular Material
    Leaflet
    RainbowVis-JS
    Flex-Layout
    Ngx-Charts
    Angular Font Awesome / Font Awesome


