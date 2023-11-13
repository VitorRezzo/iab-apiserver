// import { Socket } from "socket.io";
// import { PatientModel } from "../../models/PatientModel";
// import { CompanionModel } from "../../models/CompanionModel";

// const obserserAllPatient = (socket: Socket) => {
//   PatientModel.beforeBulkCreate(async () => {
//     const allPatients = await PatientModel.count();
//     socket.emit("obserser-AllPatients", allPatients);
//   });
// };

// const obserserAllCompanions = (socket: Socket) => {
//   CompanionModel.beforeBulkCreate(async () => {
//     const allCompanions = await CompanionModel.count();
//     socket.emit("obserser-AllCompanions", allCompanions);
//   });
// };

// export { obserserAllPatient, obserserAllCompanions };
