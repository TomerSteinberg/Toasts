import { Body, Controller, Post, Param, Patch, Query } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Toasts } from './entities/toasts.entity';
import { ToastsService } from './toasts.service';
import { CreateToast } from './dto/create-toast.dto';
import { UpdateToast } from './dto/update-toast.dto';

@Controller()
export class ToastsController {
  constructor(private toastsService: ToastsService) {}

  @Get('toast')
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

  @Post('toast')
  addToast(@Body() toastParams: CreateToast) {
    return this.toastsService.createToast(toastParams);
  }

  @Get('remove_toast/:id')
  removeToast(@Param('id') id: string, @Query('userId') userId: string) {
    return this.toastsService.removeToast(id, userId);
  }

  @Patch('toast/:id')
  updateToast(
    @Body() toastParams: UpdateToast,
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
