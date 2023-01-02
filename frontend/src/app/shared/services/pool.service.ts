import { environment } from './../../../environments/environment';

import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import PoolId from '../models/PoolIdModel';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PoolService {
  private baseUrl: string = environment.services.pool.baseUrl;

  constructor(private http: HttpClient) {}

  listPoolIds(): Observable<PoolId[]> {
    return this.http.get<PoolId[]>(this.baseUrl);
  }
}
