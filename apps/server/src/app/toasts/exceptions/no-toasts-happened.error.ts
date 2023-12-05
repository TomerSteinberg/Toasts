import { HttpException, HttpStatus } from '@nestjs/common';

export class NoToastsHappened extends HttpException {
  constructor() {
    super('No toasts happened yet', HttpStatus.BAD_REQUEST);
  }
}
