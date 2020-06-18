const express = require("express");
const server = express();

// pegar o banco de dados
const db = require("./database/db");

// configurar pasta publica
server.use(express.static("public"));

// criando cookie

// let idUser = document.cookie = '';

// habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }));

// utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/pages", {
    express: server,
    noCache: true
});
server.get("/", (req, res) => {
    return res.render("index.html");
});

server.get("/cadastrar", (req, res) => {

    console.log(req.query);
    return res.render("cadastro.html");
});

server.post("/cadastrar", (req, res) => {

    console.log(req.body);
    let validar_senha = (req.body.senha = req.body.confirmaSenha);
    
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
        alert('Falha na confirmação de senha');
    }
});

server.get("/login", (req, res) => {
    // let idUser = document.cookie = 'teste';

    // console.log(idUser);

    return res.render("login.html");
});

server.get("/perfil", (req, res) => {
    return res.render("perfil.html");
});

server.get("/exemploTexto", (req, res) => {
    return res.render("infancia.html");
});

server.get("/cadastrarHistoria", (req, res) => {
    return res.render("cadastroHistoria.html");
});

server.get("/historia", (req, res) => {
    return res.render("layoutHistoria.html");
});

server.get("/exemploVideo", (req, res) => {
    return res.render("mascara.html");
});

server.get("/exemploQuadrinho", (req, res) => {
    return res.render("cla.html");
});
server.listen(3000);