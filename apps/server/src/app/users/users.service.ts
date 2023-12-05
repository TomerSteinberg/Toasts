import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './entities/users.entity';
import { CreateUser, UpdateUser, UserLogin } from './dto';
import {
  LoginError,
  CreateAdminError,
  DuplicateUsernameError,
  AdminIdError,
} from './exceptions';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private UsersModel: typeof Users
  ) {}

  /*
   * Creates a user in the Database (Only admins can set users as admins)
   * @Param: username, password and adminId (if you want to make the new user an admin)
   * @Return:
   */
  async signup(userParams: CreateUser, adminId?: string) {
    if (userParams.isAdmin) {
      const adminCheck = !(await this.isAdmin(adminId));
      if (adminCheck) {
        throw new CreateAdminError();
      }
    }
    try {
      const user = await this.UsersModel.create(userParams);
      return { id: user['id'], isAdmin: user['isAdmin'] };
    } catch (e) {
      throw new DuplicateUsernameError();
    }
  }

  /*
   * Finds user and sends it's id and admin flag
   * @Param: User credentials (Username and Password)
   * @Return: User id and admin flag
   */
  async login(userParams: UserLogin) {
    const user = await this.UsersModel.findOne({
      attributes: ['isAdmin', 'id'],
      where: { username: userParams.username, password: userParams.password },
    });
    if (!user) {
      throw new LoginError();
    }
    return user;
  }

  /*
   * Updates a user instance in db
   * @Param: update dto and id of instance
   * @Return: object with number of effected rows
   */
  async updateUser(userParams: UpdateUser, userId: string) {
    return await this.UsersModel.update(userParams, { where: { id: userId } });
  }

  async makeAdmin(userId: string, adminId: string) {
    const adminCheck = !(await this.isAdmin(adminId));
    if (adminCheck) {
      throw new AdminIdError();
    }
    return await this.UsersModel.update(
      { isAdmin: true },
      { where: { id: userId } }
    );
  }

  /*
   * Checks if the admin id given actually belongs to a real admin user
   * @Param: id of the admin (given in string of UUIDV4)
   * @Returns: True if the id matches an admin user in the DB
   */
  async isAdmin(adminId?: string) {
    if (
      !adminId ||
      !adminId.match(
        /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
      )
    ) {
      return false;
    }
    const admin = await this.UsersModel.findOne({
      where: { id: adminId, isAdmin: true },
    });
    if (!admin) {
      return false;
    }
    return true;
  }

  /*
   * get all users from db
   * @Param: None
   * @Return: id, username and admin status of all users
   */
  async getUsers(): Promise<Users[]> {
    return this.UsersModel.findAll({
      attributes: ['id', 'username', 'isAdmin'],
    });
  }

  async doesExist(userId: string): Promise<boolean> {
    if (
      userId === undefined ||
      !userId.match(
        /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
      )
    ) {
      return false;
    }
    const user = await this.UsersModel.findOne({ where: { id: userId } });
    return user !== null;
  }
}
