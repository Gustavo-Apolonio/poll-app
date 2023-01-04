import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isSelectedOption',
})
export class IsSelectedOptionPipe implements PipeTransform {
  transform(
    isSelected: boolean,
    backgroundColor: string,
    boxShadow: string
  ): string {
    return isSelected ? `${boxShadow}${backgroundColor}44` : `${boxShadow}`;
  }
}
