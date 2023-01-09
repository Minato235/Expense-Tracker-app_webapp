const Sequalize = require("sequelize")
const db = require("mysql2");
const sequelize = require("../util/db");
const Orders = sequelize.define("order", {
    id: {
        type:Sequalize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
   paymentid:Sequalize.STRING,
   orderid:Sequalize.STRING,
   status:Sequalize.STRING

}, {
    timestamps: false
})

module.exports=Orders;