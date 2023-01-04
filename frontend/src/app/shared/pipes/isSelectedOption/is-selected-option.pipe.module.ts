import { NgModule } from '@angular/core';
import { IsSelectedOptionPipe } from './is-selected-option.pipe';

@NgModule({
  declarations: [IsSelectedOptionPipe],
  exports: [IsSelectedOptionPipe],
})
export class IsSelectedOptionPipeModule {}
