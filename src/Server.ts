import { server, app, corsOptions } from "./ServerHttp";
import cors from "cors";
import bodyParser from "body-parser";
import { Route } from "./routes/Routes";
import "./util/WebSockets";
import { RunMigrationSeeders } from "./util/RunMigrationsSeeders";

const host: string = process.env.HOST_SERVER;

const port: number = +process.env.PORT_SERVER;

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(Route);

app.get("/", cors(), function (req, res) {
  res.send("servidor ok");
});
server.listen(port, host, async () => {
  RunMigrationSeeders.UmzugUP();
  console.log(`Servidor Rodando http://${host}:${port}/`);
});
