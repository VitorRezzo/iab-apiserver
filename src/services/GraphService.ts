import { CompanionModel } from "../models/CompanionModel";
import { PatientModel } from "../models/PatientModel";
import { AddressModel } from "../models/AddressModel";
import { MedicalRecordModel } from "../models/MedicalRecordModel";
import { StatusModel } from "../models/StatusModel";
import { Op } from "sequelize";
import moment from "moment";
interface IGraph {
  type: string;
  startdate?: string;
  enddate?: string;
}

class GraphService {
  async filterGraphByType(typegraph: IGraph) {
    const filterPatientsAddress = async () => {
      const countAddress = [];

      const Addresses = await PatientModel.findAll({
        attributes: ["AddressId"],
        where: {
          [Op.or]: [
            {
              registerdate: {
                [Op.between]: [
                  moment(typegraph.startdate).format("YYYY-MM-DD"),
                  moment(typegraph.enddate).format("YYYY-MM-DD"),
                ],
              },
            },
            { registerdate: moment(typegraph.startdate).format("YYYY-MM-DD") },
          ],
        },
        include: [
          {
            attributes: ["county"],
            model: AddressModel,
          },
        ],
      });
      const County = Addresses.map((value: any) => {
        return value.Address.dataValues.county;
      });

      const filterAddress = County.filter((valor: string, indice: number) => {
        return County.indexOf(valor) === indice;
      });

      for (let i = 0; i < filterAddress.length; i++) {
        countAddress[i] = await PatientModel.count({
          include: [
            {
              attributes: ["county"],
              model: AddressModel,
              where: {
                county: filterAddress[i],
              },
            },
          ],
        });
      }

      return { amount: countAddress, model: filterAddress };
    };

    const filterEscortsAddress = async () => {
      const countAddress = [];
      const Addresses = await CompanionModel.findAll({
        attributes: ["AddressId"],
        where: {
          [Op.or]: [
            {
              registerdate: {
                [Op.between]: [
                  moment(typegraph.startdate).format("YYYY-MM-DD"),
                  moment(typegraph.enddate).format("YYYY-MM-DD"),
                ],
              },
            },
            { registerdate: moment(typegraph.startdate).format("YYYY-MM-DD") },
          ],
        },
        include: [
          {
            attributes: ["county"],
            model: AddressModel,
          },
        ],
      });

      const County = Addresses.map((value: any) => {
        return value.Address.dataValues.county;
      });

      const filterAddress = County.filter((valor: string, indice: number) => {
        return County.indexOf(valor) === indice;
      });

      for (let i = 0; i < filterAddress.length; i++) {
        countAddress[i] = await CompanionModel.count({
          include: [
            {
              attributes: ["county"],
              model: AddressModel,
              where: {
                county: filterAddress[i],
              },
            },
          ],
        });
      }

      return { amount: countAddress, model: filterAddress };
    };

    const filterResidentsAddress = async () => {
      const countAddress = [];

      const Addresses = await PatientModel.findAll({
        where: {
          [Op.or]: [
            {
              registerdate: {
                [Op.between]: [
                  moment(typegraph.startdate).format("YYYY-MM-DD"),
                  moment(typegraph.enddate).format("YYYY-MM-DD"),
                ],
              },
            },
            { registerdate: moment(typegraph.startdate).format("YYYY-MM-DD") },
          ],
        },
        include: [{ all: true, nested: true }],
      });

      const CountyP = Addresses.map((value: any) => {
        return value.Address.county;
      });
      const CountyEsc = Addresses.map((value: any) => {
        return value.Escorts[0].dataValues.Address.county;
      });

      const filterAddressP = CountyP.filter((valor: string, indice: number) => {
        return CountyP.indexOf(valor) === indice;
      });

      const filterAddressEsc = CountyEsc.filter(
        (valor: string, indice: number) => {
          return CountyEsc.indexOf(valor) === indice;
        }
      );

      const AllAddress = filterAddressP.concat(filterAddressEsc);

      const filterAllAddress = AllAddress.filter(
        (valor: string, indice: number) => {
          return AllAddress.indexOf(valor) === indice;
        }
      );

      for (let i = 0; i < filterAllAddress.length; i++) {
        countAddress[i] = await AddressModel.count({
          attributes: ["county"],

          where: {
            county: filterAllAddress[i],
          },
        });
      }
      return { amount: countAddress, model: filterAllAddress };
    };

    const filterPathology = async () => {
      const CountallPathology = [];

      const allPathology = await PatientModel.findAll({
        include: {
          model: MedicalRecordModel,
          attributes: ["pathology"],
        },
        where: {
          [Op.or]: [
            {
              registerdate: {
                [Op.between]: [
                  moment(typegraph.startdate).format("YYYY-MM-DD"),
                  moment(typegraph.enddate).format("YYYY-MM-DD"),
                ],
              },
            },
            { registerdate: moment(typegraph.startdate).format("YYYY-MM-DD") },
          ],
        },
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
      return { amount: CountallPathology, model: typePathologys };
    };
    const filterPatientsGender = async () => {
      const GenderM = await PatientModel.count({
        where: {
          [Op.and]: [
            {
              [Op.or]: [
                {
                  registerdate: {
                    [Op.between]: [
                      moment(typegraph.startdate).format("YYYY-MM-DD"),
                      moment(typegraph.enddate).format("YYYY-MM-DD"),
                    ],
                  },
                },
                {
                  registerdate: moment(typegraph.startdate).format(
                    "YYYY-MM-DD"
                  ),
                },
              ],
            },
            { gender: "Masculino" },
          ],
        },
      });
      const GenderF = await PatientModel.count({
        where: {
          [Op.and]: [
            {
              [Op.or]: [
                {
                  registerdate: {
                    [Op.between]: [
                      moment(typegraph.startdate).format("YYYY-MM-DD"),
                      moment(typegraph.enddate).format("YYYY-MM-DD"),
                    ],
                  },
                },
                {
                  registerdate: moment(typegraph.startdate).format(
                    "YYYY-MM-DD"
                  ),
                },
              ],
            },
            { gender: "Feminino" },
          ],
        },
      });

      return {
        amount: [GenderM, GenderF],
        model: ["Masculino", "Feminino"],
      };
    };

    const filterEscortsGender = async () => {
      const GenderM = await CompanionModel.count({
        where: {
          [Op.and]: [
            {
              [Op.or]: [
                {
                  registerdate: {
                    [Op.between]: [
                      moment(typegraph.startdate).format("YYYY-MM-DD"),
                      moment(typegraph.enddate).format("YYYY-MM-DD"),
                    ],
                  },
                },
                {
                  registerdate: moment(typegraph.startdate).format(
                    "YYYY-MM-DD"
                  ),
                },
              ],
            },
            { gender: "Masculino" },
          ],
        },
      });
      const GenderF = await CompanionModel.count({
        where: {
          [Op.and]: [
            {
              [Op.or]: [
                {
                  registerdate: {
                    [Op.between]: [typegraph.startdate, typegraph.enddate],
                  },
                },
                { registerdate: typegraph.startdate },
              ],
            },
            { gender: "Feminino" },
          ],
        },
      });

      return {
        amount: [GenderM, GenderF],
        model: ["Masculino", "Feminino"],
      };
    };

    const filterResidentsGender = async () => {
      const GenderME = await CompanionModel.count({
        where: {
          [Op.and]: [
            {
              [Op.or]: [
                {
                  registerdate: {
                    [Op.between]: [typegraph.startdate, typegraph.enddate],
                  },
                },
                { registerdate: typegraph.startdate },
              ],
            },
            { gender: "Masculino" },
          ],
        },
      });
      const GenderFE = await CompanionModel.count({
        where: {
          [Op.and]: [
            {
              [Op.or]: [
                {
                  registerdate: {
                    [Op.between]: [typegraph.startdate, typegraph.enddate],
                  },
                },
                { registerdate: typegraph.startdate },
              ],
            },
            { gender: "Feminino" },
          ],
        },
      });
      const GenderMP = await PatientModel.count({
        where: {
          [Op.and]: [
            {
              [Op.or]: [
                {
                  registerdate: {
                    [Op.between]: [typegraph.startdate, typegraph.enddate],
                  },
                },
                { registerdate: typegraph.startdate },
              ],
            },
            { gender: "Masculino" },
          ],
        },
      });
      const GenderFP = await PatientModel.count({
        where: {
          [Op.and]: [
            {
              [Op.or]: [
                {
                  registerdate: {
                    [Op.between]: [typegraph.startdate, typegraph.enddate],
                  },
                },
                { registerdate: typegraph.startdate },
              ],
            },
            { gender: "Feminino" },
          ],
        },
      });
      return {
        amount: [GenderME + GenderMP, GenderFE + GenderFP],
        model: ["Masculino", "Feminino"],
      };
    };

    const filterGenderPatientsDeath = async () => {
      const GenderM = await PatientModel.count({
        include: [
          {
            model: StatusModel,
            where: {
              updatedAt: {
                [Op.gte]: moment(typegraph.startdate).format("YYYY-MM-DD"),
              },
              status: "Óbito",
            },
          },
        ],
        where: {
          gender: "Masculino",
        },
      });

      const GenderF = await PatientModel.count({
        include: [
          {
            model: StatusModel,
            where: {
              updatedAt: {
                [Op.gte]: moment(typegraph.startdate).format("YYYY-MM-DD"),
              },
              status: "Óbito",
            },
          },
        ],

        where: {
          gender: "Femenino",
        },
      });

      return {
        amount: [GenderM, GenderF],
        model: ["Masculino", "Femenino"],
      };
    };
    const filterAddressPatientsDeath = async () => {
      const countAddress = [];

      const Addresses = await PatientModel.findAll({
        attributes: ["AddressId"],
        where: {
          [Op.or]: [
            {
              registerdate: {
                [Op.between]: [
                  moment(typegraph.startdate).format("YYYY-MM-DD"),
                  moment(typegraph.enddate).format("YYYY-MM-DD"),
                ],
              },
            },
            { registerdate: moment(typegraph.startdate).format("YYYY-MM-DD") },
          ],
        },
        include: [
          {
            attributes: ["county"],
            model: AddressModel,
          },
        ],
      });
      const County = Addresses.map((value: any) => {
        return value.Address.dataValues.county;
      });

      const filterAddress = County.filter((valor: string, indice: number) => {
        return County.indexOf(valor) === indice;
      });

      for (let i = 0; i < filterAddress.length; i++) {
        countAddress[i] = await PatientModel.count({
          include: [
            {
              model: StatusModel,
              where: {
                [Op.and]: {
                  updatedAt: {
                    [Op.gte]: moment(typegraph.startdate).format("YYYY-MM-DD"),
                  },
                  status: "Óbito",
                },
              },
            },
            {
              attributes: ["county"],
              model: AddressModel,
              where: {
                county: filterAddress[i],
              },
            },
          ],
        });
      }

      return { amount: countAddress, model: filterAddress };
    };

    switch (typegraph.type) {
      case "Paciente Por Municipio":
        return filterPatientsAddress();
      case "Paciente Por Patologia":
        return filterPathology();
      case "Paciente Por Gênero":
        return filterPatientsGender();
      case "Acompanhantes Por Municipio":
        return filterEscortsAddress();
      case "Acompanhantes Por Gênero":
        return filterEscortsGender();
      case "Moradores Por Municipio":
        return filterResidentsAddress();
      case "Moradores Por Gênero":
        return filterResidentsGender();
      case "Óbitos Por Gênero":
        return filterGenderPatientsDeath();
      case "Óbitos Por Municipio":
        return filterAddressPatientsDeath();
      default:
        return { message: "nenhuma opção" };
    }
  }
}

export default new GraphService();
