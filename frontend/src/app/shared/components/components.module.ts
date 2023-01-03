import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardsModule } from './cards/cards.component.module';
import { GlassmorphComponent } from './glassmorph/glassmorph.component';

@NgModule({
  declarations: [GlassmorphComponent],
  imports: [CommonModule, CardsModule],
  exports: [GlassmorphComponent, CardsModule],
})
export class ComponentsModule {}
