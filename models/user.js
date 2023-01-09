const Sequalize = require("sequelize")
const db = require("mysql2");
const sequelize = require("../util/db");

const User = sequelize.define("user", {
    id: {
        type:Sequalize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type:Sequalize.STRING,
    },
    email: {
        type: Sequalize.STRING,
        unique: true,
    },
    password: {
        type: Sequalize.STRING
    },
    ispremimuser:{
        type:Sequalize.BOOLEAN,
        default:false
    }
}, {
    timestamps: false
})

module.exports=User;