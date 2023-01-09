//imports part
const path = require('path')
const express = require('express');
const cors = require('cors');
const app = express();
const https=require("https") 
const fs=require("fs")
var aws = require("aws-sdk");
const helmet = require("helmet");
var compression = require('compression')
var morgan = require('morgan')

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(compression())

const User=require("./models/user");
const Expense=require("./models/expenses");
const Orders=require("./models/orders");
const accesLOg=fs.createWriteStream(path.join(__dirname,"access.log"),{flag:"a"});
const ForgotPassword=require("./models/forgotPassword")
app.use(morgan("combined",{stream:accesLOg}));


 
const sequelize = require("./util/db");
const users=require("./routes/user");
const exp=require("./routes/expenses");
const order=require("./routes/purchase");
const premiumFeatureRoutes = require('./routes/premiumFeatureRoutes');
const forgotPassword = require('./routes/resetpassword');




//main part 
app.use("/",users);
app.use("/",exp);
app.use("/",order);
app.use("/",premiumFeatureRoutes)
app.use("/password",forgotPassword)



User.hasMany(Expense);
Expense.belongsTo(User);
      
// User.hasMany(orders);
// orders.belongsTo(User)
User.hasMany(Orders);
Orders.belongsTo(User);

User.hasMany(ForgotPassword);
ForgotPassword.belongsTo(User);


// sequelize.sync({force:true})
sequelize.sync()
.then(()=>{
  app.listen(3000)
})
.catch((err)=>{
  console.log(err);
})
