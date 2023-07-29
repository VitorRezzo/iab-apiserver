import { Op } from "sequelize";
import { AddressModel } from "../models/AddressModel";
import { PatientModel } from "../models/PatientModel";
import { MedicalRecordModel } from "../models/MedicalRecordModel";
import { AvatarModel } from "../models/AvatarModel";
import { StatusModel } from "../models/StatusModel";

interface IMedicalRecord {
  pathology: string;
  biopsyresult: string;
  clinicalstate: string;
  directedhospital: string;
  socialworker: string;
  medicalname: string;
  treatmenttype: string;
  medicalphone: string;
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
}

interface IAvatar {
  avatarurl?: string;
}

interface IPatient extends IAddress, IMedicalRecord, IStatus, IAvatar {
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
  bloodtype: string;
  gender: string;
  religion: string;
  contact: string;
  registerdate: string;
  AddressId?: number;
  AvatarId?: number;
  MedicalRecordId?: string;
}

class PatientService {
  async registerPatients(Patient: IPatient) {
    const Status = await StatusModel.create({
      status: Patient.status,
    });
    const Addresses = await AddressModel.create({
      county: Patient.county,
      street: Patient.street,
      district: Patient.district,
      state: Patient.state,
    });
    const Avatares = await AvatarModel.create({
      url: Patient.avatarurl,
    });
    const MedicalRecords = await MedicalRecordModel.create({
      pathology: Patient.pathology,
      biopsyresult: Patient.biopsyresult,
      directedhospital: Patient.directedhospital,
      socialworker: Patient.socialworker,
      medicalname: Patient.medicalname,
      treatmenttype: Patient.treatmenttype,
      clinicalstate: Patient.clinicalstate,
      medicalphone: Patient.medicalphone,
    });
    await PatientModel.create({
      fullname: Patient.fullname,
      cpf: Patient.cpf,
      birthdate: Patient.birthdate,
      age: Patient.age,
      profession: Patient.profession,
      wage: Patient.wage,
      schooling: Patient.schooling,
      addiction: Patient.addiction,
      formsunion: Patient.formsunion,
      civilstatus: Patient.civilstatus,
      bloodtype: Patient.bloodtype,
      gender: Patient.gender,
      contact: Patient.contact,
      religion: Patient.religion,
      registerdate: Patient.registerdate,
      AddressId: Addresses.id,
      StatusId: Status.id,
      MedicalRecordId: MedicalRecords.id,
      AvatarId: Avatares.id,
    });
  }

  async getPatientsById(Patient: IPatient) {
    const Patients = await PatientModel.findByPk(Patient.id, {
      include: [{ all: true, nested: true }],
    });

    return Patients;
  }

  async searchPatientByNameOrCPF(Patient: IPatient) {
    const Patients = await PatientModel.findAll({
      limit: 10,
      where: {
        [Op.or]: [
          { fullname: { [Op.like]: Patient.fullname + "%" } },
          { cpf: { [Op.like]: Patient.cpf + "%" } },
        ],
      },
      include: [{ all: true, nested: true }],
    });

    return Patients;
  }

  async filterPatients(Patient: IPatient) {
    const Patients = await PatientModel.findAll({
      include: [
        {
          model: AddressModel,
          where: {
            county: { [Op.like]: "%" + Patient.county + "%" },
            state: { [Op.like]: "%" + Patient.state + "%" },
          },
        },
        {
          model: MedicalRecordModel,
          where: {
            pathology: { [Op.like]: "%" + Patient.pathology + "%" },
            directedhospital: {
              [Op.like]: "%" + Patient.directedhospital + "%",
            },
          },
        },
        { all: true, nested: true },
      ],

      where: {
        // { religion: Patient.religion },
        schooling: { [Op.like]: "%" + Patient.schooling + "%" },
        // { profession: Patient.profession },
        // { age: Patient.age },
        gender: { [Op.like]: "%" + Patient.gender + "%" },
      },
    });

    return Patients;
  }

  async listAllPatients() {
    const Patients = await PatientModel.findAll({
      limit: 40,
      include: [{ all: true, nested: true }],
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
    await MedicalRecordModel.update(
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
    await PatientModel.update(
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
        contact: Patient.contact,
        religion: Patient.religion,
        status: Patient.status,
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

export default new PatientService();
