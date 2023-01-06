import { IError } from '../models';

import { ErrorStatus } from '../enums';

export class ErrorService {
  static BadRequest(message: string): IError {
    return {
      code: ErrorStatus.BadRequest,
      message,
    };
  }

  static NotFound(message: string): IError {
    return {
      code: ErrorStatus.NotFound,
      message,
    };
  }
}
