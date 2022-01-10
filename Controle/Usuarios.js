import {openDb} from "../config/BDSqlite.js";


export async function InsertUsuario(req,res){
    let  nome = req.body.nome;
    let  senha = req.body.senha;   
    openDb().then( (db)=>{
         db.run('INSERT INTO Usuario (nome,senha) VALUES(?,?)',[nome,senha])          
    }).catch((error)=>console.log(error.res.data))
    res.json({
        "statusCode":200
      })  
}

export async function SelectAllUsuario(req,res){
    openDb().then( (db)=>{
         db.all('SELECT * FROM Usuario',)
    }).catch((error)=>console.log(error.res.data))
    res.json({
        "statusCode":200
      })     
}


export async function SelectUsuario(req,res){
    let  nome = req.body.nome;   
    openDb().then( (db)=>{
         db.get('SELECT * FROM Usuario WHERE nome="?"',[nome])         
    }).catch((error)=>console.log(error.res.data))
    res.json({
        "statusCode":200
      })  
}



export async function DeleteUsuario(req,res){
    let  id = req.body.id;   
    openDb().then( (db)=>{
         db.get('DELETE FROM Usuario WHERE id="?"',[id])
    }).catch((error)=>console.log(error.res.data))
    res.json({
        "statusCode":200
      }) 
}


export async function UpdateUsuario(req,res){
    let id = req.body.id;
    let  nome = req.body.nome;
    let  senha = req.body.senha;

    if(req.body && !req.body.id){
        res.json({
          "statusCode":400,
          "msg":"falha na atualização id não existe"
        })
      } 
    openDb().then( (db)=>{
         db.run('UPDATE Usuario SET usuario=? ,senha=? WHERE id=?',[id,nome,senha])
         res.json({
            "statusCode":200
          })   
    }).catch((error)=>console.log(error.res.data))
}
