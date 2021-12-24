import { HttpClient } from "@angular/common/http";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatFacilityAreaM2",
  pure: true,
})
export class FormatFacilityAreaM2Pipe implements PipeTransform {
  transform(area: string): string {
    return this.formatFacilityAreaM2(area);
  }

  formatFacilityAreaM2(area: string) {
    // 545.05 m2
    let new_area = "";
    let m2sup = "m" + "<sup>2</sup>";
    if (area) {
      if (area.includes("m2")) new_area = area.replace("m2", m2sup);
      return new_area;
    } else return "";
  }
}
