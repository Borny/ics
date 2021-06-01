import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  transform(list: any[], condition: any): any[] {
    const filteredList = list?.filter(({ ageGroup }) => ageGroup === condition);
    return filteredList;
  }
}
