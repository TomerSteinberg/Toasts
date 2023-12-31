import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Criminals } from './entities/criminals.entity';
import { AddCriminalDTO } from './dto/add-criminal.dto';
import { UsersService } from '../users/users.service';
import { AdminIdError } from '../users/exceptions';
import { UpdateCriminalDTO } from './dto';
import { Users } from '../users/entities/users.entity';
import { InvalidCriminalId } from './exceptions/invalid-criminal-id.error';
import { Toasts } from '../toasts/entities/toasts.entity';

@Injectable()
export class CriminalsService {
  constructor(
    @InjectModel(Criminals)
    private criminalsModel: typeof Criminals,

    @InjectModel(Toasts)
    private toastsModel: typeof Toasts,

    private usersService: UsersService
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
          attributes: { exclude: ['password'] },
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
  async addCriminal(addCriminal: AddCriminalDTO, adminId: string) {
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
    newCriminalType: UpdateCriminalDTO,
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
      const criminal = await this.criminalsModel.findByPk(criminalId);
      if (!criminal) {
        throw new InvalidCriminalId();
      }

      this.toastsModel.destroy({
        where: { isConvicting: true, userId: criminal.userId },
      });

      const destroy = await this.criminalsModel.destroy({
        where: { id: criminalId },
      });
      return destroy;
    }
    throw new AdminIdError();
  }
}
