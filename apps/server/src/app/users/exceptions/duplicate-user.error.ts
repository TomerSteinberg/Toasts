import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateUsernameError extends HttpException {
  constructor() {
    super('Username Taken.', HttpStatus.BAD_REQUEST);
  }
}
