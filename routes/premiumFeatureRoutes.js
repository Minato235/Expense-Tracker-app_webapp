const express=require("express");
const router=express.Router();
const User=require("../models/expenses");
const Expense=require("../models/expenses");

const premiumFeature=require("../controllers/premiumFeature");
const middleware=require("../middleware/auth");



router.get("/showLeaderBoard",middleware.authorization,premiumFeature.getUserLeaderBoard);





module.exports=router;