import AddressModel from "../models/AddressModel";
import CompanionsModel from "../models/CompanionsModel";
import PatientsCompanionsModel from "../models/PatientsCompanionsModel";
import AvatarModel from "../models/AvatarModel";
import StatusModel from "../models/StatusModel";
import ResidentsModel from "../models/ResidentsModel";

import { Op } from "sequelize";

interface IAddress {
  county: string;
  street: string;
  district: string;
  state: string;
}

interface IStatus {
  StatusId?: number;
  status: string;
  activity: string;
}

interface IAvatar {
  avatarurl?: string;
}

interface ICompanionsPatients {
  PatientId?: number;
}

interface ICompanion extends ICompanionsPatients, IAddress, IStatus, IAvatar {
  id?: number;
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

class CompanionsService {
  async registerCompanion(Companion: ICompanion) {
    try {
      const Status = await StatusModel.create({
        status: Companion.status,
        activity: "Novo Cadastro",
        createdAt: new Date(),
        updatedAt: new Date(),
      }).then((result) => {
        return { id: result.id };
      });

      const Address = await AddressModel.create({
        county: Companion.county,
        street: Companion.street,
        district: Companion.district,
        state: Companion.state,
      }).then((result) => {
        return { id: result.id };
      });

      const Avatar = await AvatarModel.create({
        url: Companion.avatarurl,
      }).then((result) => {
        return { id: result.id };
      });

      const Residents = await ResidentsModel.create({
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
        StatusId: Status.id,
        AvatareId: Avatar.id,
        AddressId: Address.id,
      }).then((result) => {
        return { id: result.id };
      });

      const Companions = await CompanionsModel.create({
        ResidentId: Residents.id,
      }).then((result) => {
        return { id: result.id };
      });

      await PatientsCompanionsModel.create({
        kinship: Companion.kinship,
        PatientId: Companion.PatientId,
        CompanionId: Companions.id,
      });
    } catch (err) {
      return err;
    }
  }

  async associateCompanionPatient(Companion: ICompanion) {
    try {
      await PatientsCompanionsModel.create({
        kinship: Companion.kinship,
        PatientId: Companion.PatientId,
        CompanionId: Companion.id,
      });
    } catch (err) {
      return err;
    }
  }

  async listAllCompanions() {
    const Companions = await CompanionsModel.findAll({
      limit: 40,

      include: [{ all: true, nested: true }],
    });

    return Companions;
  }

  async getCompanionsById(Companion: ICompanion) {
    const Companions = await CompanionsModel.findOne({
      include: [
        {
          model: ResidentsModel,
          include: [AddressModel, AvatarModel, StatusModel],
          where: {
            id: Companion.id,
          },
        },
      ],
    });
    return Companions;
  }

  async searchCompanionByNameOrCPF(Companion: ICompanion) {
    const Companions = await CompanionsModel.findAll({
      /*
      where: {
        [Op.or]: [
          { fullname: { [Op.like]: Companion.fullname + "%" } },
          { cpf: { [Op.like]: Companion.cpf + "%" } },
        ],
      },
      */
      include: [{ all: true, nested: true }],
    });

    return Companions;
  }

  async listByCompanionFilter(Companion: ICompanion) {
    const Companions = await CompanionsModel.findAll({
      include: [
        {
          model: ResidentsModel,
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
      /*
      where: {
        // { religion: Patient.religion },
        schooling: { [Op.like]: "%" + Companion.schooling + "%" },
        // { profession: Patient.profession },
        // { age: Patient.age },
        gender: { [Op.like]: "%" + Companion.gender + "%" },
      },
      */
    });

    return Companions;
  }

  async findCompanionAssocitedPatient(Companion: ICompanion) {
    const Companions = await PatientsCompanionsModel.findAll({
      where: {
        PatientId: Companion.PatientId,
      },
    });

    return Companions;
  }

  async removeCompanionAssocitedPatient(Companion: ICompanion) {
    const CompanionsDestroy = await PatientsCompanionsModel.destroy({
      where: {
        [Op.and]: [
          { CompanionId: Companion.id },
          { PatientId: Companion.PatientId },
        ],
      },
    });

    return CompanionsDestroy;
  }

  async updateCompanion(Companion: ICompanion) {
    await StatusModel.update(
      {
        status: Companion.status,
        activity: "Dados Atualizados",
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

    await ResidentsModel.update(
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
export default new CompanionsService();
