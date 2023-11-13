import { Op, Sequelize } from "sequelize";
import CompanionsModel from "../models/CompanionsModel";
import PatientsModel from "../models/PatientsModel";
import MedicalRecordsModel from "../models/MedicalRecordsModel";
import MovementModel from "../models/MovimentsModel";
import StatusModel from "../models/StatusModel";
import AddressModel from "../models/AddressModel";
import AvatarModel from "../models/AvatarModel";
import PatientsCompanions from "../models/PatientsCompanionsModel";
import ResidentsModel from "../models/ResidentsModel";
import { startOfDay, endOfDay } from "date-fns";

interface IMovement {
  startdate: string;
  enddate: string;
}

interface IMedicinesModel {
  remedy: string;
  description: string;
}
interface IAddress {
  county: string;
  street: string;
  district: string;
  state: string;
}

interface IStatus {
  StatusId: string;
  status: string;
  activity: string;
}

interface IAvatar {
  avatarurl?: string;
}

interface IResident extends IAddress, IMedicinesModel, IStatus, IAvatar {
  id?: number;
  PatientId?: number;
  fullname: string;
  cpf: string;
  birthdate: string;
  age: string;
  profession: string;
  wage: string;
  schooling: string;
  formsunion: string;
  civilstatus: string;
  addiction: string;
  bloodtype: string;
  gender: string;
  CompanionId: number;
}

class ResidentsService {
  async listAllResidentsByStatus() {
    const AllResidents = await ResidentsModel.findAll({
      include: [
        {
          model: StatusModel,
          where: { status: "Na Casa" },
        },
      ],
    });
    return AllResidents;
  }

  async countAllResidents() {
    const AllResidents = await ResidentsModel.count();
    return AllResidents;
  }

  async countAllResidentsByGender() {
    const allResidentsMan = await ResidentsModel.count({
      include: [
        {
          model: StatusModel,
          where: { status: "Na Casa" },
        },
      ],
      where: { gender: "Masculino" },
    });

    const allResidentsWoman = await ResidentsModel.count({
      include: [
        {
          model: StatusModel,
          where: { status: "Na Casa" },
        },
      ],
      where: { gender: "Feminino" },
    });

    const allPatients = await PatientsModel.count({
      include: {
        model: ResidentsModel,
        include: [{ model: StatusModel, where: { status: "Na Casa" } }],
      },
    });
    const allCompanions = await CompanionsModel.count({
      include: {
        model: ResidentsModel,
        include: [{ model: StatusModel, where: { status: "Na Casa" } }],
      },
    });

    const allResidentsChildren = await ResidentsModel.count({
      include: [
        {
          model: StatusModel,
          where: { status: "Na Casa" },
        },
      ],
      where: { age: { [Op.lte]: 14 } },
    });

    const allResidentsElderly = await ResidentsModel.count({
      include: [
        {
          model: StatusModel,
          where: { status: "Na Casa" },
        },
      ],
      where: { age: { [Op.gte]: 60 } },
    });

    return [
      allResidentsMan,
      allResidentsWoman,
      allResidentsChildren,
      allResidentsElderly,
      allPatients,
      allCompanions,
    ];
  }

  async countAllPatientsPathologys() {
    const allPathology = await MedicalRecordsModel.findAll({
      attributes: [
        "pathology",
        [Sequelize.fn("count", Sequelize.col("pathology")), "totalpathology"],
      ],
      group: ["pathology"],
      include: [
        {
          model: PatientsModel,
          required: true,
          include: [
            {
              model: ResidentsModel,
              required: true,
              include: [
                {
                  model: StatusModel,
                  required: true,
                  where: { status: "Na Casa" },
                },
              ],
            },
          ],
        },
      ],
    });

    const typePathology = allPathology.map((result) => {
      return result.dataValues.pathology;
    });

    const groupPathology = allPathology.map((result) => {
      return result.dataValues.totalpathology;
    });

    return { totalpathology: groupPathology, pathology: typePathology };
  }

  async countAllResidentsExpenses(move: IMovement) {
    const PriceMoviments = await MovementModel.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { date: { [Op.between]: [move.startdate, move.enddate] } },
              { date: move.startdate },
            ],
          },
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

  async countResidentsByAddress() {
    const ResidentsAddress = await AddressModel.findAll({
      attributes: [
        "county",
        "state",
        [Sequelize.fn("COUNT", Sequelize.col("county")), "totalcounty"],
      ],
      group: ["county"],
      include: [
        {
          model: ResidentsModel,
          required: true,
          include: [
            {
              model: StatusModel,
              required: true,
              where: { status: "Na Casa" },
            },
          ],
        },
      ],
    });

    const Addresses = ResidentsAddress.map((value: any) => {
      return {
        x: `${value.dataValues.county} - ${value.dataValues.state}`,
        y: value.dataValues.totalcounty,
      };
    });

    return Addresses;
  }

  async countPatientsDead() {
    const PatientsDead = await StatusModel.count({
      where: { status: "Óbito" },
    });

    return { count: PatientsDead };
  }

  async countPatientsCured() {
    const Patientscured = await StatusModel.count({
      where: { status: "Curado" },
    });

    return { count: Patientscured };
  }

  async countResidentsEnter() {
    const today = new Date();

    const ResidentsEnter = await StatusModel.count({
      where: {
        createdAt: {
          [Op.between]: [startOfDay(today), endOfDay(today)],
        },
      },
    });

    return { count: ResidentsEnter };
  }

  async countResidentsExit() {
    const today: any = new Date();

    const ResidentsExit = await StatusModel.count({
      where: {
        updatedAt: {
          [Op.between]: [startOfDay(today), endOfDay(today)],
        },

        status: ["Viagem", "Evadiu", "Saiu", "Óbito"],
      },
    });

    return { count: ResidentsExit };
  }

  async listResidentsActivity() {
    const AllResidents = await StatusModel.findAll({
      limit: 10,
      include: [
        {
          model: ResidentsModel,
          include: [PatientsModel, CompanionsModel, AvatarModel],
        },
      ],
      order: [[Sequelize.literal("updatedAt"), "DESC"]],
    });

    return AllResidents;
  }

  async searchResidentByNameorCpf(resident: IResident) {
    try {
      const Resident = await ResidentsModel.findOne({
        include: [StatusModel, AvatarModel],
        where: {
          [Op.or]: [{ fullname: resident.fullname }, { cpf: resident.cpf }],
        },
      });

      return { Resident };
    } catch (err) {
      return err;
    }
  }

  async removeAssocitedByStatus(resident: IResident) {
    try {
      const amout = await PatientsCompanions.count({
        where: { CompanionId: resident.CompanionId },
      });

      if (resident.status === "Óbito") {
        if (amout === 0) {
          await StatusModel.update(
            {
              status: "Saiu",
              activity: "Saiu do IAB",
            },

            {
              where: {
                id: resident.CompanionId,
              },
            }
          );
        }
      }
      await PatientsCompanions.destroy({
        where: {
          [Op.and]: [
            { CompanionId: resident.CompanionId },
            { PatientId: resident.PatientId },
          ],
        },
      });
    } catch (err) {
      return err;
    }
  }
}

export default new ResidentsService();
