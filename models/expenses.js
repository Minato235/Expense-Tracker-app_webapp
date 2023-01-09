const Sequalize = require("sequelize")
const db = require("mysql2");
const sequelize = require("../util/db");

const Expenses = sequelize.define("Expense", {
    id: {
        type:Sequalize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    money: {
        type:Sequalize.STRING,
    },
    description: {
        type: Sequalize.STRING,
    },
    category: {
        type: Sequalize.STRING
    }
}, {
    timestamps: false
})

module.exports=Expenses;