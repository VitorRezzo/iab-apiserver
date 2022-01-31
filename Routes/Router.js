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
  import {
    CadastraMoradores
  } from "../Controle/Moradores.js";

  const router = Router();
  //Rotas dos Usuarios do Sistema
  router.post('/api/CadastraUsuario',verifyJWT,CadastraUsuario);
  router.post('/api/PostUsuario', DataUsuario); // Pega os dados dos campos usuario e senha
  router.get('/api/LoginUsuario',LoginUsuario);
  router.get('/api/AutenticaUser',verifyJWT,AutenticaUser);
  router.get('/api/SelectUsuario',verifyJWT,SelectUsuario);
  router.put('/api/AtualizaUsuario',verifyJWT,AtualizaUsuario);
  

//Rotas dos Moradores 
router.post('/api/CadastraMorador',verifyJWT,CadastraMoradores);






  export default router;

  