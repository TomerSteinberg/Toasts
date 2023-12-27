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
import { z } from 'zod';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private UsersModel: typeof Users
  ) {}

  /**
   * Creates a user in the Database (Only admins can set users as admins)
   * @param: username, password and adminId (if you want to make the new user an admin)
   * @return: if succeeded
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

  /**
   * Finds user and sends it's id and admin flag
   * @param: User credentials (Username and Password)
   * @return: User id and admin flag
   */
  async login(userParams: UserLogin) {
    const user = await this.UsersModel.findOne({
      where: { username: userParams.username, password: userParams.password },
    });
    if (!user) {
      throw new LoginError();
    }
    return user;
  }

  /**
   * Updates a user instance in db
   * @param: update dto and id of instance
   * @return: object with number of effected rows
   */
  async updateUser(userParams: UpdateUser, userId: string) {
    try {
      const affectedUsers = await this.UsersModel.update(userParams, {
        where: { id: userId },
      });
      return affectedUsers;
    } catch (e) {
      throw new DuplicateUsernameError();
    }
  }

  /**
   * Promotes a user to an admin
   * @param userId
   * @param adminId
   * @returns affected user
   */
  async makeAdmin(userId: string, adminId: string) {
    const adminCheck = !(await this.isAdmin(adminId));
    if (adminCheck) {
      throw new AdminIdError();
    }
    const affectedUsers = await this.UsersModel.update(
      { isAdmin: true },
      { where: { id: userId } }
    );
    return affectedUsers;
  }

  /**
   * Checks if the admin id given actually belongs to a real admin user
   * @param: id of the admin (given in string of UUIDV4)
   * @returns: True if the id matches an admin user in the DB
   */
  async isAdmin(adminId?: string) {
    const schema = z.string().uuid();
    if (!adminId) {
      return false;
    }
    try {
      schema.parse(adminId);
    } catch (e) {
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

  /**
   * get all users from db
   * @param: None
   * @return: id, username and admin status of all users
   */
  async getUsers(): Promise<Users[]> {
    const users = this.UsersModel.findAll({
      attributes: { exclude: ['password'] },
    });
    return users;
  }

  /**
   * checks if a user exists
   * @param userId
   * @returns true if the user exists. false otherwise
   */
  async doesExist(userId: string): Promise<boolean> {
    const schema = z.string().uuid();
    if (!userId) {
      return false;
    }
    try {
      schema.parse(userId);
    } catch (e) {
      return false;
    }
    const user = await this.UsersModel.findOne({ where: { id: userId } });
    return user !== null;
  }
}
