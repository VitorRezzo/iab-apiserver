import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const Token = (id: number) => {
  return jwt.sign(
    {
      userId: id,
    },
    process.env.SECRET_TOKEN,
    {
      expiresIn: "24h",
    }
  );
};

export const verifyJWT = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers["x-acess-token"];
  if (!token) {
    res.status(401).json({ auth: false, message: "Usuario não possui token" });
  } else {
    jwt.verify(token, process.env.SECRET_TOKEN, (err: Error, decoded: any) => {
      if (err) {
        res.status(200).json({
          auth: false,
          message: "Sua sessão expirou faça login novamente",
        });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};
