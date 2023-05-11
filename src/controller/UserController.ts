import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
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
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async verifyAuthUser(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await UserService.verifyAuthUser(req.body);
      return response.auth
        ? res.status(200).json(response)
        : res.status(401).json(response);
    } catch (e) {
      return next(e);
    }
  }
}

export default new UserController();
