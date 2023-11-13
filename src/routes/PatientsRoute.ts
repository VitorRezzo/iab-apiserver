import { Router } from "express";
import { verifyJWT } from "../util/JwToken";
import PatientController from "../controller/PatientsController";

class PatientsRoute {
  allPatientsRoutes(Routes: Router) {
    Routes.post(
      "/api/register-patients",
      verifyJWT,
      PatientController.registerPatients
    );
    Routes.put(
      "/api/update-patients",
      verifyJWT,
      PatientController.updatePatients
    );
    Routes.post(
      "/api/search-patient-bynameorcpf",
      verifyJWT,
      PatientController.searchPatientByNameOrCPF
    );
    Routes.post(
      "/api/get-patients-byid/:id",
      verifyJWT,
      PatientController.getPatientsById
    );
    Routes.get(
      "/api/listAll-patients",
      verifyJWT,
      PatientController.listAllPatients
    );
    Routes.post(
      "/api/list-bypatient-filter",
      verifyJWT,
      PatientController.listByPatientFilter
    );
  }
}

export default new PatientsRoute();
