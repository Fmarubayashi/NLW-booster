import knex from 'knex';
import path from 'path';

const connection = knex ({
    client:'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },

    useNullAsDefault: true,
}); 

export default connection;

// Migrations = Histórico do banco de dados

//knex consegue montar essas 2 tabelas iguais 
// create table points
// create table users

