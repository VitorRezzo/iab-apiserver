import { NextFunction, Request, Response } from "express";
import CompanionsService from "../services/CompanionsService";

class CompanionsController {
  async registerCompanion(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await CompanionsService.registerCompanion(req.body);

      return response?.errors[0]?.message === "cpf must be unique"
        ? res.status(400).json({ response, message: "Acompanhante Já existe!" })
        : res.status(201).json({
            response,
            message: "Acompanhante cadastrado com sucesso!",
          });
    } catch (e) {
      return next(e);
    }
  }

  async associateCompanionPatient(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await CompanionsService.associateCompanionPatient(
        req.body
      );
      return response?.errors[1]?.message === "CompanionId must be unique"
        ? res.status(400).json({
            response,
            message: "Acompanhante Já está Associado ao Paciente!",
          })
        : res.status(201).json({
            response,
            message: "Acompanhante Associado com sucesso!",
          });
    } catch (e) {
      return next(e);
    }
  }

  async getCompanionsById(req: Request, res: Response, next: NextFunction) {
    const id = { id: req.params.id } as any;
    try {
      const response = await CompanionsService.getCompanionsById(id);
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async listByCompanionFilter(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await CompanionsService.listByCompanionFilter(req.body);
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async listAllCompanions(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await CompanionsService.listAllCompanions();
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async searchCompanionByNameOrCPF(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await CompanionsService.searchCompanionByNameOrCPF(
        req.body
      );
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async findCompanionAssocitedPatient(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await CompanionsService.findCompanionAssocitedPatient(
        req.body
      );
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async removeCompanionAssocitedPatient(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await CompanionsService.removeCompanionAssocitedPatient(
        req.body
      );
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async updateCompanion(req: Request, res: Response, next: NextFunction) {
    try {
      await CompanionsService.updateCompanion(req.body);
      return res
        .status(200)
        .json({ message: "Dados do Acompanhante Atualizados!" });
    } catch (e) {
      return next(e);
    }
  }
}

export default new CompanionsController();
