import { Umzug, SequelizeStorage } from "umzug";
import { sequelize } from "../config/config";

class RunMigrationsSeeders {
  async UmzugUP() {
    const migrations = new Umzug({
      migrations: { glob: "src/migrations/*.js" },
      context: sequelize.getQueryInterface(),
      storage: new SequelizeStorage({ sequelize }),
      logger: console,
    });

    const seeders = new Umzug({
      migrations: { glob: "src/seeders/*.js" },
      context: sequelize.getQueryInterface(),
      storage: new SequelizeStorage({ sequelize }),
      logger: console,
    });

    return await migrations.up(), seeders.up();
  }

  async UmzugDown(migra: string) {
    const migrations = new Umzug({
      migrations: { glob: "src/migrations/*.js" },
      context: sequelize.getQueryInterface(),
      storage: new SequelizeStorage({ sequelize }),
      logger: console,
    });

    return await migrations.down({ migrations: [migra] });
  }
}

export const RunMigrationSeeders = new RunMigrationsSeeders();
