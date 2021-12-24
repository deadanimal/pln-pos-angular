import { Pipe, PipeTransform } from '@angular/core';

import { ArkibKutubkhanah } from './arkib-kutubkhanah';

@Pipe({
    name: 'arkibkutubkhanahfilter',
    pure: false
})
export class ArkibKutubkhanahFilterPipe implements PipeTransform {
  transform(items: ArkibKutubkhanah[], filter: ArkibKutubkhanah): ArkibKutubkhanah[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: ArkibKutubkhanah) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {ArkibKutubkhanah} arkibkutubkhanah The arkibkutubkhanah to compare to the filter.
   * @param {ArkibKutubkhanah} filter The filter to apply.
   * @return {boolean} True if arkibkutubkhanah satisfies filters, false if not.
   */
  applyFilter(arkibkutubkhanah: ArkibKutubkhanah, filter: ArkibKutubkhanah): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (arkibkutubkhanah[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (arkibkutubkhanah[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}