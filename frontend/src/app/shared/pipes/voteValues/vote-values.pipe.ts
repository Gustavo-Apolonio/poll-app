import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'voteValues',
})
export class VoteValuesPipe implements PipeTransform {
  transform(votes: number): string {
    return votes < 9 ? `0${votes}` : `${votes}`;
  }
}
