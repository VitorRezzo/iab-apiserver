import {Router} from "express";
import { verifyJWT } from "../config/GeradorToken.js";
import {
    CadastraUsuario,
    AtualizaUsuario,
    DataUsuario,
    LoginUsuario,
    AutenticaUser,
    SelectUsuario,
  } from "../Controle/Usuarios.js";

  const routerUser = Router();
  
  routerUser.post('/api/CadastraUsuario',verifyJWT,CadastraUsuario);
  routerUser.post('/api/PostUsuario', DataUsuario);
  routerUser.get('/api/LoginUsuario',LoginUsuario);
  routerUser.get('/api/AutenticaUser',verifyJWT,AutenticaUser);
  routerUser.get('/api/SelectUsuario',verifyJWT,SelectUsuario);
  routerUser.put('/api/AtualizaUsuario', verifyJWT,AtualizaUsuario);
  
  export default routerUser;

  