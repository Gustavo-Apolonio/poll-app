import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  get hasPool(): boolean {
    const poolId: string | null = localStorage.getItem('poolId');
    if (poolId === null) return false;
    else return true;
  }
}
