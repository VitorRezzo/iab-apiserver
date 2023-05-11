import { UserModel } from "../models/UserModel";
import { Token } from "../features/JwToken";

interface IUser {
  userid: number;
  fullname: string;
  username: string;
  password: string;
  auth?: string;
}

class UserService {
  async registerUser(user: IUser) {
    const users = await UserModel.create({
      fullname: user.fullname,
      username: user.username,
      password: user.password,
    });

    return users;
  }

  async loginUser(user: IUser) {
    const users = await UserModel.findOne({
      where: {
        username: user.username,
        password: user.password,
      },
    });
    if (users) {
      return {
        auth: true,
        token: Token(users.id),
        username: user.username,
      };
    } else {
      return { auth: false, token: undefined };
    }
  }

  async verifyAuthUser(user: IUser) {
    const users = await UserModel.findOne({
      where: {
        username: user.username,
      },
    });
    if (users) {
      return {
        auth: true,
      };
    } else {
      return { auth: false };
    }
  }
}

export default new UserService();
