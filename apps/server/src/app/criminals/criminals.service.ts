import { Injectable } from '@nestjs/common';
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

    private usersService: UsersService,

    private toastsService: ToastsService
  ) {}

  /**
   * gets all criminals from db
   * @param: None
   * @returns: all criminals
   */
  async getCriminals() {
    const criminals = await this.criminalsModel.findAll({
      include: [
        {
          model: Users,
        },
      ],
    });
    return criminals;
  }

  /**
   * adds criminal to db (requires valid admin id)
   * @param addCriminal
   * @param adminId
   * @returns code of success
   */
  async addCriminal(addCriminal: AddCriminal, adminId: string) {
    if (await this.usersService.isAdmin(adminId)) {
      const newCriminal = await this.criminalsModel.create(addCriminal);
      return newCriminal;
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
      const affectedCriminals = await this.criminalsModel.update(
        newCriminalType,
        {
          where: { id: criminalId },
        }
      );
      return affectedCriminals;
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

      const destroy = await this.criminalsModel.destroy({
        where: { id: criminalId },
      });
      return destroy;
    }
    throw new AdminIdError();
  }
}
