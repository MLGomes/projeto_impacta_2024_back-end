const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    next();
});


const userRoutes = require('./routes');
app.use('/users', userRoutes);

// Outras rotas
app.use(routes);

module.exports = app;
