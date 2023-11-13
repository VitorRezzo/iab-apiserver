import { Router } from "express";
import { verifyJWT } from "../util/JwToken";
import ResidentsController from "../controller/ResidentsController";

class ResidentRoute {
  allResidentsRoutes(Routes: Router) {
    Routes.get(
      "/api/listallresidentsbystatus",
      verifyJWT,
      ResidentsController.listAllResidentsByStatus
    );
    Routes.get(
      "/api/count-allresidents",
      verifyJWT,
      ResidentsController.countAllResidents
    );
    Routes.get(
      "/api/count-allpatients-pathologys",
      verifyJWT,
      ResidentsController.countAllPatientsPathologys
    );
    Routes.get(
      "/api/count-allresidents-bygender",
      verifyJWT,
      ResidentsController.countAllResidentsByGender
    );
    // Routes.post(
    //   "/api/count-allresidents-Expenses",
    //   verifyJWT,
    //   ResidentsController.countAllResidentsExpenses
    // );
    Routes.get(
      "/api/count-residentsby-address",
      verifyJWT,
      ResidentsController.countResidentsByAddress
    );
    Routes.get(
      "/api/count-patientscured",
      verifyJWT,
      ResidentsController.countPatientsCured
    );
    Routes.get(
      "/api/count-patientsdead",
      verifyJWT,
      ResidentsController.countPatientsDead
    );

    Routes.get(
      "/api/list-residents-Activity",
      verifyJWT,
      ResidentsController.listResidentsActivity
    );
    Routes.get(
      "/api/count-residentsenter",
      verifyJWT,
      ResidentsController.countResidentsEnter
    );
    Routes.get(
      "/api/count-residentsexit",
      verifyJWT,
      ResidentsController.countResidentsExit
    );
    Routes.post(
      "/api/search-resident-bynameorcpf",
      verifyJWT,
      ResidentsController.searchResidentByNameorCpf
    );
    // Routes.post(
    //   "/api/remove-associted-by-status",
    //   verifyJWT,
    //   ResidentsController.removeAssocitedByStatus
    // );
  }
}

export default new ResidentRoute();
