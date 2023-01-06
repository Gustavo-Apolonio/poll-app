import { Injectable } from '@angular/core';
import { UserIdKey } from '../keys';
import { UuidService } from './uuid.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _userId: string;

  constructor(private uuid: UuidService) {}

  get userId(): string {
    return this.generateUserId();
  }

  set userId(id: string) {
    this._userId = id;
    localStorage.setItem(UserIdKey, this._userId);
  }

  private generateUserId(): string {
    const localStorageUser: string | null = localStorage.getItem(UserIdKey);

    if (!localStorageUser || localStorageUser == '') {
      const id: string = this.uuid.generateUuid();
      this.userId = id;
      return id;
    } else {
      this.userId = localStorageUser;
      return this._userId;
    }
  }
}
