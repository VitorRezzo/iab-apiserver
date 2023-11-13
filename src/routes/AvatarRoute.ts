import { Router } from "express";
import { UploadsAvatar } from "../util/Uploads";
import multer from "multer";
import AvatarController from "../controller/AvatarController";

class AvatarRouter {
  allAvatarRoutes(Routes: Router) {
    Routes.post(
      "/api/upload-avatar/:cpf",
      multer(UploadsAvatar.getConfig).single("image"),
      AvatarController.uploadAvatar
    );
    Routes.delete(
      "/api/remove-avatar/:name",
      AvatarController.removeAvatarByName
    );
  }
}

export default new AvatarRouter();
