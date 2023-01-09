const jwt = require("jsonwebtoken");
const User = require("../models/user");
const express=require("express")

const authorization = (req, res, next) => {
    console.log("autho>>>>>>")
    try {
        const token = req.header("Authorization");
        console.log(token);
        const user = jwt.verify(token, "minato");
        console.log(user.userId)
        User.findByPk(user.userId).then(user => {
            console.log(JSON.stringify(user));
            req.user = user;
            next();
        }).catch(err => {
            throw new Error(err)
        })
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            success: false
        })
    }
}
module.exports = {
    authorization
}