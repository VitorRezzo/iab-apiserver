import {Router} from "express";
import { verifyJWT } from "../config/GeradorToken.js";
import {
    CadastraUsuario,
    AtualizaUsuario,
    DataUsuario,
    LoginUsuario,
    AutenticaUser,
  } from "../Controle/Usuarios.js";


  var corsOptions = {
    origin: '192.168.100.8:3000',
    optionsSuccessStatus: 200,
  }
  const routerUser = Router();
  
  routerUser.post('/api/CadastraUsuario', CadastraUsuario);
  routerUser.post('/api/PostUsuario', DataUsuario);
  routerUser.get('/api/LoginUsuario',LoginUsuario);
  routerUser.get('/api/AutenticaUser',verifyJWT,AutenticaUser);
  routerUser.put('/api/AtualizaUsuario', AtualizaUsuario);
  
  export default routerUser;

  