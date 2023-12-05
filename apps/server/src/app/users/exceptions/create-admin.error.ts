import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateAdminError extends HttpException {
  constructor() {
    super(
      'You need a valid Admin ID to create an admin',
      HttpStatus.BAD_REQUEST
    );
  }
}
