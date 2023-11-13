import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../config/config";
import PatientsModel from "./PatientsModel";
import MedicinesModel from "./MedicinesModel";

class PatientsMedicinesModel extends Model<
  InferAttributes<PatientsMedicinesModel>,
  InferCreationAttributes<PatientsMedicinesModel>
> {
  declare id: number;
  declare PatientId: number;
  declare MedicineId: number;
}
PatientsMedicinesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    PatientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Residents", key: "id" },
    },
    MedicineId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Expenses", key: "id" },
    },
  },
  {
    sequelize,
    modelName: "PatientsMedicines",
    timestamps: false,
  }
);

PatientsModel.hasMany(PatientsMedicinesModel);
PatientsMedicinesModel.belongsTo(PatientsModel);

MedicinesModel.hasMany(PatientsMedicinesModel);
PatientsMedicinesModel.belongsTo(MedicinesModel);

export default PatientsMedicinesModel;
