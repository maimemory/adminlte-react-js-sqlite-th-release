import { Sequelize } from "sequelize";
import database from './db-instance.js'

const memoTable = database.define('memoTable', {
    memo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isDone: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})

export default memoTable;