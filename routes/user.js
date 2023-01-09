const express=require("express");
const router=express.Router();
const User=require("../models/user");
const addUsers=require("../controllers/user");
const expensesController=require("../controllers/expensesController");
const middleware=require("../middleware/auth");
const restetPassword=require("../controllers/resetpassword");



router.post("/user/login",addUsers.addUser);
router.post("/user/login1",addUsers.login);
router.get("",restetPassword.resetpassword)

router.get("/user/download",middleware.authorization,expensesController.downloadpage)

    module.exports=router;