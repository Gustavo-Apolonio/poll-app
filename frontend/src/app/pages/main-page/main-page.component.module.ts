import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageComponent } from './main-page.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { ComponentsModule } from 'src/app/shared/components';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { CoreComponentsModule } from 'src/app/core/components';

const config: SocketIoConfig = { url: 'http://localhost:5000' };

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    SocketIoModule.forRoot(config),
    ComponentsModule,
    CoreComponentsModule,
  ],
  providers: [],
  bootstrap: [MainPageComponent],
})
export class MainPageComponentModule {}
