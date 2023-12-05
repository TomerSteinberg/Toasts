import { HttpException, HttpStatus } from '@nestjs/common';

export class LoginError extends HttpException {
  constructor() {
    super('Invalid Username or Password.', HttpStatus.BAD_REQUEST);
  }
}
