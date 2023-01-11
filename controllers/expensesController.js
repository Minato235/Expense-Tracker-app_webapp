const Expense = require("../models/expenses");
const jwt = require("jsonwebtoken");
var aws = require("aws-sdk");
const servicesUser=require("../services/userServices")
const { resolve } = require("path");
const uploadToS3=require("../services/uploadToS3");

exports.Expenses = async (req, res) => {
  const {
    money,
    description,
    category
  } = req.body;

  req.user.createExpense({
      money,
      description,
      category
    })
    .then(expense => {
      return res.status(200).json({
        expense,
        success: true
      })
    }).catch(err => {
      return res.status(403).json({
        success: false,
        error: err
      })
    })
}


exports.getExpenses = async (req, res) => {
  console.log("getting => users from Mysql");
  let page=req.query.pageNo||1;
  console.log(page);
  let items_per_page=+(req.query.items_per_page)||1 ;
  console.log("*******************")
  console.log(items_per_page);
  let totalPages;
  // req.user.getExpenses().then(expenses => {
  //   // console.log(expenses)
  //   return res.status(200).json({
  //     expenses,
  //     success: true
  //   })
  // }).catch(err => {
  //   console.log(err)
  //   return res.status(403).json({
  //     success: false,
  //     error: err
  //   })
  // })
  try{
    let count=await Expense.count({where:{userId:req.user.id}})
    console.log("count"+"id==>"+count)
    totalPages=count;
    let data=await req.user.getExpenses({offset:(page-1)*items_per_page,limit:items_per_page})
    // console.log(data)
    res.status(200).json({
      data,
      info:{
        currentPage:+page,
        hasNextPage:totalPages>page*items_per_page,
        hasPreviousPage:page>1,
        nextPage:+page+1,
        previousPage:+page-1,
        lastPage:Math.ceil(totalPages/items_per_page),
      }
    })
  }catch(err){
    cos.log(err);
    res.status(500).json({success:false,err:err})
  }
}

exports.downloadpage = async (req, res) => {
try{
  const expenses = await servicesUser.getExpenses(req);
  // console.log(expenses)
  const stringyfyExpenses = JSON.stringify(expenses);
  const userId=req.user.id;
  const filename = `Expense${userId}/${new Date}.txt`;
  const fileUrl =await uploadToS3.uploadToS3(stringyfyExpenses,filename);
  res.status(200).json({
    fileUrl,
    success: true
  })
}catch(err){
  console.log(err);
res.status(500).json({fileUrl:"Something==>went wrong",success:false})
}
}
