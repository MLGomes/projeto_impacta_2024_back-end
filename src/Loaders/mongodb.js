const mongoose = require('mongoose');
require('dotenv').config(); // Carregar as variáveis de ambiente do arquivo .env

mongoose.set('strictQuery', false);

async function StartDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
}

module.exports = StartDB;