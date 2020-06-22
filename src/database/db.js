// importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

// Criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db;
// utilizar o objeto de banco de dados, para nossas operações
db.serialize(() => {
    // com comandos SQL vou:

    //1. criar uma tabela 
    //
    // db.run(`

    //     CREATE TABLE IF NOT EXISTS User(
    //         idUser INTEGER PRIMARY KEY AUTOINCREMENT,
    //         nome varchar(100),
    //         username varchar(30),
    //         email varchar(150),
    //         senha varchar(30));
            

    // `)
    // CREATE TABLE IF NOT EXISTS  Story(
    //     idStory INTEGER PRIMARY KEY AUTOINCREMENT,
    //     titulo varchar(100),
    //     descrição tinytext,
    //     historia text,
    //     image varchar(150),
    //     fkUser int,
    //     foreign key(fkUser) references User(idUser)
    //     );
//     //2. Inserir dados na tabela
    // const query = `
    //     INSERT INTO User (
    //         nome, 
    //         username,
    //         email,
    //         senha
    //     ) VALUES (?,?,?,?);
    // `;

    // const values = [
    //     "Rafael dos Santos",
    //     "Rafael30s",
    //     "rafael30s@hotmail.com.br",
    //     "12345"
    // ]

    // function afterInsertData(err) {
    //     if (err) {
    //         return console.log(err);
    //     }

    //     console.log("Cadastrado com sucesso");
    //     console.log(this);
    // }
    // db.run(query, values, afterInsertData);

   

//     // //3. consultar os dados da tabela
    // db.all(`SELECT * FROM user`, function (err, rows) {
    //     if (err) {
    //         return console.log(err);
    //     }

    //     console.log("Aqui estão seus registros");
    //     console.log(rows);
    // })

//     // //4. Deletar um dado da tabela
    // db.run(`DELETE FROM user WHERE idUser = ?`, [10], function (err) {
    //     if (err) {
    //         return console.log(err)
    //     }

    //     console.log("Registro deletado com sucesso");
    // })


 })