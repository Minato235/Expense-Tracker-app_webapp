const orders = require("../models/orders");
const user = require("../models/user");

const Razorpay = require("razorpay");
const Orders = require("../models/orders");
exports.purchasePremium = async (req, res) => {
    try {
        var rzp = new Razorpay({
            key_id: "rzp_test_A6qegf0ObDUWA6",
            key_secret: "ork01WBuLWJX3mqqWgo5Yu7F"
        })
        // console.log(rzp)
        const amount = 200;
        rzp.orders.create({
            amount,
            currency: "INR"
        }, (err, order) => {
            if (err) {
                throw new Error(err);
            }
            req.user.createOrder({
                orderid: order.id,
                status: 'pending'
            }).then(() => {
                return res.status(201).json({
                    order,
                    key_id: rzp.key_id
                });
            }).catch(err => {
                throw new Error(err)
            })
        })

    } catch (err) {
        console.log(err);
        res.status(403).json({
            message: "Something Went Wrong",
            err: err
        })
    }
}
exports.updatepurchasePremium = async (req, res) => {
   console.log(" In updatepurchasePremium")
    try {
        const {
            payment_id,
            order_id
        } = req.body;
        const order =await orders.findOne({
            where: {
                orderid: order_id
            }
        });
        const p1 = orders.update({
            paymentid: payment_id,
            status: "SUccesFul"
        },{
            where:{
                orderid: order_id
            }
        });
        const p2 = req.user.update({
            ispremimuser: true
        })

        Promise.all([p1, p2]).then(() => {
            return res.status(202).json({
                succes: true,
                message: "Transtaion Succes"
            })
        }).catch((err) => {
            console.log(err);
            throw new Error
        })
    } catch (err) {
        console.log(err)
        console.log("updatepurchasePremium error");
        res.status(403).json({
            err: err,
            message: "Something Went wrong"
        })
    }

}
// exports.updatepurchasePremium=async(req,res)=>{
//     try{
//         const {payment_id,order_id}=req.body;
//         orders.findOne({where:{order_id:order_id}}).then(order=>{
//             order.update({paymentid:payment_id,status:"SUccesFul"}).then(()=>{
//                 req.user.update({ispremimuser:true})
//                     return res.status(202).json({sucess:true,message:"Transation success"});
//                 }).catch((err)=>{
//                     throw new Error(err);
//                 })
//             }).catch(err=>{
//                 throw new Error(err);
//             })
//         }catch(err){
//             console.log(err);
//             res.status(403).json({err:err,message:"Something Went wrong"})
//         }

// }