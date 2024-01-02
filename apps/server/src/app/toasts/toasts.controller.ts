import {
  Body,
  Controller,
  Post,
  Param,
  Patch,
  Query,
  Delete,
} from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Toasts } from './entities/toasts.entity';
import { ToastsService } from './toasts.service';
import { CreateToastDTO } from './dto/create-toast.dto';
import { UpdateToastDTO } from './dto/update-toast.dto';

@Controller('toasts')
export class ToastsController {
  constructor(private toastsService: ToastsService) {}

  @Get()
  getToasts(): Promise<Toasts[]> {
    return this.toastsService.getToasts();
  }

  @Get('future_toast')
  getFutureToasts(): Promise<Toasts[]> {
    return this.toastsService.getFutureToasts();
  }

  @Get('user_past_toasts/:userId')
  getUserToasts(@Param('userId') userId: string) {
    return this.toastsService.getPastToastsById(userId);
  }

  @Post()
  addToast(@Body() toastParams: CreateToastDTO) {
    return this.toastsService.createToast(toastParams);
  }

  @Delete('/:id')
  removeToast(@Param('id') id: string, @Query('userId') userId: string) {
    return this.toastsService.removeToast(id, userId);
  }

  @Patch('/:id')
  updateToast(
    @Body() toastParams: UpdateToastDTO,
    @Param('id') toastId: string,
    @Query('userId') userId: string
  ) {
    return this.toastsService.updateToast(toastParams, toastId, userId);
  }

  @Get('count_toasts')
  countToast() {
    return this.toastsService.getToastNumber();
  }

  @Get('leaderboard')
  getLeaderBoard() {
    return this.toastsService.getToastsLeaderBoard();
  }
}
