import { Sequelize } from "sequelize";

export const DBSqlite = new Sequelize({
  dialect: "sqlite",
  storage: "src/database/IAB.db",
});
