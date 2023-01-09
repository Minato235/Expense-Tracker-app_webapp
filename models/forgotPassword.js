const Sequalize = require("sequelize")
const db = require("mysql2");
const sequelize = require("../util/db");
const { Sequelize } = require("sequelize");

const forgotpassword=sequelize.define("noun",{
    id:{
        type:Sequalize.UUID,
        primaryKey:true
    },
    active:Sequelize.BOOLEAN,
    expiresby:Sequalize.DATE
}, {
    timestamps: false
})
module.exports=forgotpassword;