import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCriminalId extends HttpException {
  constructor() {
    super('Invalid Criminal ID', HttpStatus.BAD_REQUEST);
  }
}
