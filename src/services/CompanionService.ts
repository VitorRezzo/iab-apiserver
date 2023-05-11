import { AddressModel } from "../models/AddressModel";
import { CompanionModel } from "../models/CompanionModel";
import { PatientsCompanions } from "../models/PatientsCompanions";
import { Op } from "sequelize";
import { AvatarModel } from "../models/AvatarModel";
import { StatusModel } from "../models/StatusModel";

interface IAddress {
  county: string;
  street: string;
  district: string;
  state: string;
}

interface IStatus {
  StatusId?: number;
  status: string;
}

interface IAvatar {
  avatarurl?: string;
}

interface ICompanion extends IAddress, IStatus, IAvatar {
  id?: string;
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
  gender: string;
  kinship: string;
  bloodtype: string;
  religion: string;
  contact: string;
  registerdate: string;
  AddressId?: number;
  AvatarId?: number;
}

class CompanionService {
  async registerCompanion(Companion: ICompanion) {
    const Status = await StatusModel.create({
      status: Companion.status,
    });

    const Addresses = await AddressModel.create({
      county: Companion.county,
      street: Companion.street,
      district: Companion.district,
      state: Companion.state,
    });

    const Avatares = await AvatarModel.create({
      url: Companion.avatarurl,
    });

    const Companions = await CompanionModel.create({
      fullname: Companion.fullname,
      cpf: Companion.cpf,
      birthdate: Companion.birthdate,
      age: Companion.age,
      profession: Companion.profession,
      wage: Companion.wage,
      schooling: Companion.schooling,
      addiction: Companion.addiction,
      bloodtype: Companion.bloodtype,
      gender: Companion.gender,
      contact: Companion.contact,
      religion: Companion.religion,
      kinship: Companion.kinship,
      formsunion: Companion.formsunion,
      civilstatus: Companion.civilstatus,
      registerdate: Companion.registerdate,
      StatusId: Status.id,
      AddressId: Addresses.id,
      AvatarId: Avatares.id,
    });

    await PatientsCompanions.create({
      PatientId: Companion.PatientId,
      CompanionId: Companions.id,
    });
  }

  async associateCompanionPatient(Companion: ICompanion) {
    await PatientsCompanions.create({
      PatientId: Companion.PatientId,
      CompanionId: Companion.id,
    });

    const Companions = await CompanionModel.findAll({
      where: { id: Companion.id },
    });

    console.log(Companions[0].dataValues.StatusId);

    await StatusModel.update(
      { status: "Na Casa" },
      {
        where: { id: Companions[0].dataValues.StatusId },
      }
    );
  }

  async listAllCompanions() {
    const Companions = await CompanionModel.findAll({
      limit: 40,
      include: [{ all: true, nested: true }],
    });

    return Companions;
  }

  async getCompanionsById(Companion: ICompanion) {
    const Companions = await CompanionModel.findByPk(Companion.id, {
      include: [{ all: true, nested: true }],
    });
    return Companions;
  }

  async searchCompanionByNameOrCPF(Companion: ICompanion) {
    const Companions = await CompanionModel.findAll({
      where: {
        [Op.or]: [
          { fullname: { [Op.like]: Companion.fullname + "%" } },
          { cpf: { [Op.like]: Companion.cpf + "%" } },
        ],
      },
      include: [{ all: true, nested: true }],
    });

    return Companions;
  }

  async filterCompanions(Companion: ICompanion) {
    const Companions = await CompanionModel.findAll({
      include: [
        {
          model: AddressModel,
          where: {
            county: { [Op.like]: "%" + Companion.county + "%" },
            state: { [Op.like]: "%" + Companion.state + "%" },
          },
        },
        {
          model: AvatarModel,
        },
        {
          model: StatusModel,
        },
      ],
      where: {
        // { religion: Patient.religion },
        schooling: { [Op.like]: "%" + Companion.schooling + "%" },
        // { profession: Patient.profession },
        // { age: Patient.age },
        gender: { [Op.like]: "%" + Companion.gender + "%" },
      },
    });

    return Companions;
  }

  async findCompanionAssocitedPatient(Companion: ICompanion) {
    const Companions = await PatientsCompanions.findAll({
      where: {
        PatientId: Companion.PatientId,
      },
    });

    return Companions;
  }

  async removeCompanionAssocitedPatient(Companion: ICompanion) {
    const CompanionsDestroy = await PatientsCompanions.destroy({
      where: {
        [Op.and]: [
          { CompanionId: Companion.id },
          { PatientId: Companion.PatientId },
        ],
      },
    });

    const Companions = await CompanionModel.findAll({
      where: { id: Companion.id },
    });

    console.log(Companions[0].dataValues.StatusId);

    await StatusModel.update(
      { status: "Viagem" },
      {
        where: { id: Companions[0].dataValues.StatusId },
      }
    );

    return CompanionsDestroy;
  }

  async updateCompanion(Companion: ICompanion) {
    await StatusModel.update(
      {
        status: Companion.status,
      },
      {
        where: {
          id: Companion.StatusId,
        },
      }
    );

    await AddressModel.update(
      {
        county: Companion.county,
        street: Companion.street,
        district: Companion.district,
        state: Companion.state,
      },
      {
        where: {
          id: Companion.AddressId,
        },
      }
    );
    await AvatarModel.update(
      {
        url: Companion.avatarurl,
      },
      {
        where: {
          id: Companion.AvatarId,
        },
      }
    );

    await CompanionModel.update(
      {
        fullname: Companion.fullname,
        cpf: Companion.cpf,
        birthdate: Companion.birthdate,
        age: Companion.age,
        profession: Companion.profession,
        wage: Companion.wage,
        schooling: Companion.schooling,
        addiction: Companion.addiction,
        bloodtype: Companion.bloodtype,
        gender: Companion.gender,
        contact: Companion.contact,
        religion: Companion.religion,
        formsunion: Companion.formsunion,
        civilstatus: Companion.civilstatus,
        registerdate: Companion.registerdate,
      },
      {
        where: {
          id: Companion.id,
        },
      }
    );
  }
}
export default new CompanionService();
