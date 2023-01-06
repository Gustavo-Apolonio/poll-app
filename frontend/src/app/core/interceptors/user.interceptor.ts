import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { UserService } from 'src/app/shared/services';

@Injectable()
export class UserInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const UserId = this.userService.userId;

    return next.handle(httpRequest.clone({ setHeaders: { UserId } }));
  }
}
