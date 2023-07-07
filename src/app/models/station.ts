import { AggregateValue, ColocatedType, DisplayValue } from "app/types";
import { Channel } from "./channel";
import { Observable, combineLatest } from "rxjs";
import { map, tap } from "rxjs/operators";

// Describes a Station object
export class Station {
  constructor(
    public net: string,
    public sta: string,
    public code: string,
    public qual: string
  ) {
    this.displayValue = null;
    this.displayChannel = null;
    this.channels = new Map<string, Channel>();
  }
  lat: number;
  lon: number;
  name: string;
  displayValue: number; // Value displayed for the station
  displayChannel: string; // Channel being used to display

  channels: Map<string, Channel>; //map of nslc to channel

  getChannel(code: string) {
    return this.channels.get(code);
  }

  // adds or creates channel and returns channel
  getOrCreateChannel(code: string, loc: string, chan: string): Channel {
    if (!this.channels.has(code)) {
      this.channels.set(code, new Channel(code, loc, chan));
    }

    return this.channels.get(code);
  }

  value$(
    colocatedType: ColocatedType,
    displayValue: DisplayValue,
    aggregateValue: AggregateValue,
    displayChannels: string[],
    absValue = false
  ): Observable<number> {
    this.displayChannel = null;

    // find first display channel the station has and set to display
    displayChannels.some((channel) => {
      if (this.channels.has(channel)) {
        this.displayChannel = channel;
        return true;
      }
      return false;
    });

    const channels = [...this.channels.values()].map((channel) =>
      channel.value$(displayValue, absValue)
    );
    return combineLatest(channels).pipe(
      map((values: number[]): number => {
        if (colocatedType && colocatedType === "aggregate") {
          switch (aggregateValue) {
            case "Minimum": {
              return Math.min(...values);
            }
            case "Maximum": {
              return Math.max(...values);
            }
            case "Most_Extreme": {
              const min = Math.min(...values);
              const max = Math.max(...values);

              return Math.abs(min) > Math.abs(max) ? min : max;
            }
            default: {
              return null;
            }
          }
        } else {
          return this.channels.get(this.displayChannel).value;
        }
      }),
      tap((value: number) => {
        this.displayValue = value;
      })
    );
  }
}
