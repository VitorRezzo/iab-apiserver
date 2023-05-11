import { Router } from "express";
import LoginRoute from "./LoginRoute";
import MovementRoute from "./MovementRoute";
import PatientRoute from "./PatientRoute";
import CompanionRoute from "./CompanionRoute";
import AvatarRoute from "./AvatarRoute";
import GraphRoute from "./GraphRoute";
import ResidentRoute from "./ResidentRoute";

export const Route: Router = Router();

LoginRoute.allLoginRoutes(Route);
MovementRoute.allMovementRoutes(Route);
PatientRoute.allPatientRoutes(Route);
CompanionRoute.allCompanionsRoutes(Route);
AvatarRoute.allAvatarRoutes(Route);
ResidentRoute.allResidentRoutes(Route);
GraphRoute.allGraphRoutes(Route);
