import { HttpClient } from "@angular/common/http";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatFPXTransactionDateTime",
  pure: true,
})
export class FormatFPXTransactionDateTimePipe implements PipeTransform {
  transform(datetime: string): string {
    return this.formatFPXTransactionDateTime(datetime);
  }

  formatFPXTransactionDateTime(datetime: string) {
    // fpx_fpxTxnTime: YYYYMMDDHH24MISS
    if (datetime) {
      var year = datetime.substring(0, 4);
      var month = datetime.substring(4, 6);
      var day = datetime.substring(6, 8);

      return day + "." + month + "." + year;
    } else return "";
  }
}
