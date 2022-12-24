import { v4 as uuid } from 'uuid';

export class GuidService {
  public generate(): string {
    return uuid();
  }
}
