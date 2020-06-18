const express = require("express");
const server = express();

// configurar pasta publica
server.use(express.static("public"));

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
    return res.render("cadastro.html");
});

server.get("/login", (req, res) => {
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

server.get("/exemploVideo", (req, res) => {
    return res.render("mascara.html");
});

server.get("/exemploQuadrinho", (req, res) => {
    return res.render("cla.html");
});
server.listen(3000);