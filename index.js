const express = require("express");

const app = express();
const PORT = 8080;

// Carrega o banco de dados
const db = require("./db");
db(app);

// Carrega os middlewares da nossa aplicação
const middlewares = require("./lib/middleware");
middlewares(app);

// Inicia as rotas da minha aplicação
const routes = require("./routes")
routes(app);

// Inicia o servidor de banco de dados e HTTP (8080)
app.db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("My Portfolio backend running - port " + PORT);
    });
});