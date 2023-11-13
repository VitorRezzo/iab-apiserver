import { NextFunction, Request, Response } from "express";
import UserService from "../services/UsersService";

class UsersController {
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await UserService.registerUser(req.body);
      return res.status(201).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await UserService.loginUser(req.body);
      return response.auth
        ? res.status(200).json(response)
        : res
            .status(401)
            .json({ response, message: "Usuário ou senha estão incorretos!" });
    } catch (e) {
      return next(e);
    }
  }

  async checkAuthUser(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await UserService.checkAuthUser(req.body);
      return res.status(200).json(response);
    } catch (e) {
      return next(e);
    }
  }
}
export default new UsersController();
