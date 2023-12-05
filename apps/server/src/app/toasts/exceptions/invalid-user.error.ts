import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidUserID extends HttpException {
  constructor() {
    super('Invalid User ID', HttpStatus.BAD_REQUEST);
  }
}
