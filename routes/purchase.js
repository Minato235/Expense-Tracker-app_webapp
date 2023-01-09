const express=require("express");
const router=express.Router();
const User=require("../models/orders");
const addpurchase=require("../controllers/purchase");
const middleware=require("../middleware/auth");

// router.post("/login/expenseDetails",middleware.authorization,addpurchase.purchasePremium);
router.get("/user/premiumAccount",middleware.authorization,addpurchase.purchasePremium);
router.post("/user/updatePremiumAccount",middleware.authorization,addpurchase.updatepurchasePremium);


module.exports=router;