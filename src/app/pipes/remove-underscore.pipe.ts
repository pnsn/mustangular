import { Pipe, PipeTransform } from "@angular/core";

/** Removes underscores from strings */
@Pipe({
  name: "removeUnderscore",
})
export class RemoveUnderscorePipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/_/g, " ");
  }
}
