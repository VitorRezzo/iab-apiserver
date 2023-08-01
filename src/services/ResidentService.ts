/* eslint-disable prettier/prettier */
import { Op, Sequelize } from "sequelize";
import { CompanionModel } from "../models/CompanionModel";
import { PatientModel } from "../models/PatientModel";
import { MedicalRecordModel } from "../models/MedicalRecordModel";
import { MovementModel } from "../models/MovementModel";
import { StatusModel } from "../models/StatusModel";

interface IMovement {
  startdate: string;
  enddate: string;
}

class ResidentService {
  async countAllResidents() {
    const allCompanions = await CompanionModel.count();
    const allPatients = await PatientModel.count();
    return allCompanions + allPatients;
  }

  async countAllResidentsByGender() {
    const allPatientMan = await PatientModel.count({
      include: {
        model: StatusModel,
        where: { status: "Na Casa" },
      },
      where: { gender: "Masculino" },
    });
    const allCompanionMan = await CompanionModel.count({
      include: {
        model: StatusModel,
        where: { status: "Na Casa" },
      },
      where: { gender: "Masculino" },
    });
    const allWomanPatient = await PatientModel.count({
      include: {
        model: StatusModel,
        where: { status: "Na Casa" },
      },
      where: { gender: "Feminino" },
    });

    const allWomanCompanion = await CompanionModel.count({
      include: {
        model: StatusModel,
        where: { status: "Na Casa" },
      },
      where: { gender: "Feminino" },
    });

    const allPatientChildren = await PatientModel.count({
      include: {
        model: StatusModel,
        where: { status: "Na Casa" },
      },
      where: { age: { [Op.lte]: 14 } },
    });
    const allEcortChildren = await CompanionModel.count({
      include: {
        model: StatusModel,
        where: { status: "Na Casa" },
      },
      where: { age: { [Op.lte]: 14 } },
    });

    const allPatientElderly = await PatientModel.count({
      include: {
        model: StatusModel,
        where: { status: "Na Casa" },
      },
      where: { age: { [Op.gte]: 60 } },
    });
    const allEcortElderly = await CompanionModel.count({
      include: {
        model: StatusModel,
        where: { status: "Na Casa" },
      },
      where: { age: { [Op.gte]: 60 } },
    });

    const TotalResidents: number =
      (allPatientMan + allCompanionMan + allWomanPatient + allWomanCompanion) /
      230;

    return {
      AllMan: allPatientMan + allCompanionMan,
      AllWoman: allWomanPatient + allWomanCompanion,
      AllChildren: allPatientChildren + allEcortChildren,
      AllElderly: allPatientElderly + allEcortElderly,
      AllPatients: allPatientMan + allWomanPatient,
      AllCompanions: allCompanionMan + allWomanCompanion,
      AllResidents: TotalResidents * 100,
    };
  }

  async countAllPathologysPatients() {
    const allPatients = await PatientModel.findAll({
      attributes: ["MedicalRecordId"],
      include: [
        {
          model: MedicalRecordModel,
        },
        {
          model: StatusModel,
          where: { status: "Na Casa" },
        },
      ],
    });

    const MedicalIds = allPatients.map((value: any) => {
      return value.dataValues.MedicalRecordId;
    });

    const MedicalRecord = await MedicalRecordModel.findAll({
      where: {
        id: { [Op.in]: MedicalIds },
      },
      attributes: [
        "pathology",
        [Sequelize.fn("count", Sequelize.col("pathology")), "totalpathology"],
      ],
      group: ["pathology"],
    });

    return { MedicalRecord };
  }

  async listPricesMovementsResidents(move: IMovement) {
    const PriceMoviments = await MovementModel.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { date: { [Op.between]: [move.startdate, move.enddate] } },
              { date: move.startdate },
            ],
          },
          { price: { [Op.gt]: "0" } },
        ],
      },
      order: [["date", "ASC"]],
      attributes: [
        "date",
        [Sequelize.fn("sum", Sequelize.col("price")), "totalprice"],
      ],
      group: [Sequelize.fn("date", Sequelize.col("date"))],
    });

    return PriceMoviments;
  }
}
export default new ResidentService();
