import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(services, value: string) {
    if (value.length >= 2) {
      const input = value.toUpperCase();
      return services.filter(service => {
        return service.title.toUpperCase().indexOf(input) > -1;
      });
    }
  }
}

