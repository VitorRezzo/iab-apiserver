import sqlite3 from 'sqlite3'
import { open } from 'sqlite'


export async function openDb () {

  return open({
    filename: process.env.DB_LOCAL,
    driver: sqlite3.Database
  })

}


export function CreateTable(){

  async function CreateTableUsuario(){
    openDb().then((db)=>{
      db.exec('CREATE TABLE IF NOT EXISTS Usuario (id INTEGER PRIMARY KEY, nome TEXT ,senha TEXT,token TEXT ) ')    
    })
  }


  async function CreateTableProdutos(){
    openDb().then((db)=>{
      db.exec('CREATE TABLE IF NOT EXISTS Produtos (id INTEGER PRIMARY KEY, nome TEXT , marca TEXT, quantidade INTEGER) ')    
    })
  }




  return CreateTableUsuario(),CreateTableProdutos();

}



