import { Injectable } from '@nestjs/common';
import { Toasts } from './entities/toasts.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateToast } from './dto/create-toast.dto';
import { UpdateToast } from './dto/update-toast.dto';
import { UsersService } from '../users/users.service';
import { InvalidUserID, NoToastsHappened } from './exceptions';
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
    const JULY = 7;
    const JUNE = 6;
    const boundaryMonth = new Date().getMonth() > JUNE ? JUNE : JULY;
    const maxBeforeJune = await this.getMaxOfYearlyPeriod(false, true);
    const maxAfterJune = await this.getMaxOfYearlyPeriod(true, true);
    const currPeriodToasts = await this.getMaxOfYearlyPeriod(
      boundaryMonth == JUNE ? true : false,
      false
    );

    if (maxBeforeJune === undefined || maxAfterJune === undefined) {
      throw new NoToastsHappened();
    }

    return {
      current_period: parseInt(currPeriodToasts.toasts),
      record: Math.max(
        parseInt(maxAfterJune.toasts),
        parseInt(maxBeforeJune.toasts)
      ),
    };
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

  /**
   * Gets the number of toasts done in all the first or second period of all years
   * @param isGreater true if we are calculating the second period of the year
   * @param isRecord true if the number returned should be the record of the period or current month number
   * @returns number of toasts done in given period (max if isRecord is true)
   */
  private async getMaxOfYearlyPeriod(isGreater: boolean, isRecord: boolean) {
    const JULY = 7;
    const JUNE = 6;
    const currDate = new Date();
    const maxOfPeriod = await this.toastsModel
      .findAll({
        attributes: [
          [Sequelize.fn('date_trunc', 'year', Sequelize.col('date')), 'year'],
          [Sequelize.fn('count', 'Toasts.id'), 'toasts'],
        ],
        where: {
          isConvicting: false,
          date: {
            [Op.lte]: currDate,
          },
          [Op.and]: [
            Sequelize.where(
              Sequelize.fn('date_part', 'month', Sequelize.col('date')),
              isGreater ? Op.gt : Op.lt,
              isGreater ? JUNE : JULY
            ),
          ],
        },
        order: [[Sequelize.col(isRecord ? 'toasts' : 'year'), 'DESC']],
        limit: 1,
        group: Sequelize.fn('date_trunc', 'year', Sequelize.col('date')),
      })
      .then((periodMax) => {
        return periodMax[0].dataValues as { year: string; toasts: string };
      });
    return maxOfPeriod;
  }
}
