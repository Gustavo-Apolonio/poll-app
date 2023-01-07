import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponentModule } from './header/header.component.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, HeaderComponentModule],
  exports: [HeaderComponentModule],
})
export class CoreComponentsModule {}
