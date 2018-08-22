# MUSTANGular V2.0
MUSTANGular is an Angular application that displays station metrics from the IRIS MUSTANG service on a leaflet map. (Created by Pacific Northwest Seismic Network - PNSN - 2018)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.5.

## General Information:
### Data:

The metric information is from the [IRIS MUSTANG metric service](https://service.iris.edu/mustang/metrics/1).  
The station data is from the [IRIS FDNSWS service](https://service.iris.edu/fdsnws/station/1/).  
The measurements information is from the [IRIS MUSTANG measurements service](https://service.iris.edu/mustang/measurements/1).  

### Form:

The form allows users to request measurements from MUSTANG. The form cannot be submitted until a date range and one or more metrics are selected.

See: [MUSTANG measurements service](https://service.iris.edu/mustang/measurements/1) for more information on input parameters.

### Parameters:
The map view can be altered and shared using URL parameters. Accepted URL parameters for changing the map view are:

    binmax = # (float) : sets maximum binning value, defaults to 95th percentile
    binmin = # (float) : sets minimum binning value, defaults to 5th percentile
    bincount = # (int) : sets number of bins, defaults to 3
    view = maximum | minimum | average | 5thpercentile | 95thpercentile (string) : sets the display value for the station, defaults to average
    coloring = string : sets the display colors.  

### Channel Priority:

The display channel is selected based on the user's prioritization of the channels. MUSTANGular will display data for a station using the first channel, in order of the prioritized list, that has data. 

### Display Values:

MUSTANGular displays data for a station using one channel at a time. (See: Channel Precendence) The display value indicates what value is shown for the station. Possible values are: 

    maximum : highest measurement for the channel
    minimum : lowest measurement for the channel
    average : average of the measurements for the channel 
    5thpercentile : 5th percentile of the measurements for the channel
    95thpercentile : 5th percentile of measurements for the channel

### Binning:

The coloring of icons is determined by sorting all of the displayed values into bins. The upper and lower limits of binned values and the number of bins are selected by the user. The bins are even in width and inclusive at the lower boundary and exclusive at the upper boundary. Any values that are outside of the limits of the bins are categorized as high or low outliers.

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

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Building and Deployment

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

For projects in subdirectories, include a base=href: `ng build --prod --base-href /mustang/mustangular/`

Copy files from 'dist' directory to install on a server. 

