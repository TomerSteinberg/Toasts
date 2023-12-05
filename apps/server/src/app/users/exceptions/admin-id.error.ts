import { HttpException, HttpStatus } from '@nestjs/common';

export class AdminIdError extends HttpException {
  constructor() {
    super('Invalid Admin ID', HttpStatus.BAD_REQUEST);
  }
}
