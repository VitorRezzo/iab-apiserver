import { Router } from "express";
import { verifyJWT } from "../util/JwToken";
import UserController from "../controller/UsersController";

class UsersRoute {
  allUsersRoutes(Routes: Router) {
    Routes.post("/api/check-AuthUser", verifyJWT, UserController.checkAuthUser);
    Routes.post("/api/register-user", verifyJWT, UserController.registerUser);
    Routes.post("/api/login-user", UserController.loginUser);
  }
}

export default new UsersRoute();
