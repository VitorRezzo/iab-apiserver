import { Op } from "sequelize";
import { MovementModel } from "../models/MovementModel";
import { MovementsCompanion } from "../models/MovementsCompanion";
import { StatusModel } from "../models/StatusModel";

interface IMovement {
  id?: number;
  origin: string;
  destiny: string;
  price: string;
  date: string;
  hour: string;
  transport: string;
  procedure: string;
  idPatient: number;
  idStatus: number;
  idCompanion: Array<{ id: string }>;
  startdate: string;
  enddate?: string;
}

class MovementService {
  async registerMovements(move: IMovement) {
    const moves = await MovementModel.create({
      origin: move.origin,
      destiny: move.destiny,
      price: move.price,
      transport: move.transport,
      procedure: move.procedure,
      date: move.date,
      hour: move.hour,
      PatientId: move.idPatient,
    });

    move.idCompanion.map(async (Companion) => {
      await MovementsCompanion.create({
        MovementId: moves.id,
        CompanionId: Companion.id,
      });
      await StatusModel.update(
        {
          status:
            move.procedure === "Internação"
              ? "Internado"
              : move.procedure === "Viagem"
              ? move.procedure
              : "Na Casa",
          activity: move.procedure,
        },
        {
          where: {
            id: move.idStatus,
          },
        }
      );
    });
    return moves;
  }

  async listAllMovementsPatients(move: IMovement) {
    const moves = await MovementModel.findAll({
      limit: 5,
      order: [["hour", "ASC"]],
      where: {
        [Op.and]: [
          { date: { [Op.between]: [move.date, "2800-01-10"] } },
          { PatientId: move.idPatient },
        ],
      },
    });
    return moves;
  }

  async listAllMovements(move: IMovement) {
    const moves = await MovementModel.findAll({
      where: {
        createdAt: { [Op.gt]: move.date },
      },
      order: [["id", "DESC"]],
      include: [{ all: true, nested: true }],
    });
    return moves;
  }

  async listMovementsBetewenDate(move: IMovement) {
    const moves = await MovementModel.findAll({
      where: {
        [Op.or]: [
          { date: { [Op.between]: [move.startdate, move.enddate] } },
          { date: move.startdate },
        ],
      },

      include: [{ all: true, nested: true }],
    });
    return moves;
  }

  async getMovementsById(move: IMovement) {
    const moves = await MovementModel.findByPk(move.id, {
      include: [{ all: true, nested: true }],
    });
    return moves;
  }

  async updateMovement(move: IMovement) {
    await MovementModel.update(
      {
        origin: move.origin,
        destiny: move.destiny,
        price: move.price,
        transport: move.transport,
        procedure: move.procedure,
        date: move.date,
        hour: move.hour,
        PatientId: move.idPatient,
      },
      {
        where: {
          id: move.id,
        },
      }
    );
  }

  async deleteMovement(idmove: string) {
    await MovementModel.destroy({
      where: {
        id: idmove,
      },
    });

    await MovementsCompanion.destroy({
      where: {
        MovementId: idmove,
      },
    });
  }
}
export default new MovementService();
