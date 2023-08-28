import { NextFunction, Request, Response } from "express";
import PatientService from "../services/PatientService";

class PatientController {
  async registerPatients(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await PatientService.registerPatients(req.body);
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
      const response = await PatientService.getPatientsById(id);
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
      const response = await PatientService.searchPatientByNameOrCPF(req.body);
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async filterPatients(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await PatientService.filterPatients(req.body);
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async listAllPatients(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await PatientService.listAllPatients();
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async updatePatients(req: Request, res: Response, next: NextFunction) {
    try {
      await PatientService.updatePatients(req.body);
      return res
        .status(200)
        .json({ message: "Dados do Paciente Atualizados!" });
    } catch (e) {
      return next(e);
    }
  }
}

export default new PatientController();
