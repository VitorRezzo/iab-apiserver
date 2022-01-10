import {Router} from "express";
import {
    InsertUsuario,
    UpdateUsuario,
  } from "../Controle/Usuarios.js";

  const routerUser = Router();
  
  routerUser.post('/api/cadastrouser', InsertUsuario);
   
  routerUser.put('/api/atualizaruser', UpdateUsuario);
  
  export default routerUser;

  