import { Router } from "express";
import { verifyJWT } from "../features/JwToken";
import ResidenteController from "../controller/ResidenteController";

class ResidentRoute {
  allResidentRoutes(Routes: Router) {
    Routes.get(
      "/api/count-allresidents",
      verifyJWT,
      ResidenteController.countAllResidents
    );
    Routes.get(
      "/api/count-allpathologys-patients",
      verifyJWT,
      ResidenteController.countAllPathologysPatients
    );
    Routes.get(
      "/api/count-allresidents-bygender",
      verifyJWT,
      ResidenteController.countAllResidentsByGender
    );
    Routes.post(
      "/api/list-pricesmovements-residents",
      verifyJWT,
      ResidenteController.listPricesMovementsResidents
    );
  }
}

export default new ResidentRoute();