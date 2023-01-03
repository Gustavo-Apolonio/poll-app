import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardsComponent } from './cards.component';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { PollCardComponent } from './components/poll-card/poll-card.component';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [CardsComponent, LoginCardComponent, PollCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [CardsComponent, LoginCardComponent, PollCardComponent],
  exports: [CardsComponent],
})
export class CardsModule {}
