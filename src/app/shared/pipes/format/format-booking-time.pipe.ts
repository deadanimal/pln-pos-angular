import { HttpClient } from "@angular/common/http";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatBookingTime",
  pure: true,
})
export class FormatBookingTimePipe implements PipeTransform {
  transform(time: string): string {
    return this.formatBookingTime(time);
  }

  formatBookingTime(time: string) {
    // HH:mm:ss -> HH:mm
    if (time) {
      var hour = time.substring(0, 2);
      var minute = time.substring(3, 5);
      var second = time.substring(6, 9);

      return hour + ":" + minute;
    } else return "";
  }
}
