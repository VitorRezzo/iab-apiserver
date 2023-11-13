import { NextFunction, Request, Response } from "express";
import ResidentsService from "../services/ResidentsService";

class ResidenteController {
  async listAllResidentsByStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await ResidentsService.listAllResidentsByStatus();
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async countAllResidents(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ResidentsService.countAllResidents();
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
      const response = await ResidentsService.countAllResidentsByGender();
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async countAllPatientsPathologys(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await ResidentsService.countAllPatientsPathologys();
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async countPatientsDead(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ResidentsService.countPatientsDead();
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async countPatientsCured(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ResidentsService.countPatientsCured();
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async countResidentsEnter(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ResidentsService.countResidentsEnter();
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async countResidentsExit(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ResidentsService.countResidentsExit();
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async countResidentsByAddress(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await ResidentsService.countResidentsByAddress();
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async countAllResidentsExpenses(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await ResidentsService.countAllResidentsExpenses(
        req.body
      );
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async listResidentsActivity(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ResidentsService.listResidentsActivity();
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async searchResidentByNameorCpf(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await ResidentsService.searchResidentByNameorCpf(
        req.body
      );
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }

  async removeAssocitedByStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await ResidentsService.removeAssocitedByStatus(req.body);
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }
}
export default new ResidenteController();
