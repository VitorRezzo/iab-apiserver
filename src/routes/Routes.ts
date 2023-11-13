import { Router } from "express";
import UsersRoute from "./UsersRoute";
// import MovementRoute from "./MovementRoute";
import PatientsRoute from "./PatientsRoute";
import CompanionRoute from "./CompanionsRoute";
import AvatarRoute from "./AvatarRoute";
// import GraphRoute from "./GraphRoute";
import ResidentsRoute from "./ResidentsRoute";

export const Route: Router = Router();

UsersRoute.allUsersRoutes(Route);
PatientsRoute.allPatientsRoutes(Route);
CompanionRoute.allCompanionsRoutes(Route);
AvatarRoute.allAvatarRoutes(Route);
// MovementRoute.allMovementRoutes(Route);
ResidentsRoute.allResidentsRoutes(Route);
// GraphRoute.allGraphRoutes(Route);
