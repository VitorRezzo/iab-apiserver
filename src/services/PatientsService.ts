import AddressModel from "../models/AddressModel";
import AvatarModel from "../models/AvatarModel";
import StatusModel from "../models/StatusModel";
import ResidentsModel from "../models/ResidentsModel";
import PatientsModel from "../models/PatientsModel";
import MedicalRecordsModel from "../models/MedicalRecordsModel";
import PatientsCompanionsModel from "../models/PatientsCompanionsModel";
import CompanionsModel from "../models/CompanionsModel";

import { Op } from "sequelize";

interface IMedicalRecordsModel {
  pathology: string;
  biopsyresult: string;
  clinicalstate: string;
  directedhospital: string;
  socialworker: string;
  medicalname: string;
  treatmenttype: string;
  medicalphone: string;
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

interface IPatient
  extends IAddress,
    IMedicalRecordsModel,
    IMedicinesModel,
    IStatus,
    IAvatar {
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
  religion: string;
  contact: string;
  registerdate: string;
  AddressId?: number;
  AvatarId?: number;
  MedicalRecordId?: string;
}

class PatientsService {
  async registerPatients(Patient: IPatient) {
    try {
      const Status = await StatusModel.create({
        status: Patient.status,
        activity: "Novo Cadastro",
        createdAt: new Date(),
        updatedAt: new Date(),
      }).then((result) => {
        return { id: result.id };
      });

      const Address = await AddressModel.create({
        county: Patient.county,
        street: Patient.street,
        district: Patient.district,
        state: Patient.state,
      }).then((result) => {
        return { id: result.id };
      });

      const Avatar = await AvatarModel.create({
        url: Patient.avatarurl,
      }).then((result) => {
        return { id: result.id };
      });

      const MedicalRecords = await MedicalRecordsModel.create({
        pathology: Patient.pathology,
        biopsyresult: Patient.biopsyresult,
        directedhospital: Patient.directedhospital,
        socialworker: Patient.socialworker,
        medicalname: Patient.medicalname,
        treatmenttype: Patient.treatmenttype,
        clinicalstate: Patient.clinicalstate,
        medicalphone: Patient.medicalphone,
      }).then((result) => {
        return { id: result.id };
      });

      const Residents = await ResidentsModel.create({
        fullname: Patient.fullname,
        cpf: Patient.cpf,
        birthdate: Patient.birthdate,
        age: Patient.age,
        profession: Patient.profession,
        wage: Patient.wage,
        schooling: Patient.schooling,
        addiction: Patient.addiction,
        bloodtype: Patient.bloodtype,
        gender: Patient.gender,
        religion: Patient.religion,
        civilstatus: Patient.civilstatus,
        formsunion: Patient.formsunion,
        contact: Patient.contact,
        registerdate: Patient.registerdate,
        StatusId: Status.id,
        AvatareId: Avatar.id,
        AddressId: Address.id,
      }).then((result) => {
        return { id: result.id };
      });

      await PatientsModel.create({
        ResidentId: Residents.id,
        MedicalRecordId: MedicalRecords.id,
      });
    } catch (error) {
      return error;
    }
  }

  async listAllPatients() {
    const Patients = await PatientsModel.findAll({
      include: [
        { all: true, nested: true },
        {
          model: PatientsCompanionsModel,
          include: [{ model: CompanionsModel, include: [ResidentsModel] }],
        },
      ],
    });

    return Patients;
  }

  async getPatientsById(Patient: IPatient) {
    const Patients = await PatientsModel.findOne({
      include: [
        { all: true, nested: true },
        {
          model: ResidentsModel,
          include: [AddressModel, AvatarModel, StatusModel],
          where: {
            id: Patient.id,
          },
        },
      ],
    });

    return Patients;
  }

  async searchPatientByNameOrCPF(Patient: IPatient) {
    const Patients = await PatientsModel.findAll({
      include: {
        model: ResidentsModel,

        where: {
          cpf: Patient.cpf,
        },
      },
    });

    return Patients;
  }

  async listByPatientFilter(Patient: IPatient) {
    const Patients = await PatientsModel.findAll({
      include: [
        {
          model: AddressModel,
          where: {
            county: { [Op.like]: "%" + Patient.county + "%" },
            state: { [Op.like]: "%" + Patient.state + "%" },
          },
        },
        {
          model: MedicalRecordsModel,
          where: {
            pathology: { [Op.like]: "%" + Patient.pathology + "%" },
            directedhospital: {
              [Op.like]: "%" + Patient.directedhospital + "%",
            },
          },
        },
        { all: true, nested: true },
      ],

      /*
      where: {
        // { religion: Patient.religion },
        //schooling: { [Op.like]: "%" + Patient.schooling + "%" },
        // { profession: Patient.profession },
        // { age: Patient.age },
       // gender: { [Op.like]: "%" + Patient.gender + "%" },
      },
      */
    });

    return Patients;
  }

  async updatePatients(Patient: IPatient) {
    await AddressModel.update(
      {
        county: Patient.county,
        street: Patient.street,
        district: Patient.district,
        state: Patient.state,
      },
      {
        where: {
          id: Patient.AddressId,
        },
      }
    );
    await StatusModel.update(
      {
        status: Patient.status,
        activity: "Dados Atualizados",
      },

      {
        where: {
          id: Patient.StatusId,
        },
      }
    );

    await AvatarModel.update(
      {
        url: Patient.avatarurl,
      },
      {
        where: {
          id: Patient.AvatarId,
        },
      }
    );
    await MedicalRecordsModel.update(
      {
        pathology: Patient.pathology,
        biopsyresult: Patient.biopsyresult,
        directedhospital: Patient.directedhospital,
        socialworker: Patient.socialworker,
        medicalname: Patient.medicalname,
        treatmenttype: Patient.treatmenttype,
        clinicalstate: Patient.clinicalstate,
        medicalphone: Patient.medicalphone,
      },
      {
        where: {
          id: Patient.MedicalRecordId,
        },
      }
    );
    await ResidentsModel.update(
      {
        fullname: Patient.fullname,
        cpf: Patient.cpf,
        birthdate: Patient.birthdate,
        age: Patient.age,
        profession: Patient.profession,
        wage: Patient.wage,
        schooling: Patient.schooling,
        addiction: Patient.addiction,
        bloodtype: Patient.bloodtype,
        gender: Patient.gender,
        religion: Patient.religion,
        civilstatus: Patient.civilstatus,
        formsunion: Patient.formsunion,
        contact: Patient.contact,
        registerdate: Patient.registerdate,
      },
      {
        where: {
          id: Patient.id,
        },
      }
    );
  }
}

export default new PatientsService();
