import { NextFunction, Request, Response } from "express";
import ResidentService from "../services/ResidentService";

class ResidenteController {
  async countAllResidents(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ResidentService.countAllResidents();
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async countAllResidentsByGender(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await ResidentService.countAllResidentsByGender();
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async countAllPathologysPatients(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await ResidentService.countAllPathologysPatients();
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async countPatientsDeadByYear(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await ResidentService.countPatientsDeadByYear();
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async countPatientsCuredByYear(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await ResidentService.countPatientsCuredByYear();
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async listPricesMovementsResidents(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await ResidentService.listPricesMovementsResidents(
        req.body
      );
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }
}
export default new ResidenteController();
