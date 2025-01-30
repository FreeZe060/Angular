//npm install express-session express path ejs body-parser fs sharp mysql jsonwebtoken bcryptjs express-validator dotenv cors
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const path = require('path');
const session = require('express-session');
const routes = require('./config/routesPokemons');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

/*Encodage de l'url*/

const cors = require("cors");

app.use(cors());

app.options("*", cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
// }));
// app.use((req, res, next) => {
//     res.locals.logUser = req.session.logUser;
//     next();
// });
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ message: "Erreur interne du serveur" });
// });

// // Configuration de la base de données
// const dbManager = new DbManager();
// dbManager.connect();
// console.log(`Connecté à la base de données MySQL`);

// Autres configurations et middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/static', express.static(path.join(__dirname, 'static')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Utiliser l'API
app.use('/api/pokemon', routes);

app.listen(port, () => {
    console.log(`Serveur marche sur le port ${port} avec Express server : http://localhost:${port}`);
});
