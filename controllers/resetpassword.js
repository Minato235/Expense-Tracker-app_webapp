const uuid = require('uuid');
const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcrypt');
const Forgotpassword = require("../models/forgotPassword");
const User = require("../models/user");
const express = require('express');
// const { Script } = require('vm');
const e = require('express');
const forgotpassword=async(req,res)=>{
    try{
        const {email}=req.body;
        const user=await User.findOne({where:{email}});
        console.log(user)
        console.log("========>===========================================>")

        if(user){
            const id=uuid.v4();
            console.log("user");
            console.log(id);
            user.createNoun({id,active:true})
            .catch(err=>{
                console.log(err)
            })
            sgMail.setApiKey("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")

            const msg={
                to:email,
                from:"darkaashe@gmail.com",
                subject:"testing",
                text:"test",
                html:`<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`
            }
            sgMail.send(msg).then((response)=>{
                return res.status(response[0].statusCode).json({message:"Link to reset pass",success:true})
            })
            .catch((err)=>{
                console.log(err)
            })
        }else{
            throw new Error("User doesnot exit")
        }

    }catch(err){
        console.log(err);
        return res.json({message:err,success:false});
    }
}
const resetpassword=(req,res)=>{
    const id=req.params.id;
    Forgotpassword.findOne({where:{id}}).then(forgotpasswordRequest=>{
        if(forgotpasswordRequest){
            forgotpasswordRequest.update({active:false});
            res.status(200).send(`<html>
            <script>
                function formsubmitted(e){
                    e.preventDefault();
                    console.log('called')
                }
            </script>
            <form action="/password/updatepassword/${id}" method="get">
                <label for="newpassword">Enter New password</label>
                <input name="newpassword" type="password" required></input>
                <button>reset password</button>
            </form>
        </html>`)
        res.end();
        }
    })

}
module.exports={
    forgotpassword,
    resetpassword
}