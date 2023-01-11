const User = require("../models/user");
const bcyrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
var aws = require("aws-sdk");


exports.addUser = async (req, res) => {
    // const name=req.body.name;
    const {
        name,
        email,
        password
    } = req.body
    const salts = 10;
    bcyrpt.hash(password, salts, async (err, hash) => {
        const data = await User.create({
            name,
            email,
            password: hash
        });
        res.status(201).json({
            newUserDetail: data
        })
    })
}


function getAccesTokenJwt(id,name,ispremimuser) {
    return jwt.sign({
        userId: id,
        name:name,
        ispremimuser
    },"minato");
}
exports.login = async (req, res) => {
    const {
        email,
        password
    } = req.body;
    const user = await User.findAll({
        where: {
            email
        }
    })
    //    console.log(user);
    if (user.length > 0) {
        bcyrpt.compare(password, user[0].password, (err, results) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: "User Does not Exist"
                })
            }
            if (results === true) {
                res.status(200).json({
                    success: true,
                    message: "User Login success",
                    token: getAccesTokenJwt(user[0].id, user[0].name,user[0].ispremimuser)
                })
            } else {
                return res.status(400).json({
                    success: false,
                    message: "User Login  Failed!!! Check password"
                })

            }
        })
    } else {
        res.status(500).json({
            success: false,
            message: "User Does not Exist"
        })
    }

}
 exports.deleteUser = async (req, res, next) => {

    try {
        let userId = req.params.id;
        console.log(userId)
        if (!userId) {
            res.status(400).json({
                err: 'Id missing!!'
            })
        }
        await User.destroy({
            where: {
                id: userId
            }
        });
        console.log('delete working');

        res.sendStatus(200);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            err: 'isErrored deletete section'
        })
    }
}