import { v4 as uuid } from 'uuid';

export class GuidService {
  static generate(): string {
    return uuid();
  }
}
