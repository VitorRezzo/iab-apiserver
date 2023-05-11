import { Router } from "express";
import { verifyJWT } from "../features/JwToken";
import CompanionController from "../controller/CompanionController";

class CompanionRoute {
  allCompanionsRoutes(Routes: Router) {
    Routes.post(
      "/api/register-companion",
      verifyJWT,
      CompanionController.registerCompanion
    );
    Routes.post(
      "/api/get-companions-byid/:id",
      verifyJWT,
      CompanionController.getCompanionsById
    );
    Routes.post(
      "/api/search-companion-bynameorcpf",
      verifyJWT,
      CompanionController.searchCompanionByNameOrCPF
    );
    Routes.post(
      "/api/find-companion-associted-patient",
      verifyJWT,
      CompanionController.findCompanionAssocitedPatient
    );

    Routes.post(
      "/api/associate-companion-patient",
      verifyJWT,
      CompanionController.associateCompanionPatient
    );
    Routes.post(
      "/api/filter-companions",
      verifyJWT,
      CompanionController.filterCompanions
    );

    Routes.get(
      "/api/list-Allcompanions",
      verifyJWT,
      CompanionController.listAllCompanions
    );

    Routes.put(
      "/api/update-companion",
      verifyJWT,
      CompanionController.updateCompanion
    );
    Routes.post(
      "/api/remove-companion-associted-patient",
      verifyJWT,
      CompanionController.removeCompanionAssocitedPatient
    );
  }
}

export default new CompanionRoute();
