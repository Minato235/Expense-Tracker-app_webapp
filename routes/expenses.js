const express=require("express");
const router=express.Router();
const User=require("../models/expenses");
const addExpenses=require("../controllers/expensesController");
const middleware=require("../middleware/auth");

router.post("/expense/expenseDetails",middleware.authorization,addExpenses.Expenses);
router.get("/expense/expenseDetails",middleware.authorization,addExpenses.getExpenses);

module.exports=router;