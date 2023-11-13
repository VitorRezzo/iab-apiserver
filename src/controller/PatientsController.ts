import { NextFunction, Request, Response } from "express";
import PatientsService from "../services/PatientsService";

class PatientsController {
  async registerPatients(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await PatientsService.registerPatients(req.body);
      return res
        .status(201)
        .json({ response, message: "Paciente cadastrado com sucesso!" });
    } catch (e) {
      return next(e);
    }
  }

  async getPatientsById(req: Request, res: Response, next: NextFunction) {
    const id = { id: req.params.id } as any;

    try {
      const response = await PatientsService.getPatientsById(id);
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async searchPatientByNameOrCPF(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await PatientsService.searchPatientByNameOrCPF(req.body);
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async listByPatientFilter(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await PatientsService.listByPatientFilter(req.body);
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async listAllPatients(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await PatientsService.listAllPatients();
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async updatePatients(req: Request, res: Response, next: NextFunction) {
    try {
      await PatientsService.updatePatients(req.body);
      return res
        .status(200)
        .json({ message: "Dados do Paciente Atualizados!" });
    } catch (e) {
      return next(e);
    }
  }
}

export default new PatientsController();
