import {Router} from "express";
import {
    CadastraUsuario,
    AtualizaUsuario,
    LogUsuario,
    AutenticaUsuario,
  } from "../Controle/Usuarios.js";

  const routerUser = Router();
  
  routerUser.post('/api/CadastraUsuario', CadastraUsuario);
  routerUser.post('/api/LogUsuario', LogUsuario);
  routerUser.get('/api/AutenticaUsuario', AutenticaUsuario);
  routerUser.put('/api/AtualizaUsuario', AtualizaUsuario);
  
  export default routerUser;

  