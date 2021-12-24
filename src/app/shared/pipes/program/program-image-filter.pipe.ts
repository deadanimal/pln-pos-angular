import { HttpClient } from "@angular/common/http";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "programImageFilter",
  pure: true,
})
export class ProgramImageFilterPipe implements PipeTransform {
  transform(id: any, obj: any): any {
    return this.programImageFilter(id, obj);
  }

  programImageFilter(id: any, obj: any) {
    let result = obj.filter((obj) => {
      return obj.program_id == id;
    });
    let array = [];
    for (let i = 0; i < result.length; i++) {
      let image = {
        small: result[i].program_image,
        medium: result[i].program_image,
        big: result[i].program_image,
      };
      array.push(image);
    }
    return array;
  }
}
