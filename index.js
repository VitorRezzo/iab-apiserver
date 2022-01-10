
import express from "express";
import cors   from  "cors";
import bodyParser from "body-parser";
import routerUser from "./Routes/RouterUser.js";
import { CreateTable } from "./config/BDSqlite.js";

const app = express();



var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use(bodyParser.json());

app.use(routerUser);
//Endereço e Porta do servidor
const host = '127.0.0.1';
const port = 3010;

CreateTable();

//Metodos Get & Post

app.get('/', cors(),function(req,res){
  res.send("servidor ok")
 })

  app.listen(port, host, () => {
    console.log(`Servidor Rodando http://${host}:${port}/`);
  });