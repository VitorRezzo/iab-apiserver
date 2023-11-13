// import { Router } from "express";
// import { verifyJWT } from "../util/JwToken";
// import MovementsController from "../controller/MovementsController";
// class MovementRouter {
//   allMovementRoutes(Routes: Router) {
//     Routes.post(
//       "/api/register-movements",
//       MovementsController.registerMovements
//     );
//     Routes.post(
//       "/api/list-allmovementspatients",
//       MovementsController.listAllMovementsPatients
//     );
//     Routes.post(
//       "/api/list-allmovements",
//       verifyJWT,
//       MovementsController.listAllMovements
//     );
//     Routes.post(
//       "/api/get-movements-byid/:id",
//       verifyJWT,
//       MovementsController.getMovementsById
//     );
//     Routes.post(
//       "/api/list-movements-betewendate",
//       verifyJWT,
//       MovementsController.listMovementsBetewenDate
//     );
//     Routes.put(
//       "/api/update-movements",
//       verifyJWT,
//       MovementsController.updateMovement
//     );

//     Routes.delete(
//       "/api/delete-moviment/:id",
//       MovementsController.deleteMovement
//     );
//   }
// }

// export default new MovementRouter();
