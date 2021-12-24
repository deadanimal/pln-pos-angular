import { Pipe, PipeTransform } from '@angular/core';

import { Program } from './program';

@Pipe({
    name: 'programfilter',
    pure: false
})
export class ProgramFilterPipe implements PipeTransform {
  transform(items: Program[], filter: Program): Program[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Program) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {Program} program The program to compare to the filter.
   * @param {Program} filter The filter to apply.
   * @return {boolean} True if program satisfies filters, false if not.
   */
  applyFilter(program: Program, filter: Program): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (program[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (program[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}