import { HttpClient } from "@angular/common/http";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "facilityPriceFilter",
  pure: true,
})
export class FacilityPriceFilterPipe implements PipeTransform {
  transform(id: any, obj: any): any {
    return this.facilityPriceFilter(id, obj);
  }

  facilityPriceFilter(id: any, obj: any) {
    let result = obj.filter((obj) => {
      return obj.facility_id == id;
    });
    return result;
  }
}
