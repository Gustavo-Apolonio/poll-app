import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LoginPageComponent } from './login-page.component';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { ComponentsModule } from 'src/app/shared/components';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    LoginPageRoutingModule,
    ComponentsModule,
  ],
  providers: [],
  bootstrap: [LoginPageComponent],
})
export class LoginPageComponentModule {}
