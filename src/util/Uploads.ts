import multer from "multer";
import path from "path";

class Uploads {
  private URL: string = path.join("./src/upload");

  private storage(): multer.StorageEngine {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, this.URL);
      },

      filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + req.params.cpf + ".png");
      },
    });
  }

  get getConfig(): multer.Options {
    return {
      storage: this.storage(),
    };
  }
}

export const UploadsAvatar = new Uploads();
