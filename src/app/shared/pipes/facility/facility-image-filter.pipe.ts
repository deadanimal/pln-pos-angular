import { HttpClient } from "@angular/common/http";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "facilityImageFilter",
  pure: true,
})
export class FacilityImageFilterPipe implements PipeTransform {
  transform(id: any, obj: any): any {
    return this.facilityImageFilter(id, obj);
  }

  facilityImageFilter(id: any, obj: any) {
    let result = obj.filter((obj) => {
      return obj.facility_id == id;
    });
    let array = [];
    for (let i = 0; i < result.length; i++) {
      let image = {
        small: result[i].facility_image,
        medium: result[i].facility_image,
        big: result[i].facility_image,
      };
      array.push(image);
    }
    return array;
  }
}
