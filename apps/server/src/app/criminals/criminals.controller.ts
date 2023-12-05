import {
  Body,
  Controller,
  Post,
  Param,
  Patch,
  Query,
  Get,
  Delete,
} from '@nestjs/common';
import { CriminalsService } from './criminals.service';
import { AddCriminal } from './dto/add-criminal.dto';
import { UpdateCriminal } from './dto/update-criminal.dto';

@Controller()
export class CriminalsController {
  constructor(private criminalsService: CriminalsService) {}

  @Get('criminals')
  getCriminals() {
    return this.criminalsService.getCriminals();
  }

  @Post('criminals')
  addCriminal(
    @Body() addCriminal: AddCriminal,
    @Query('adminId') adminId: string
  ) {
    return this.criminalsService.addCriminal(addCriminal, adminId);
  }

  @Patch('criminals/:id')
  updateCriminals(
    @Body() updateCriminalType: UpdateCriminal,
    @Query('adminId') adminId: string,
    @Param('id') criminalId: string
  ) {
    return this.criminalsService.updateCriminal(
      updateCriminalType,
      adminId,
      criminalId
    );
  }

  @Delete('criminals/:id')
  deleteCriminal(
    @Query('adminId') adminId: string,
    @Param('id') criminalId: string
  ) {
    return this.criminalsService.deleteCriminal(criminalId, adminId);
  }
}
