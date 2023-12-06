import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Criminals } from './entities/criminals.entity';
import { AddCriminal } from './dto/add-criminal.dto';
import { UsersService } from '../users/users.service';
import { AdminIdError } from '../users/exceptions';
import { UpdateCriminal } from './dto';
import { Users } from '../users/entities/users.entity';
import { ToastsService } from '../toasts/toasts.service';
import { InvalidCriminalId } from './exceptions/invalid-criminal-id.error';

@Injectable()
export class CriminalsService {
  constructor(
    @InjectModel(Criminals)
    private criminalsModel: typeof Criminals,

    @Inject(UsersService)
    private usersService: UsersService,

    @Inject(ToastsService)
    private toastsService: ToastsService
  ) {}

  /**
   * gets all criminals from db
   * @param: None
   * @returns: all criminals
   */
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

  /**
   * adds criminal to db (requires valid admin id)
   * @param addCriminal
   * @param adminId
   * @returns code of success
   */
  async addCriminal(addCriminal: AddCriminal, adminId: string) {
    if (await this.usersService.isAdmin(adminId)) {
      return await this.criminalsModel.create(addCriminal);
    }
    throw new AdminIdError();
  }

  /**
   * updates criminal in db (requires valid adminId)
   * @param newCriminalType
   * @param adminId
   * @param criminalId
   * @returns if succeeded
   */
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

  /**
   * Deletes criminal from db with all of his convicting toasts
   * @param criminalId
   * @param adminId
   * @returns number of rows destroyed
   */
  async deleteCriminal(criminalId: string, adminId: string) {
    if (await this.usersService.isAdmin(adminId)) {
      const criminal = await this.criminalsModel.findOne({
        where: { id: criminalId },
      });
      if (criminal == null) {
        throw new InvalidCriminalId();
      }
      this.toastsService.toastsModel.destroy({
        where: { isConvicting: true, userId: criminal?.userId },
      });
      return await this.criminalsModel.destroy({ where: { id: criminalId } });
    }
    throw new AdminIdError();
  }
}
