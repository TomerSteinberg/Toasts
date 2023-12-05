import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Criminals } from './entities/criminals.entity';
import { AddCriminal } from './dto/add-criminal.dto';
import { UsersService } from '../users/users.service';
import { AdminIdError } from '../users/exceptions';
import { UpdateCriminal } from './dto';
import { Users } from '../users/entities/users.entity';

@Injectable()
export class CriminalsService {
  constructor(
    @InjectModel(Criminals)
    private criminalsModel: typeof Criminals,

    @Inject(UsersService)
    private usersService: UsersService
  ) {}

  async getCriminals() {
    return await this.criminalsModel.findAll({
      include: [
        {
          model: Users,
          attributes: ['id', 'username'],
        },
      ],
    });
  }

  async addCriminal(addCriminal: AddCriminal, adminId: string) {
    if (await this.usersService.isAdmin(adminId)) {
      return await this.criminalsModel.create(addCriminal);
    }
    throw new AdminIdError();
  }

  async updateCriminal(
    newCriminalType: UpdateCriminal,
    adminId: string,
    criminalId: string
  ) {
    if (await this.usersService.isAdmin(adminId)) {
      return await this.criminalsModel.update(newCriminalType, {
        where: { id: criminalId },
      });
    }
    throw new AdminIdError();
  }

  async deleteCriminal(criminalId: string, adminId: string) {
    if (await this.usersService.isAdmin(adminId)) {
      return await this.criminalsModel.destroy({ where: { id: criminalId } });
    }
    throw new AdminIdError();
  }
}
