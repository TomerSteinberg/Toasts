import { Injectable } from '@nestjs/common';
import { Toasts } from './entities/toasts.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateToast } from './dto/create-toast.dto';
import { UpdateToast } from './dto/update-toast.dto';
import { UsersService } from '../users/users.service';
import { InvalidUserID } from './exceptions';
import { Op, Sequelize } from 'sequelize';
import { Users } from '../users/entities/users.entity';

@Injectable()
export class ToastsService {
  constructor(
    @InjectModel(Toasts)
    public toastsModel: typeof Toasts,

    private usersService: UsersService
  ) {}

  /**
   * get all toasts from db
   * @param: None
   * @return: All the toasts from the db
   */
  async getToasts(): Promise<Toasts[]> {
    const toasts = await this.toastsModel.findAll();
    return toasts;
  }

  /**
   * get all toasts from db of a specific user
   * @param: user Id
   * @return: All the toasts from the db that belong to given user
   */
  async getToastsById(userId: string) {
    const userToasts = await this.toastsModel.findAll({
      where: { userId: userId },
    });
    return userToasts;
  }

  /**
   * Creates a toast instance in the db
   * @param: toast dto
   * @return: toast instance
   */
  async createToast(toastParams: CreateToast) {
    const doesUserExist = await this.usersService.doesExist(toastParams.userId);
    if (!doesUserExist) {
      throw new InvalidUserID();
    }
    const newToast = await this.toastsModel.create(toastParams);
    return newToast;
  }

  /**
   * Removes toast instance from db
   * @param: toast id
   * @return: number of destroyed rows in db (should be 1)
   */
  async removeToast(toastId: string, userId: string) {
    const doesUserExist = await this.usersService.doesExist(userId);
    if (!doesUserExist) {
      throw new InvalidUserID();
    }
    const destroy = await this.toastsModel.destroy({
      where: { id: toastId, userId: userId },
    });
    return destroy;
  }

  /**
   * Updates a toast instance in db
   * @param: update dto and id of instance
   * @return: object with number of effected rows
   */
  async updateToast(
    toastParams: UpdateToast,
    toastId: string,
    userId?: string
  ) {
    const isAdmin = await this.usersService.isAdmin(userId);
    if (!isAdmin && userId === undefined) {
      throw new InvalidUserID();
    }
    const updatedToast = isAdmin
      ? await this.toastsModel.update(toastParams, { where: { id: toastId } })
      : await this.toastsModel.update(toastParams, {
          where: { id: toastId, userId: userId },
        });
    return updatedToast;
  }

  /**
   * Gets the number of toasts done in this period of time
   * and also the record number of toasts of all periods
   * @param: None
   * @returns: object containing the number of toasts in the current period of time
   * and in the record period of time
   */
  async getToastNumber() {
    const periodList: number[] = [];
    const currDate = new Date();
    const boundaryDate = this.findBoundaryDate();
  }

  /**
   * Finds the beginning of the current period of toasts
   * @param: None
   * @returns: beginning date
   */
  private findBoundaryDate() {
    const currMonth = new Date().getMonth() + 1;
    const currYear = new Date().getFullYear();
    return currMonth >= 6 ? new Date(currYear, 6, 1) : new Date(currYear, 0, 1);
  }

  /**
   * Finds the difference in months between two dates
   * @param: two dates
   * @returns: difference in months (number)
   */
  private monthDifference(d1: Date, d2: Date): number {
    let months: number;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  /**
   * Gets the leaderboard of users who did the most toasts
   * @param: None
   * @returns: List of users and their number of toasts in the last period
   * ordered by the number
   */
  async getToastsLeaderBoard() {
    const today = new Date();
    const leaderboard = this.toastsModel.findAll({
      attributes: [[Sequelize.fn('COUNT', 'userId'), 'Toasts']],
      where: { isConvicting: false, date: { [Op.lte]: today } },
      include: {
        model: Users,
      },
      order: [['Toasts', 'DESC']],
      group: ['user.id'],
    });
    return leaderboard;
  }
}
