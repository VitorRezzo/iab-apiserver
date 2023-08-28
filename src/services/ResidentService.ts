/* eslint-disable prettier/prettier */
import { Op, Sequelize } from "sequelize";
import { CompanionModel } from "../models/CompanionModel";
import { PatientModel } from "../models/PatientModel";
import { MedicalRecordModel } from "../models/MedicalRecordModel";
import { MovementModel } from "../models/MovementModel";
import { StatusModel } from "../models/StatusModel";
import { AddressModel } from "../models/AddressModel";
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

    return [
      allPatientMan + allCompanionMan,
      allWomanPatient + allWomanCompanion,
      allPatientChildren + allEcortChildren,
      allPatientElderly + allEcortElderly,
      allPatientMan + allWomanPatient,
      allCompanionMan + allWomanCompanion,
    ];
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
    const Totalpathology = MedicalRecord.map((value: any) => {
      return value.dataValues.totalpathology;
    });
    const Pathologys = MedicalRecord.map((value: any) => {
      return value.dataValues.pathology;
    });
    return { totalpathology: Totalpathology, pathology: Pathologys };
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

    const Prices = PriceMoviments.map((value: any) => {
      return { x: value.dataValues.date, y: value.dataValues.totalprice };
    });
    return Prices;
  }

  async countPatientsDeadByYear() {
    const PatientsDead = await PatientModel.count({
      include: {
        model: StatusModel,
        where: { status: "Óbito" },
      },
    });

    return { count: PatientsDead };
  }

  async countPatientsCuredByYear() {
    const Patientscured = await PatientModel.count({
      include: {
        model: StatusModel,
        where: { status: "Curado" },
      },
    });

    return { count: Patientscured };
  }

  async listResidentsAddress() {
    const Patients = await PatientModel.findAll({
      include: [
        {
          model: AddressModel,
        },
        {
          model: StatusModel,
          where: { status: "Na Casa" },
        },
      ],
    });

    const Companion = await CompanionModel.findAll({
      include: [
        {
          model: AddressModel,
        },
        {
          model: StatusModel,
          where: { status: "Na Casa" },
        },
      ],
    });
    const PatientsId = Patients.map((value: any) => {
      return value.dataValues.Address.id;
    });
    const CompanionId = Companion.map((value: any) => {
      return value.dataValues.Address.id;
    });
    const PatientIdAndCompanionId = [...CompanionId, ...PatientsId];

    const ResidentsAddress = await AddressModel.findAll({
      where: { id: { [Op.in]: PatientIdAndCompanionId } },
      attributes: [
        "county",
        "state",
        [Sequelize.fn("COUNT", Sequelize.col("county")), "totalcounty"],
      ],
      group: ["county"],
    });

    const Addresses = ResidentsAddress.map((value: any) => {
      return {
        x: `${value.dataValues.county} - ${value.dataValues.state}`,
        y: value.dataValues.totalcounty,
      };
    });

    return Addresses;
  }

  async listResidentsActivity() {
    const PatientResidents = await PatientModel.findAll({
      limit: 6,
      include: {
        model: StatusModel,
      },
    });

    const CompanionResidents = await CompanionModel.findAll({
      limit: 6,
      include: [
        {
          model: StatusModel,
        },
      ],
    });

    const patientStatus = PatientResidents.map((value: any) => {
      return {
        status: value.dataValues.Status.status,
        name: value.dataValues.fullname,
        activity: value.dataValues.Status.activity,
        updatedAt: value.dataValues.Status.updatedAt,
      };
    });
    const companionStatus = CompanionResidents.map((value: any) => {
      return {
        status: value.dataValues.Status.status,
        name: value.dataValues.fullname,
        activity: value.dataValues.Status.activity,
        updatedAt: value.dataValues.Status.updatedAt,
      };
    });

    const AllResidents = [...patientStatus, ...companionStatus];

    const OrderDescResidents = AllResidents.sort(
      (a, b) => b.updatedAt - a.updatedAt
    );

    return OrderDescResidents;
  }
}
export default new ResidentService();
