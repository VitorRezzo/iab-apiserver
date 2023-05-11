import { NextFunction, Request, Response } from "express";
import MovementService from "../services/MovementService";

class MovementController {
  async registerMovements(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await MovementService.registerMovements(req.body);
      return res.status(201).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async listAllMovementsPatients(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await MovementService.listAllMovementsPatients(req.body);
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async listAllMovements(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await MovementService.listAllMovements(req.body);
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async listMovementsBetewenDate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await MovementService.listMovementsBetewenDate(req.body);
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async getMovementsById(req: Request, res: Response, next: NextFunction) {
    const id = { id: req.params.id } as any;
    try {
      const response = await MovementService.getMovementsById(id);
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async updateMovement(req: Request, res: Response, next: NextFunction) {
    try {
      await MovementService.updateMovement(req.body);
      return res.status(200).json({ message: "Movimento Atualizado!" });
    } catch (e) {
      return next(e);
    }
  }

  async deleteMovement(req: Request, res: Response, next: NextFunction) {
    try {
      await MovementService.deleteMovement(req.params.id);
      return res.status(200).json({ message: "Movimento Excluido!" });
    } catch (e) {
      return next(e);
    }
  }
}

export default new MovementController();
