import { Router } from "express";
import { verifyJWT } from "../util/JwToken";
import GraphController from "../controller/GraphController";

class GraphRouter {
  allGraphRoutes(Routes: Router) {
    Routes.post(
      "/api/filter-graph-bytype",
      verifyJWT,
      GraphController.filterGraphByType
    );
  }
}

export default new GraphRouter();
