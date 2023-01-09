
const Sequalize=require("sequelize");
const sequelize=new Sequalize("exp","root","123456789",{
dialect:"mysql",
host:'localhost'
});
module.exports=sequelize;