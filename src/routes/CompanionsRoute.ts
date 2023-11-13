import { Router } from "express";
import { verifyJWT } from "../util/JwToken";
import CompanionsController from "../controller/CompanionsController";

class CompanionRoute {
  allCompanionsRoutes(Routes: Router) {
    Routes.post(
      "/api/register-companion",
      verifyJWT,
      CompanionsController.registerCompanion
    );
    Routes.post(
      "/api/get-companions-byid/:id",
      verifyJWT,
      CompanionsController.getCompanionsById
    );
    Routes.post(
      "/api/search-companion-bynameorcpf",
      verifyJWT,
      CompanionsController.searchCompanionByNameOrCPF
    );
    Routes.post(
      "/api/find-companion-associted-patient",
      verifyJWT,
      CompanionsController.findCompanionAssocitedPatient
    );

    Routes.post(
      "/api/associate-companion-patient",
      verifyJWT,
      CompanionsController.associateCompanionPatient
    );
    Routes.post(
      "/api/list-bycompanion-filter",
      verifyJWT,
      CompanionsController.listByCompanionFilter
    );

    Routes.get(
      "/api/list-Allcompanions",
      verifyJWT,
      CompanionsController.listAllCompanions
    );

    Routes.put(
      "/api/update-companion",
      verifyJWT,
      CompanionsController.updateCompanion
    );
    Routes.post(
      "/api/remove-companion-associted-patient",
      verifyJWT,
      CompanionsController.removeCompanionAssocitedPatient
    );
  }
}

export default new CompanionRoute();
