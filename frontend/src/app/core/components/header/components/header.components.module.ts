import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderVoteComponent } from './header-vote/header-vote.component';
import { VoteValuesPipeModule } from 'src/app/shared/pipes';

@NgModule({
  declarations: [HeaderVoteComponent],
  imports: [CommonModule, VoteValuesPipeModule],
  exports: [HeaderVoteComponent],
})
export class HeaderComponentsModule {}
