import { NextFunction, Request, Response } from "express";
import GraphService from "../services/GraphService";
class GraphController {
  async filterGraphByType(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await GraphService.filterGraphByType(req.body);
      return response
        ? res.status(200).json(response)
        : res.status(500).json(response);
    } catch (e) {
      return next(e);
    }
  }
}

export default new GraphController();
