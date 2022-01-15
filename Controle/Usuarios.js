
import {openDb} from "../config/BDSqlite.js";
import {Token} from "../config/GeradorToken.js";

var nomeUsuario;
var senhaUsuario;

//Pegar nome e senha  do front end
export async function DataUsuario(req,res){
  nomeUsuario = req.body.nome;  
  senhaUsuario = req.body.senha; 
  

}

export async function LoginUsuario(req,res){
  
  await openDb().then( (db)=>{
    db.get('SELECT * FROM Usuario WHERE nome=? AND senha=?',[nomeUsuario,senhaUsuario])
    .then(response=> {
      response.token =  Token(response.id);
      res.json( {auth:true,nome: response.nome, token:response.token} )
    }
      )
}).catch((error)=>res.send(error)) 
}


export async function AutenticaUser(req,res){
res.json({auth:true,message:"Usuario autenticado"})

}


export async function CadastraUsuario(req,res){
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
    }).catch((error)=>console.log(error))
    res.json({
        "statusCode":200
      })     
}


export async function SelectUsuario(req,res){
    let  nome = req.body.nome;   
    openDb().then( (db)=>{
         db.get('SELECT * FROM Usuario WHERE nome=?',[nome])         
    }).catch((error)=>console.log(error))
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

export async function AtualizaUsuario(req,res){
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
