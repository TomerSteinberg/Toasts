import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateUsernameError extends HttpException {
  constructor(username: string) {
    super('המשתמש ' + username + ' תפוס', HttpStatus.BAD_REQUEST);
  }
}
