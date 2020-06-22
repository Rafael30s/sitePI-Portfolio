const express = require("express");
const server = express();
let idTest;
let nomeTest;
let usernameTest;
let emailTest;
let logado = false;

// pegar o banco de dados
const db = require("./database/db");

// configurar pasta publica
server.use(express.static("public"));

// criando cookie

// let idUser = document.cookie = '';

// ejs

// utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/pages", {
    express: server,
    noCache: true
});

// habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }));

server.get("/", (req, res) => {
    return res.render("index.html",{ logado: logado, id: idTest,nome: nomeTest,username: usernameTest, email: emailTest});
});

server.get("/cadastrar", (req, res) => {

    console.log(req.query);
    return res.render("cadastro.html");
});

server.post("/cadastrar", (req, res) => {

    console.log(req.body);
    let validar_senha = (req.body.senha == req.body.confirmaSenha);
    
    if (validar_senha) {
        const query = `
        INSERT INTO User (
            nome, 
            username,
            email,
            senha
        ) VALUES (?,?,?,?);
    `;

        const values = [
            req.body.nome,
            req.body.username,
            req.body.email,
            req.body.senha
        ]

        function afterInsertData(err) {
            if (err) {
                return console.log(err);
            }

            console.log("Cadastrado com sucesso");
            console.log(this);
        }
        db.run(query, values, afterInsertData);

        return res.render("cadastro.html", {saved:true});
    }
    else {
        return console.log('Erro');
    }
});

server.get("/login", (req, res) => {
    // let idUser = document.cookie = 'teste';

    // console.log(idUser);

    return res.render("login.html");
});

server.post("/login", (req, res) => {
    // let idUser = document.cookie = 'teste';

    // console.log(idUser);
    console.log(req.body);
   
    let username = req.body.username; // depois de .body, use o nome (name) do campo em seu formulário de username
	let senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de username	
	
    const instrucaoSql = `select * from user where username='${username}' and senha='${senha}'`;
    
    console.log(instrucaoSql);
    

    db.get(instrucaoSql, (err,row)=>{
       
        if(row == undefined){
            return res.render("login.html",{erro: true});
        } else{
            console.log(row.idUser);
            idTest = row.idUser;
            console.log(idTest);
            nomeTest = row.nome;
            usernameTest = row.username;
            emailTest = row.email;
            logado = true
        return res.render("index.html", {logado: logado, id: idTest,nome: nomeTest,username: usernameTest, email: emailTest});
        }
        // idTest=row[0].idUser;
    });

 
});

server.get("/perfil", (req, res) => {
if(logado){    console.log('pato');
   console.log(idTest);
    db.all(`SELECT * FROM story WHERE fkUser = '${idTest}'`, function (err, rows) {
        if (err) {
            return console.log(err);
        }
        console.log('pato');
        console.log(rows);
        const total = rows.length;
        // mostrar a página html com os dados do banco
        console.log(total)
        return res.render("perfil.html", {logado: logado, users: rows, total, nome: nomeTest,username: usernameTest, email: emailTest});
    });} else{
        return res.render("index.html");
    }
});

server.get("/todas", (req, res) => {
    console.log(idTest);
     db.all(`SELECT * FROM story, user where idUser=fkUser`, function (err, rows) {
         if (err) {
             return console.log(err);
         }
         console.log(rows);
         const total = rows.length;
         // mostrar a página html com os dados do banco
         console.log(total)
         return res.render("todasHistorias.html", {users: rows, logado: logado, id: idTest,nome: nomeTest,username: usernameTest, email: emailTest});
     });
 });

server.get("/exemploTexto", (req, res) => {
    return res.render("infancia.html",{logado: logado, id: idTest,nome: nomeTest,username: usernameTest, email: emailTest});
});

server.get("/cadastrarHistoria", (req, res) => {
    return res.render("cadastroHistoria.html",{ logado: logado, id: idTest,nome: nomeTest,username: usernameTest, email: emailTest});
});

server.post("/cadastrarHistoria", (req, res) => {

 if(logado){  console.log(req.body);
    
    let img = parseInt(Math.random() *3+1);
    
        const query = `
        INSERT INTO Story (
            titulo, 
            descrição,
            historia,
            image,
            fkUser
        ) VALUES (?,?,?,?,?);
    `;

        const values = [
            req.body.titulo,
            req.body.desc,
            req.body.historia,
            img,
            idTest
        ]

        function afterInsertData(err) {
            if (err) {
                return console.log(err);
            }

            console.log("Cadastrado com sucesso");
            console.log(this);
        }
        db.run(query, values, afterInsertData);

        return res.render("cadastroHistoria.html", {saved:true, logado: logado, id: idTest,nome: nomeTest,username: usernameTest, email: emailTest});
    } else{
        return res.render("index.html");
    }

});

server.get("/historia", (req, res) => {
    return res.render("layoutHistoria.html");
});

server.get("/exemploVideo", (req, res) => {
    return res.render("mascara.html",{logado: logado, id: idTest,nome: nomeTest,username: usernameTest, email: emailTest});
});

server.get("/exemploQuadrinho", (req, res) => {
    return res.render("cla.html",{logado: logado, id: idTest,nome: nomeTest,username: usernameTest, email: emailTest});
});
server.get("/sair",(req,res)=>{
    logado=false;
    return res.render("index.html");
})

server.post("/alterar",(req,res)=>{
    console.log(idTest);
    let reNome = req.body.nome;
    let reUsername = req.body.username;
    let reEmail = req.body.email;

    db.run(`UPDATE user
    SET nome = '${reNome}', username = '${reUsername}', email = '${reEmail}'
    WHERE idUser=${idTest}`, function (err, rows) {
        if (err) {
            return console.log(err);
        }
        // console.log(rows);
        // nomeTest = rows.nome;
        // usernameTest = rows.username;
        // emailTest = rows.email;
        
        // mostrar a página html com os dados do banco
        console.log(total)
        return res.render("redirecionar.html",{users: rows, logado: logado, id: idTest,nome: nomeTest,username: usernameTest, email: emailTest})
    });
})
server.listen(3000);