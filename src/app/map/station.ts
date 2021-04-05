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
       console.log(this.channels)
     }


    // Sets the station value according to the display value and selected channels
    setValue(displayValue: string, displayChannels: string[]): void {
      this.sortChannels();
      this.displayChannel = null;
      for (const displayChannel of displayChannels ) {
        if ( !this.displayChannel) {
          for (const c in this.channels) {
            const channel = this.channels[c];
            if (channel.name === displayChannel) {
              this.displayChannel = channel.name;

              switch (displayValue) {
                case 'Minimum' : {
                  this.displayValue = channel.getMin();
                  break;
                }
                case 'Maximum' : {
                  this.displayValue = channel.getMax();
                  break;
                }
                case 'Average' : {
                  this.displayValue = channel.getAverage();
                  break;
                }
                case 'Median' : {
                  this.displayValue = channel.getMedian();
                  break;
                }
                case '5th_Percentile' : {
                  this.displayValue = channel.getPercentile(5);
                  break;
                }
                case '95th_Percentile' : {
                  this.displayValue = channel.getPercentile(95);
                  break;
                }
                default : {
                  this.displayValue = null;
                  break;
                }
              }
            }
          }
        }

      }
    }
}
