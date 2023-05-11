import { Router } from "express";
import { verifyJWT } from "../features/JwToken";
import MovementController from "../controller/MovementController";
class MovementRouter {
  allMovementRoutes(Routes: Router) {
    Routes.post(
      "/api/register-movements",
      MovementController.registerMovements
    );
    Routes.post(
      "/api/list-allmovementspatients",
      MovementController.listAllMovementsPatients
    );
    Routes.post(
      "/api/list-allmovements",
      verifyJWT,
      MovementController.listAllMovements
    );
    Routes.post(
      "/api/get-movements-byid/:id",
      verifyJWT,
      MovementController.getMovementsById
    );
    Routes.post(
      "/api/list-movements-betewendate",
      verifyJWT,
      MovementController.listMovementsBetewenDate
    );
    Routes.put(
      "/api/update-movements",
      verifyJWT,
      MovementController.updateMovement
    );

    Routes.delete(
      "/api/delete-moviment/:id",
      MovementController.deleteMovement
    );
  }
}

export default new MovementRouter();
