import { Sequelize } from "sequelize";
import SQLite from "sqlite3";
export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "src/database/IAB.db",
  dialectOptions: {
    useUTC: false,

    mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX,
  },
});
