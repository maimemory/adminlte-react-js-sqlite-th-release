import { Sequelize } from "sequelize";
const database = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
})

const dbConnect = async () => {
    try{
        await database.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

dbConnect();

export default database;