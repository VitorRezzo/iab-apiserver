import { Router } from "express";
import { verifyJWT } from "../features/JwToken";
import UserController from "../controller/UserController";

class LoginRouter {
  allLoginRoutes(Routes: Router) {
    Routes.post(
      "/api/verify-AuthUser",
      verifyJWT,
      UserController.verifyAuthUser
    );
    Routes.post("/api/register-user", verifyJWT, UserController.registerUser);
    Routes.post("/api/login-user", UserController.loginUser);
  }
}

export default new LoginRouter();
