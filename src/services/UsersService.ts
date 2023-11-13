import UsersModel from "../models/UsersModel";
import { Token } from "../util/JwToken";

interface IUser {
  id?: number;
  fullname: string;
  username: string;
  password: string;
  auth?: string;
}

class UsersService {
  async registerUser(user: IUser) {
    const users = await UsersModel.create({
      fullname: user.fullname,
      username: user.username,
      password: user.password,
    });

    return users;
  }

  async loginUser(user: IUser) {
    try {
      const users = await UsersModel.findOne({
        where: {
          username: user.username,
          password: user.password,
        },
      }).then((result) => {
        return { id: result.dataValues.id };
      });

      if (users) {
        return {
          token: Token(users.id),
          userid: users.id,
          username: user.username,
          auth: true,
        };
      } else {
        return { token: null, auth: false };
      }
    } catch (err) {
      return err;
    }
  }

  async checkAuthUser(user: IUser) {
    try {
      const users = await UsersModel.findOne({
        where: {
          id: user.id,
        },
      }).then((result) => {
        return { username: result.dataValues.username };
      });

      if (users) {
        return {
          username: users.username,
        };
      }
    } catch (err) {
      return err;
    }
  }
}

export default new UsersService();
