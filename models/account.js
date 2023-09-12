import { Sequelize } from "sequelize";
import database from './db-instance.js'
import memoTable from "./memo.js";

const account = database.define('account', {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

account.hasMany(memoTable);
memoTable.belongsTo(account);

const syncTable = async () => {
    try{
        await database.sync({ force: false });
        console.log("account was synchronized successfully.");
    }
    catch (error) {
        console.error('Unable to sync to the table:', error);
    }
}

syncTable();

export default account;