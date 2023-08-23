export const metricsData = {
  metrics: [
    {
      name: "amplifier_saturation",
      title: "Amplifier Saturation Metric",
      description:
        "<p>The number of times that the 'Amplifier saturation detected' bit in the 'dq_flags' byte is set within a miniSEED file.  This data quality flag is set by some dataloggers in the fixed section of the miniSEED header. The flag was intended to indicate that the preamp is being overdriven, but the exact meaning is datalogger-specific.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/amplifier_saturation>Detailed Documentation</a></p>",
      version: 0,
      tables: [
        {
          name: "amplifier_saturation",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Integer",
              sqlType: "INTEGER",
              description:
                "<p>Amplifier saturation detected Units='Flag Count'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "asl_coherence",
      title: "Asl Coherence Metric",
      description:
        "<p>This metric computes the coherence between two co-located broadband sensors using a gamma-squared coherence. Data windows for comparison are one-day and only like components are compared (e.g. vertical to vertical). The coherence values are averaged into different frequency bands. (contributed by Albuquerque Seismic Laboratory)<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/asl_coherence>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "asl_coherence",
          columns: [
            {
              name: "PB4to8sec",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>The average coherence in the 4 to 8 second period range.</p>",
              notNull: true,
            },
            {
              name: "PB18to22sec",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>The average coherence in the 18 to 22 second period range.</p>",
              notNull: true,
            },
            {
              name: "PB90to110sec",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>The average coherence in the 90 to 110 second period range.</p>",
              notNull: true,
            },
            {
              name: "PB200to500sec",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>The average coherence in the 200 to 500 second period range.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "calibration_signal",
      title: "Calibration Signal Metric",
      description:
        "<p>The number of times that the 'Calibration signals present' bit in the 'act_flags' byte is set within a miniSEED file.  A value of 1 indicates that a calibration signal was being sent to that channel.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/calibration_signal>Detailed Documentation</a></p>",
      version: 0,
      tables: [
        {
          name: "calibration_signal",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Integer",
              sqlType: "INTEGER",
              description:
                "<p>Calibration signals present Units='Flag Count'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "clock_locked",
      title: "Clock Locked Metric",
      description:
        "<p>The number of times that the 'Clock locked' bit in the 'io_flags' byte is set within a miniSEED file.  This clock flag is set to 1 by some dataloggers in the fixed section of the miniSEED header to indicate that its GPS has locked with enough satellites to obtain a time/position fix.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/clock_locked>Detailed Documentation</a></p>",
      version: 0,
      tables: [
        {
          name: "clock_locked",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Integer",
              sqlType: "INTEGER",
              description: "<p>Clock locked Units='Flag Count'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "cross_talk",
      title: "Cross Talk Metric",
      description:
        "<p>The correlation coefficient of channel pairs from the same sensor.  Data windows are defined by seismic events.  Correlation coefficients near 1 may indicate cross-talk between those channels.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/cross_talk>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "cross_talk",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>The correlation coefficient of channel pairs from the same sensor. Units='Correlation Coefficient'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "data_latency",
      title: "Data Latency Metric",
      description:
        "<p>Data latency is the time in seconds between the acquisition of a sample in the field and the time that it was written to disk or memory at the IRIS DMC.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/data_latency>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "data_latency",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Integer",
              sqlType: "INTEGER",
              description: "<p>Data latency. Units='Seconds'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "dc_offset",
      title: "Dc Offset Metric",
      description:
        "<p>Metric to process a series of daily means and return a vector of likelihood that a DC shift has occurred.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/dc_offset>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "dc_offset",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>A unitless value indicating the degree of localized change in signal mean. Units='Likelihood Indicator'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "dead_channel_gsn",
      title: "Dead Channel Gsn Metric",
      description:
        "<p>A boolean measurement providing a TRUE or FALSE indication that the channel exhibits a 5dB deviation below the NLNM in the 4 to 8s period band as measured using a McNamara PDF noise matrix.  The TRUE condition is indicated with a numeric representation of '1' and the FALSE condition represented as a '0'.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/dead_channel_gsn>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "dead_channel_gsn",
          columns: [
            {
              name: "value",
              javaType: "java.lang.String",
              sqlType: "TEXT",
              description:
                "<p>Set to 1 if TRUE that it meets the GSN dead channel criteria, set to 0 if FALSE. Units='Boolean Indicator'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "dead_channel_lin",
      title: "Dead Channel Lin Metric",
      description:
        "<p>Dead channel metric - linear fit. This metric is calculated from the mean of all the PSDs generated (typically 47 for a 24 hour period). Values of the PSD mean curve over the band linLoPeriod:linHiPeriod are fit to a linear curve by a least squares linear regression of PSD mean ~ log(period). The dead_channel_lin metric is the standard deviation of the fit residuals of this regression. Lower numbers indicate a better fit and a higher likelihood that the mean PSD is linear - an indication that the sensor is not returning expected seismic energy.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/dead_channel_lin>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "dead_channel_lin",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>Standard deviation of residuals. Units='Power (dB)'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "digital_filter_charging",
      title: "Digital Filter Charging Metric",
      description:
        "<p>The number of times that the 'A digital filter may be charging' bit in the 'dq_flags' byte is set within a miniSEED file.  Data samples acquired while a datalogger is loading filter parameters - such as after a reboot - may contain a transient.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/digital_filter_charging>Detailed Documentation</a></p>",
      version: 0,
      tables: [
        {
          name: "digital_filter_charging",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Integer",
              sqlType: "INTEGER",
              description:
                "<p>A digital filter may be charging Units='Flag Count'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "digitizer_clipping",
      title: "Digitizer Clipping Metric",
      description:
        "<p>The number of times that the 'Digitizer clipping detected' bit in the 'dq_flags' byte is set within a miniSEED file.  This flag indicates that the input voltage has exceeded the maximum range of the ADC.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/digitizer_clipping>Detailed Documentation</a></p>",
      version: 0,
      tables: [
        {
          name: "digitizer_clipping",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Integer",
              sqlType: "INTEGER",
              description:
                "<p>Digitizer clipping detected Units='Flag Count'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "event_begin",
      title: "Event Begin Metric",
      description:
        "<p>The number of times that the 'Beginning of an event, station trigger' bit in the 'act_flags' byte is set within a miniSEED file.  This metric can be used to quickly identify data days that may have events. It may also indicate when trigger parameters need adjusting at a station.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/event_begin>Detailed Documentation</a></p>",
      version: 0,
      tables: [
        {
          name: "event_begin",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Integer",
              sqlType: "INTEGER",
              description:
                "<p>Beginning of an event, station trigger Units='Flag Count'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "event_end",
      title: "Event End Metric",
      description:
        "<p>The number of times that the 'End of an event, station detrigger' bit in the 'act_flags' byte is set within a miniSEED file.  This metric can be used to quickly identify data days that may have events. It may also indicate when trigger parameters need adjusting at a station.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/event_end>Detailed Documentation</a></p>",
      version: 0,
      tables: [
        {
          name: "event_end",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Integer",
              sqlType: "INTEGER",
              description:
                "<p>End of an event, station detrigger Units='Flag Count'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "event_in_progress",
      title: "Event In Progress Metric",
      description:
        "<p>The number of times that the 'Event in progress' bit in the 'act_flags' byte is set within a miniSEED file.  This metric can be used to quickly identify data days that may have events. It may also indicate when trigger parameters need adjusting at a station.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/event_in_progress>Detailed Documentation</a></p>",
      version: 0,
      tables: [
        {
          name: "event_in_progress",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Integer",
              sqlType: "INTEGER",
              description: "<p>Event in progress Units='Flag Count'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "feed_latency",
      title: "Feed Latency Metric",
      description:
        "<p>Feed latency is the time in seconds since new data from a channel was last written to disk or memory at the IRIS DMC.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/feed_latency>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "feed_latency",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Integer",
              sqlType: "INTEGER",
              description: "<p>Feed latency. Units='Seconds'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "glitches",
      title: "Glitches Metric",
      description:
        "<p>The number of times that the 'Glitches detected' bit in the 'dq_flags' byte is set within a miniSEED file.  This metric can be used to identify data with large filled values that data users may need to handle in a way that they don't affect their research outcomes.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/glitches>Detailed Documentation</a></p>",
      version: 0,
      tables: [
        {
          name: "glitches",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Integer",
              sqlType: "INTEGER",
              description: "<p>Glitches detected Units='Flag Count'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "gsn_timing",
      title: "Gsn Timing Metric",
      description:
        "<p>This metric reports the lowest timing quality as recorded by the datalogger for GSN data. The timing quality for Quanterra Q330HR digitizers is determined from miniSEED Blockette 1001, field 3 values. The timing quality for earlier dataloggers is mapped to Quanterra Q330HR conventions for consistent values across time. (contributed by Albuquerque Seismic Laboratory)<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/gsn_timing>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "gsn_timing",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>Minimum timing quality value. Units='Percent'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "max_gap",
      title: "Max Gap Metric",
      description:
        "<p>Indicates the size of the largest gap encountered within a 24-hour window.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/max_gap>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "max_gap",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>Maximum gap length in a day. Units='Seconds'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "max_overlap",
      title: "Max Overlap Metric",
      description:
        "<p>Indicates the size of the largest overlap in seconds encountered within a 24-hour window.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/max_overlap>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "max_overlap",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description: "<p>Maximum overlap in a day. Units='Seconds'</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "max_range",
      title: "Max Range Metric",
      description:
        "<p>This metric calculates the difference between the largest and smallest sample value in a 5 minute rolling window and returns the largest value encountered within a 24-hour timespan.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/max_range>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "max_range",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description: "<p>Maximum range per day. Units='Counts'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "max_stalta",
      title: "Max STA/LTA Metric",
      description:
        "<p>The STALTAMetric function calculates the maximum of STA/LTA of the incoming seismic signal over a 24 hour period. In order to reduce computation time of the rolling averages, the averaging window is advanced in 1/2 second increments.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/max_stalta>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "max_stalta",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>Maximum of short to long-term average and the approximate time where the average occurred. Units='STA/LTA Value'.</p>",
              notNull: true,
            },
            {
              name: "time",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description: "<p>The time index that applies to the value.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "metric_error",
      title: "Metric Error Metric",
      description:
        "<p>A place for storing an error code and message reported while processing a given target or set of targets.  It can point to metric and time for later forensics.  The entry will not be removed once the issue is resolved, so it is best to check the lddate (load date).<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/metric_error>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "metric_error",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Integer",
              sqlType: "INTEGER",
              description: "<p>An error code, if applicable</p>",
              notNull: true,
            },
            {
              name: "message",
              javaType: "java.lang.String",
              sqlType: "TEXT",
              description: "<p>The error message</p>",
              notNull: false,
            },
            {
              name: "metric",
              javaType: "java.lang.String",
              sqlType: "TEXT",
              description:
                "<p>The metric or metric family being processed when the error occurred</p>",
              notNull: false,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "missing_padded_data",
      title: "Missing Padded Data Metric",
      description:
        "<p>The number of times that the 'Missing/padded data present' bit in the 'dq_flags' byte is set within a miniSEED file.  This metric can be used to identify data with padded values that data users may need to handle in a way that they don't affect their research outcomes.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/missing_padded_data>Detailed Documentation</a></p>",
      version: 0,
      tables: [
        {
          name: "missing_padded_data",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Integer",
              sqlType: "INTEGER",
              description:
                "<p>Missing/padded data present Units='Flag Count'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "num_gaps",
      title: "Num Gaps Metric",
      description:
        "<p>This metric reports the number of gaps encountered within a 24-hour window.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/num_gaps>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "num_gaps",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Integer",
              sqlType: "INTEGER",
              description: "<p>Number of gaps per day. Units='Gap Count'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "num_overlaps",
      title: "Num Overlaps Metric",
      description:
        "<p>This metric reports the number of overlaps encountered in a 24-hour window.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/num_overlaps>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "num_overlaps",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Integer",
              sqlType: "INTEGER",
              description:
                "<p>Number of overlaps in a day. Units='Overlap Count'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "num_spikes",
      title: "Num Spikes Metric",
      description:
        "<p>This metric uses a rolling Hampel filter, a median absolute deviation (MAD) test, to find outliers in a timeseries. The number of discrete spikes is determined after adjacent outliers have been combined into individual spikes.<br><i>NOTE: not to be confused with the spikes metric, which is an SOH flag only.</i><br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/num_spikes>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "num_spikes",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Integer",
              sqlType: "INTEGER",
              description:
                "<p>Number of spikes detected in a day. Units='Outlier Count'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "orientation_check",
      title: "Orientation Check Metric",
      description:
        "<p>Determine channel orientations by rotating horizontal channels until the resulting radial component maximizes cross-correlation with the Hilbert transform of the vertical component. This metric uses Rayleigh waves from large, shallow events.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/orientation_check>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "orientation_check",
          columns: [
            {
              name: "azimuth_R",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>The azimuth of the radial component demonstrating maximum coherence.</p>",
              notNull: true,
            },
            {
              name: "backAzimuth",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>Back azimuth from the this station to the source event, in degrees from north.</p>",
              notNull: true,
            },
            {
              name: "azimuth_Y_obs",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>The observed Y horizontal component direction based on maximum coherence.</p>",
              notNull: true,
            },
            {
              name: "azimuth_X_obs",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>The X horizontal component direction set to 90 degrees clockwise from observed Y.</p>",
              notNull: true,
            },
            {
              name: "azimuth_Y_meta",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>The Y orthogonal sensor direction recorded in the metadata.</p>",
              notNull: true,
            },
            {
              name: "azimuth_X_meta",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>The X orthogonal sensor direction recorded in the metadata.</p>",
              notNull: true,
            },
            {
              name: "max_Czr",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>Normalized correlation coefficient #1 (see full documentation for details).</p>",
              notNull: true,
            },
            {
              name: "max_C_zr",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>Normalized correlation coefficient #2 (see full documentation for details).</p>",
              notNull: true,
            },
            {
              name: "magnitude",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description: "<p>The magnitude of the source event.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "pct_above_nhnm",
      title: "Pct Above Nhnm Metric",
      description:
        "<p>Percent above New High Noise Model.  Percentage of Probability Density Function values that are above the New High Noise Model. This value is calculated over the entire time period.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/pct_above_nhnm>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "pct_above_nhnm",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description: "<p>Percent value 0-100. Units='Percent'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "pct_below_nlnm",
      title: "Pct Below Nlnm Metric",
      description:
        "<p>Percent below New Low Noise Model.  Percentage of Probability Density Function values that are below the New Low Noise Model. This value is calculated over the entire time period.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/pct_below_nlnm>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "pct_below_nlnm",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description: "<p>Percent value 0-100. Units='Percent'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "percent_availability",
      title: "Percent Availability Metric",
      description:
        "<p>The portion of data available for each day is represented as a percentage. 100% data available means full coverage of data for the reported start and end time.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/percent_availability>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "percent_availability",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description: "<p>Data availability. Units='Percent'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "polarity_check",
      title: "Polarity Check Metric",
      description:
        "<p>The signed cross-correlation peak value based on the cross-correlation of two neighboring station channels in proximity to a large earthquake signal. A negative peak close to 1.0 can indicate reversed polarity.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/polarity_check>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "polarity_check",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>The signed cross-correlation peak value. Units='Cross-Correlation Value'.</p>",
              notNull: true,
            },
            {
              name: "snclq2",
              javaType: "java.lang.String",
              sqlType: "TEXT",
              description:
                "<p>The neighboring station with a similarly oriented sensor component</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "pressure_effects",
      title: "Pressure Effects Metric",
      description:
        "<p>The correlation coefficient of a seismic channel and an LDO pressure channel.Large correlation coefficients may indicate the presence of atmospheric effects in the seismic data.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/pressure_effects>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "pressure_effects",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>Cross-correlation function value at zero lag. Units='Cross-Correlation Value'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "sample_max",
      title: "Sample Max Metric",
      description:
        "<p>This metric reports largest amplitude value in counts encountered within a 24-hour window.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/sample_max>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "sample_max",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>Maximum sample value per day. Units='Counts'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "sample_mean",
      title: "Sample Mean Metric",
      description:
        "<p>This metric reports the average amplitude value in counts over a 24-hour window. This mean is one measure of the central tendency of the amplitudes that is calculated from every amplitude value present in the time series. The mean value itself may not occur as an amplitude value in the times series.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/sample_mean>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "sample_mean",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description: "<p>Mean sample value per day. Units='Counts'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "sample_median",
      title: "Sample Median Metric",
      description:
        "<p>This metric reports the middle amplitude value in counts of sorted amplitude values from a 24-hour window. This median is one measure of the central tendency of the amplitudes in a time series when values are arranged in sorted order. The median value itself always occurs as an amplitude value in the times series.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/sample_median>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "sample_median",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>Median sample value per day. Units='Counts'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "sample_min",
      title: "Sample Min Metric",
      description:
        "<p>This metric reports smallest amplitude value in counts encountered within a 24-hour window.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/sample_min>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "sample_min",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>Minimum sample value per day. Units='Counts'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "sample_rate_channel",
      title: "Sample Rate Channel Metric",
      description:
        "<p>A boolean measurement that returns 0 if miniSEED and channel sample rates agree within 1%, or 1 if they disagree. <br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/sample_rate_channel>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "sample_rate_channel",
          columns: [
            {
              name: "value",
              javaType: "java.lang.String",
              sqlType: "TEXT",
              description:
                "<p>Set to 1 if miniSEED and channel sample rates conflict.  Set to 0 if sample rates agree. Units='Boolean Indicator'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "sample_rate_resp",
      title: "Sample Rate Resp Metric",
      description:
        "<p>A boolean measurement that returns 0 if miniSEED and response-derived sample rates agree within 15%, or 1 if they disagree. Response-derived sample rates assume that the high-frequency amplitude rolloff is ~85% of the Nyquist frequency.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/sample_rate_resp>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "sample_rate_resp",
          columns: [
            {
              name: "value",
              javaType: "java.lang.String",
              sqlType: "TEXT",
              description:
                "<p>Set to 1 if miniSEED and response-derived sample rates conflict.  Set to 0 if sample rates agree. Units='Boolean Indicator'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "sample_rms",
      title: "Sample RMS",
      description:
        "<p>Displays the RMS variance of trace amplitudes within a 24-hour window.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/sample_rms>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "sample_rms",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description: "<p>RMS variance. Units='Counts'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "sample_snr",
      title: "Sample SNR",
      description:
        "<p>A ratio of the RMS variance calculated from data 30 seconds before and 30 seconds following the predicted first-arriving P phase.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/sample_snr>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "sample_snr",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>The signal to noise ratio for the seismic event. Units='Signal-to-Noise Ratio'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "sample_unique",
      title: "Sample Unique Metric",
      description:
        "<p>This metric reports the number (count) of unique values in data trace  over a 24-hour window. <br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/sample_unique>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "sample_unique",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>Count of unique values per day. Units='Unique Sample Count'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "spikes",
      title: "Spikes Metric",
      description:
        "<p>The number of times that the 'Spikes detected' bit in the 'dq_flags' byte is set within a miniSEED file.  This data quality flag is set by some dataloggers in the fixed section of the miniSEED header when short-duration spikes have been detected in the data. Because spikes have shorter duration than the natural period of most seismic sensors, spikes often indicate a problem introduced at or after the datalogger.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/spikes>Detailed Documentation</a></p>",
      version: 0,
      tables: [
        {
          name: "spikes",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Integer",
              sqlType: "INTEGER",
              description: "<p>Spikes detected Units='Flag Count'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "suspect_time_tag",
      title: "Suspect Time Tag Metric",
      description:
        "<p>The number of times that the 'Time tag is questionable' bit in the 'dq_flags' byte is set within a miniSEED file.  This metric can be used to identify stations with GPS locking problems and data days with potential timing issues.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/suspect_time_tag>Detailed Documentation</a></p>",
      version: 0,
      tables: [
        {
          name: "suspect_time_tag",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Integer",
              sqlType: "INTEGER",
              description:
                "<p>Time tag is questionable Units='Flag Count'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "telemetry_sync_error",
      title: "Telemetry Sync Error Metric",
      description:
        "<p>The number of times that the 'Telemetry synchronization error' bit in the 'dq_flags' byte is set within a miniSEED file.  This metric can be searched to determine which stations may have telemetry problems or to identify or omit gappy data from a data request.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/telemetry_sync_error>Detailed Documentation</a></p>",
      version: 0,
      tables: [
        {
          name: "telemetry_sync_error",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Integer",
              sqlType: "INTEGER",
              description:
                "<p>Telemetry synchronization error Units='Flag Count'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "timing_correction",
      title: "Timing Correction Metric",
      description:
        "<p>The number of times that the 'Time correction applied' bit in the 'act_flags' byte is set within a miniSEED file.  This clock quality flag is set by the network operator in the fixed section of the miniSEED header when a timing correction stored in field 16 of the miniSEED fixed header has been applied to the data's original time stamp. A value of 0 means that no timing correction has been applied.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/timing_correction>Detailed Documentation</a></p>",
      version: 0,
      tables: [
        {
          name: "timing_correction",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Integer",
              sqlType: "INTEGER",
              description: "<p>Time correction applied Units='Flag Count'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "timing_quality",
      title: "Timing Quality Metric",
      description:
        "<p>Daily average of the SEED timing quality stored in miniSEED blockette 1001. This value is vendor specific and expressed as a percentage of maximum accuracy. Percentage is NULL if not present in the miniSEED.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/timing_quality>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "timing_quality",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description: "<p>Average timing quality. Units='Percent'.</p>",
              notNull: false,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "total_latency",
      title: "Total Latency Metric",
      description:
        "<p>Total latency is the time in seconds since a channel's most recent data sample from the data center disk buffer was acquired in the field. It is the sum of the data and feed latencies. MUSTANG measures total latency every four hours. The normal operating value for total latency is largely station-dependent, so it can vary widely. Channels with lower sample rates generally have longer total latencies since it takes longer to fill a telemetry packet or SEED record.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/total_latency>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "total_latency",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Integer",
              sqlType: "INTEGER",
              description: "<p>Total latency. Units='Seconds'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "transfer_function",
      title: "Transfer Function Metric",
      description:
        "<p>Transfer function metric consisting of the gain ratio, phase difference and magnitude squared of two colocated sensors.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/transfer_function>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "transfer_function",
          columns: [
            {
              name: "gain_ratio",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>The gain transfer function ratio divided by the metadata amplitude response ratio for coincident channel pairs.</p>",
              notNull: true,
            },
            {
              name: "phase_diff",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>The phase transfer function difference divided by the metadata phase response difference for coincident channel pairs.</p>",
              notNull: true,
            },
            {
              name: "ms_coherence",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>The magnitude squared coherence between coincident channel pairs.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "com.isti.bss.metrics.columns.Snclq",
              sqlType: "INTEGER",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: true,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMPTZ",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "ts_channel_continuity",
      title: "Ts Channel Continuity Metric",
      description:
        "<p>(TS PROTOTYPE) This metric reports time durations of continuous data for the specified channel over the time extent specified by the user.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/ts_channel_continuity>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "ts_channel_continuity",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>Time durations of continuous data. Units='Seconds'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "java.lang.String",
              sqlType: "VARCHAR(32)",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: false,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "ts_channel_gap_list",
      title: "Ts Channel Gap List Metric",
      description:
        "<p>(TS PROTOTYPE) This metric reports time durations of gaps in data for the specified channel over the time extent specified by the user.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/ts_channel_gap_list>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "ts_channel_gap_list",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>Time durations of data gaps. Units='Gap Count'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "java.lang.String",
              sqlType: "VARCHAR(32)",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: false,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "ts_channel_up_time",
      title: "Ts Channel Up Time Metric",
      description:
        "<p>(TS PROTOTYPE) This metric reports time durations of continuous data for the specified channel. The maximum time extent for this metric is a 24 hour period from midnight to midnight. Days that have contiguous data with no time breaks will have separate entries for each day here, but will be joined into a single record in the ts_channel_continuity metric, which can span multiple days.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/ts_channel_up_time>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "ts_channel_up_time",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>Time duration of continuous data. Units='Seconds'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "java.lang.String",
              sqlType: "VARCHAR(32)",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: false,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "ts_gap_length",
      title: "Ts Gap Length Metric",
      description:
        "<p>(TS PROTOTYPE) This metric reports the size of the sum total of data gaps encountered within a 24-hour window.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/ts_gap_length>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "ts_gap_length",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>Total length of all gaps in a day. Units='Seconds'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "java.lang.String",
              sqlType: "VARCHAR(32)",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: false,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "ts_gap_length_total",
      title: "Ts Gap Length Total Metric",
      description:
        "<p>(TS PROTOTYPE) This metric reports the size of the sum total of data gaps encountered within the entire user requested time window.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/ts_gap_length_total>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "ts_gap_length_total",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>Total length of all gaps in the time period. Units='Seconds'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "java.lang.String",
              sqlType: "VARCHAR(32)",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: false,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "ts_max_gap",
      title: "Ts Max Gap Metric",
      description:
        "<p>(TS PROTOTYPE) This metric reports the size of the largest gap encountered within a 24-hour window.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/ts_max_gap>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "ts_max_gap",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>Maximum gap length in a day. Units='Seconds'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "java.lang.String",
              sqlType: "VARCHAR(32)",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: false,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "ts_max_gap_total",
      title: "Ts Max Gap Total Metric",
      description:
        "<p>(TS PROTOTYPE) This metric reports the size of the largest gap encountered within the user-specified time window.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/ts_max_gap_total>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "ts_max_gap_total",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>Maximum gap length in the time period. Units='Seconds'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "java.lang.String",
              sqlType: "VARCHAR(32)",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: false,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "ts_num_gaps",
      title: "Ts Num Gaps Metric",
      description:
        "<p>(TS PROTOTYPE) This metric reports the number of gaps encountered within a 24-hour window.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/ts_num_gaps>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "ts_num_gaps",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Integer",
              sqlType: "INTEGER",
              description: "<p>Number of gaps per day. Units='Gap Counts'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "java.lang.String",
              sqlType: "VARCHAR(32)",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: false,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "ts_num_gaps_total",
      title: "Ts Num Gaps Total Metric",
      description:
        "<p>(TS PROTOTYPE) This metric reports the number of gaps encountered within the user specified time window.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/ts_num_gaps_total>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "ts_num_gaps_total",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Integer",
              sqlType: "INTEGER",
              description:
                "<p>Number of gaps in the time period. Units='Gap Count'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "java.lang.String",
              sqlType: "VARCHAR(32)",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: false,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "ts_percent_availability",
      title: "Ts Percent Availability Metric",
      description:
        "<p>(TS PROTOTYPE) The portion of data available for a 24-hour window is represented as a percentage. 100% data available means full coverage of data for the reported start and end time.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/ts_percent_availability>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "ts_percent_availability",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description: "<p>Data availability per day. Units='Percent'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "java.lang.String",
              sqlType: "VARCHAR(32)",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: false,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
    {
      name: "ts_percent_availability_total",
      title: "Ts Percent Availability Total Metric",
      description:
        "<p>(TS PROTOTYPE) The total portion of data available for the entire requested time period, represented as a percentage. 100% data available means full coverage of data within the user requested time window.<br>Please consult the <a href=http://service.iris.edu/mustang/metrics/docs/1/desc/ts_percent_availability_total>Detailed Documentation</a></p>",
      version: 1,
      tables: [
        {
          name: "ts_percent_availability_total",
          columns: [
            {
              name: "value",
              javaType: "java.lang.Double",
              sqlType: "DOUBLE PRECISION",
              description:
                "<p>Data availability in the time period. Units='Percent'.</p>",
              notNull: true,
            },
            {
              name: "target",
              javaType: "java.lang.String",
              sqlType: "VARCHAR(32)",
              description:
                "<p>The target of measurements for this metric - the thing that is being measured.</p>",
              notNull: false,
            },
            {
              name: "start",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The start time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "end",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The end time of a measurement for this metric.</p>",
              notNull: true,
            },
            {
              name: "lddate",
              javaType: "java.sql.Timestamp",
              sqlType: "TIMESTAMP",
              description:
                "<p>The Time when this measurement was added to the database.</p>",
              notNull: true,
            },
            {
              name: "id",
              javaType: "java.lang.Integer",
              sqlType: "SERIAL",
              description: "<p>Key - Internal use only.</p>",
              notNull: true,
            },
          ],
        },
      ],
    },
  ],
};
