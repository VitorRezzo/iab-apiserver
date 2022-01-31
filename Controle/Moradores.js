import {openDb} from "../config/BDSqlite.js";

export async function CadastraMoradores(req,res){
    let  nomecompleto = req.body.nomecompleto;
    let  cpf = req.body.cpf;
    let  rg = req.body.rg; 
    let nascimento = req.body.nascimento;
    let cidade = req.body.cidade;
    let endereco = req.body.endereco;
    let contato = req.body.contato;
    let acompanhante = req.body.acompanhante;
    let quarto = req.body.quarto;

    openDb().then( (db)=>{
         db.run('INSERT INTO Morador (nomecompleto,cpf,rg,nascimento,cidade,endereco,contato,acompanhante,quarto) VALUES(?,?,?,?,?,?,?,?,?)'
         ,[nomecompleto,
           cpf,
           rg,
           nascimento,
           cidade,
           endereco,
           contato,
           acompanhante,
           quarto
        ])          
    }).catch((error)=>console.log(error.res.data))
    res.json({
        "statusCode":200
      })  
}