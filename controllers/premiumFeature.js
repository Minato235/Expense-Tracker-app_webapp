const User = require("../models/user");
const Expense=require("../models/expenses");
const sequelize = require("../util/db");

exports.getUserLeaderBoard=async(req,res)=>{
    try{
        const users=await User.findAll({
            attributes:["id","name",[sequelize.fn("sum",sequelize.col("expenses.money")),"total_cost"]],
            include:[
                {
                    model:Expense,
                    attributes:[]
                }
            ],
            group:["user.id"],
            order:[["total_cost","DESC"]]

        })
        // const expenses=await Expense.findAll({
        //     attributes:["userId",[sequelize.fn("sum",sequelize.col("expense.money")),"total_cost"]],
        //     group:["userId"]
        // });
        // const userAggregate={};
        // expenses.forEach((expense)=>{
        //     if(userAggregate[expense.userId]){
        //         userAggregate[expense.userId]=userAggregate[expense.userId]+expense.money;
        //     }else{
        //         userAggregate[expense.userId]=expense.money;
        //     }
        // })
        // var userLeaderDeatils=[];
        // users.forEach((user)=>{
        //     userLeaderDeatils.push({name:user.name,total_cost:userAggregate[user.id]})
        // })
        console.log("userLeaderDeatil===>>s")


        // console.log(userLeaderDeatils);
        // userLeaderDeatils.sort((a,b)=>{
        //     b.total_cost-a.total_cost
        // })
        res.status(200).json(users)

    }catch(err){
        console.log(err);
    }
}
