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
import { AddCriminalDTO } from './dto/add-criminal.dto';
import { UpdateCriminalDTO } from './dto/update-criminal.dto';

@Controller('criminals')
export class CriminalsController {
  constructor(private criminalsService: CriminalsService) {}

  @Get()
  getCriminals() {
    return this.criminalsService.getCriminals();
  }

  @Post()
  addCriminal(
    @Body() addCriminal: AddCriminalDTO,
    @Query('adminId') adminId: string
  ) {
    return this.criminalsService.addCriminal(addCriminal, adminId);
  }

  @Patch('/:id')
  updateCriminals(
    @Body() updateCriminalType: UpdateCriminalDTO,
    @Query('adminId') adminId: string,
    @Param('id') criminalId: string
  ) {
    return this.criminalsService.updateCriminal(
      updateCriminalType,
      adminId,
      criminalId
    );
  }

  @Delete('/:id')
  deleteCriminal(
    @Query('adminId') adminId: string,
    @Param('id') criminalId: string
  ) {
    return this.criminalsService.deleteCriminal(criminalId, adminId);
  }
}
