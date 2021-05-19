// Describes a Station object
// {
//   net: string,
//   sta: string,
//   lat: number,
//   lon: number,
//   name: string,
//   loc: string,
//   code: string, //NET.STA.LOC
//   channels: any
// }

import { Channel } from "./channel";

export class Station {

    constructor (
      public net: string,
      public sta: string,
      public code: string,
      public qual: string
    ) {
      this.displayValue = null;
      this.displayChannel = null;
    }
    lat: number;
    lon: number;
    name: string;
    channels: any = {};
    displayValue: number; // Value displayed for the station
    displayChannel: string; // Channel being used to display

    // Sorts channels to group up by loc and channel type
    private sortChannels(): any {
      this.channels = Object.keys(this.channels)
        .sort(function(a: any, b: any) {
          const A = a.split('.');
          const B = b.split('.');

          if (A[0] === '--') {
            A[0] = -1;
          }

          if (B[0] === '--') {
            B[0] = -1;
          }

          if (parseInt(A[0], 10) < parseInt(B[0], 10)) {
            return -1;
          } else if (parseInt(A[0], 10) > parseInt(B[0], 10)) {
            return 1;
          } else {
            if (A[1] < B[1]) {
              return -1;
            } else if (A[1] > B[1]) {
              return 1;
            } else {
              return 0;
            }
          }
        })
       .reduce((_sortedObj, key) => ({
         ..._sortedObj,
         [key]: this.channels[key]
       }), {});
     }

    private getValueFromDisplayChannel(displayValue: string, displayChannels: string[]) {
      this.displayChannel = null;
      for (const displayChannel of displayChannels ) {
        if ( !this.displayChannel) {
          for (const c in this.channels) {
            const channel = this.channels[c];
            if (channel.name === displayChannel) {
              this.displayChannel = channel.name;

              this.displayValue = this.getValueFromChannel(displayValue, channel)
            }
          }
        }

      }
    }

    private getValueFromChannel(displayValue: string, channel: Channel) : number{
      let value;
      switch (displayValue) {
        case 'Minimum' : {
          value = channel.getMin();
          break;
        }
        case 'Maximum' : {
          value = channel.getMax();
          break;
        }
        case 'Average' : {
          value = channel.getAverage();
          break;
        }
        case 'Median' : {
          value = channel.getMedian();
          break;
        }
        case '5th_Percentile' : {
          value = channel.getPercentile(5);
          break;
        }
        case '95th_Percentile' : {
          value = channel.getPercentile(95);
          break;
        }
        default : {
          value = null;
          break;
        }
      }

      return value;
    }
    //FIXME: need to get display value first to figure out which channel values to look at
    private getValueFromAggregate(displayValue: string, aggregateValue: string) {
      let channelValues = [];
      for (const c in this.channels) {
        const channel = this.channels[c];
        channelValues.push(this.getValueFromChannel(displayValue, channel));
      }

      switch (aggregateValue) {
        case 'Minimum' : {
          this.displayValue = Math.min(...channelValues);
          break;
        }
        case 'Maximum' : {
          this.displayValue = Math.max(...channelValues);
          break;
        }
        case 'Most_Extreme' : {
          const min = Math.min(...channelValues);
          const max = Math.max(...channelValues);

          this.displayValue = Math.abs(min) > Math.abs(max) ? min : max;
          break;
        }
        default : {
          this.displayValue = null;
          break;
        }
      }
    }

    // Sets the station value according to the display value and selected channels
    setValue(displayValue: string, aggregateValue: string, displayChannels: string[]): void {
      console.log(displayValue, aggregateValue, displayChannels)
      this.sortChannels();

      if( aggregateValue !== "" || null ) {
        this.getValueFromAggregate(displayValue, aggregateValue)
      } else {
        this.getValueFromDisplayChannel(displayValue, displayChannels);
      }
    }
}
