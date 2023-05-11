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
    console.log(allPatientElderly);

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
    const CountallPathology = [];

    const allPathology = await PatientModel.findAll({
      include: [
        {
          model: MedicalRecordModel,
          attributes: ["pathology"],
        },
        {
          model: StatusModel,
          where: {
            status: "Na Casa",
          },
        },
      ],
    });

    const namePathologys = allPathology.map((value: any, index: number) => {
      return value.MedicalRecord.dataValues.pathology;
    });

    const typePathologys = [...new Set(namePathologys)];

    for (let i = 0; i < typePathologys.length; i++) {
      CountallPathology[i] = await MedicalRecordModel.count({
        where: { pathology: typePathologys[i] },
      });
    }
    return { quant: CountallPathology, pathology: typePathologys };
  }

  async listPricesMovementsResidents(move: IMovement) {
    const TotalPriceMoviments = [];

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
      attributes: ["price", "date"],
    });
    const getDates = PriceMoviments.map((value: any) => {
      return value.dataValues.date;
    });
    const datesMoviments = [...new Set(getDates)];

    for (let i = 0; i < datesMoviments.length; i++) {
      TotalPriceMoviments[i] = await MovementModel.findAll({
        where: {
          date: datesMoviments[i],
        },

        attributes: [
          "price",
          "date",
          [Sequelize.fn("sum", Sequelize.col("price")), "total_price"],
        ],
      });
    }

    const allPriceMoviments = TotalPriceMoviments.map((value: any) => {
      return {
        x: value[0].dataValues.date,
        y: value[0].dataValues.total_price,
      };
    });

    return allPriceMoviments;
  }
}
export default new ResidentService();
