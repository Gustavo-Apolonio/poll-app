import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlassmorphComponent } from './glassmorph/glassmorph.component';
import { CardComponent } from './card/card.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [GlassmorphComponent, CardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
  providers: [],
  bootstrap: [],
  exports: [GlassmorphComponent, CardComponent],
})
export class ComponentsModule {}
