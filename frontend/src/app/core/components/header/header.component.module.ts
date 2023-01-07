import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';

import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponentsModule } from './components';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    HeaderComponentsModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderComponentModule {}
