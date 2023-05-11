import { DataTypes } from "sequelize";
import { DBSqlite } from "../database/DBSqlite";
import { AddressModel } from "./AddressModel";
import { AvatarModel } from "./AvatarModel";
import { CompanionModel } from "./CompanionModel";
import { MedicalRecordModel } from "./MedicalRecordModel";
import { PatientsCompanions } from "./PatientsCompanions";
import { StatusModel } from "./StatusModel";
export const PatientModel: any = DBSqlite.define("Patients", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  profession: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  wage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  schooling: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  addiction: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bloodtype: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  religion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  civilstatus: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  formsunion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  registerdate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

StatusModel.hasOne(PatientModel);
PatientModel.belongsTo(StatusModel, {
  foreignKey: {
    allowNull: false,
  },
});

AddressModel.hasOne(PatientModel);
PatientModel.belongsTo(AddressModel, {
  foreignKey: {
    allowNull: false,
  },
});

AvatarModel.hasOne(PatientModel);
PatientModel.belongsTo(AvatarModel, {
  foreignKey: {
    allowNull: false,
  },
});

MedicalRecordModel.hasOne(PatientModel);
PatientModel.belongsTo(MedicalRecordModel, {
  foreignKey: {
    allowNull: false,
  },
});

PatientModel.belongsToMany(CompanionModel, { through: PatientsCompanions });
