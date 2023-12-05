import { Inject, Injectable } from '@nestjs/common';
import { Toasts } from './entities/toasts.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateToast } from './dto/create-toast.dto';
import { UpdateToast } from './dto/update-toast.dto';
import { UsersService } from '../users/users.service';
import { InvalidUserID, NoToastsHappened } from './exceptions';
import { CriminalsService } from '../criminals/criminals.service';

@Injectable()
export class ToastsService {
  constructor(
    @InjectModel(Toasts)
    private toastsModel: typeof Toasts,

    @Inject(UsersService)
    private usersService: UsersService,

    @Inject(CriminalsService)
    private criminalsService: CriminalsService
  ) {}

  /**
   * get all toasts from db
   * @param: None
   * @return: All the toasts from the db
   */
  async getToasts(): Promise<Toasts[]> {
    return await this.toastsModel.findAll();
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
    return this.toastsModel.create(toastParams);
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
    return await this.toastsModel.destroy({
      where: { id: toastId, userId: userId },
    });
  }

  /**
   * Updates a toast instance in db
   * @param: update dto and id of instance
   * @return: object with number of effected rows
   */
  async updateToast(toastParams: UpdateToast, toastId: string, userId: string) {
    const isAdmin = await this.usersService.isAdmin(userId);
    return isAdmin
      ? await this.toastsModel.update(toastParams, { where: { id: toastId } })
      : await this.toastsModel.update(toastParams, {
          where: { id: toastId, userId: userId },
        });
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
    let toasts = await this.getToasts();

    // Removing Criminal toasts and toasts that are in the future
    toasts = toasts.filter((toast) => {
      return !toast.isConvicting && toast.date <= currDate;
    });

    toasts.forEach((toast) => {
      const difference = this.monthDifference(toast.date, boundaryDate);
      for (let i: number = 0; i < Math.floor(difference / 6) + 1; i++) {
        if (i + 1 >= periodList.length) {
          periodList.push(0);
        }
      }
    });
    toasts.forEach((toast) => {
      const difference = this.monthDifference(toast.date, boundaryDate);
      if (toast.date.getTime() > boundaryDate.getTime()) {
        periodList[0] += 1;
      } else if (
        toast.date.getTime() < boundaryDate.getTime() &&
        difference < 6
      ) {
        periodList[1] += 1;
      } else {
        periodList[Math.floor(difference / 6) + 1] += 1;
      }
    });
    if (periodList.length == 0) {
      throw new NoToastsHappened();
    }
    const currentNumber: number = periodList[0];
    periodList.shift();
    return { current: currentNumber, record: Math.max(...periodList) };
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
   * Finds the difference in months between 2 dates
   * @param: 2 dates
   * @returns: difference in months (number)
   */
  private monthDifference(d1: Date, d2: Date): number {
    let months: number;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  async getToastsLeaderBoard() {
    return this.toastsModel.findAll();
  }
}
