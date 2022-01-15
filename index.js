
import express from "express";
import cors   from  "cors";
import bodyParser from "body-parser";
import routerUser from "./Routes/RouterUser.js";
import { CreateTable } from "./config/BDSqlite.js";
import dotenv from "dotenv";
const app = express();

dotenv.config()

const corsOptions = {
  origin: process.env.HOST_ORIGIN,
  method:["GET","POST"], 
  credential:true,
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use(bodyParser.json());

app.use(routerUser);


CreateTable();


//hos e porta do servidor

const host = process.env.HOST_SERVER
const port = process.env.PORT_SERVER


//Metodos Get & Post

app.get('/', cors(),function(req,res){
  res.send("servidor ok")
 })

  app.listen(port,host,() => {
    console.log(`Servidor Rodando http://${host}:${port}/`);
  });