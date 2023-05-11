import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
class AvatarController {
  async uploadAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(201).json("image" + "-" + req.params.cpf + ".png");
    } catch (e) {
      return next(e);
    }
  }

  async removeAvatarByName(req: Request, res: Response, next: NextFunction) {
    const fileName = req.params.name;
    const directoryPath = path.join(__dirname, "../upload/");
    try {
      fs.unlinkSync(directoryPath + fileName);
      res.status(200);
    } catch (err) {
      res.status(500).send({
        message: "Não foi possivel remover imagem. " + err,
      });
    }
  }
}

export default new AvatarController();
