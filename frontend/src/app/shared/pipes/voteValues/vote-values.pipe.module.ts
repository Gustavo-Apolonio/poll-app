import { NgModule } from '@angular/core';
import { VoteValuesPipe } from './vote-values.pipe';

@NgModule({
  declarations: [VoteValuesPipe],
  exports: [VoteValuesPipe],
})
export class VoteValuesPipeModule {}
