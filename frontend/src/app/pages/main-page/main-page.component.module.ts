import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MainPageComponent } from './main-page.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { ComponentsModule } from 'src/app/shared/components';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:5000' };

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    SocketIoModule.forRoot(config),
    ComponentsModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [MainPageComponent],
})
export class MainPageComponentModule {}
