import { Pipe, PipeTransform } from '@angular/core';

import { ESumber } from './esumber';

@Pipe({
    name: 'esumberfilter',
    pure: false
})
export class EsumberFilterPipe implements PipeTransform {
  transform(items: ESumber[], filter: ESumber): ESumber[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: ESumber) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {ESumber} esumber The esumber to compare to the filter.
   * @param {ESumber} filter The filter to apply.
   * @return {boolean} True if esumber satisfies filters, false if not.
   */
  applyFilter(esumber: ESumber, filter: ESumber): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (esumber[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (esumber[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}