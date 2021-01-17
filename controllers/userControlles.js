const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');

const User = require('../models/User');
const keyToken = require('../config/token');

module.exports.login = async (req, res) => {
    const isUser = await User.findOne({ email: req.body.email });

    if (isUser) {
        const passwordResult = bcrypt.compareSync(req.body.passord, isUser.passord);
        
        if (passwordResult) {

           const token = jsonWebToken.sign({
                email: isUser.email,
                userId: isUser._id
           }, keyToken.jwt, { expiresIn: 3600 });

           res.status(200).json({
               user: {
                   name: isUser.name,
                   email: isUser.email,
                   token: `Bearer ${token}`
               }
           });

        } else {
            res.status(401).json({
                error: 'User not found!'
            });
        }

    } else {
        res.status(404).json({
            error: 'User not found!'
        });
    }
};

module.exports.register = async (req, res) => {
    const isUser = await User.findOne({ email: req.body.email }); 

    if (!isUser) {

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashSync(req.body.passord, bcrypt.genSaltSync(10))
        });

        try {
            await user.save();

            res.status(201).json({
                user: {
                    name: req.body.name,
                    email: req.body.email,
                }
            });

        } catch(error) {
            res.status(409).json({
                error: 'Error you have a bad conncetion!'
            });
        }
        
    } else {
        res.status(409).json({
            error: 'Email already exists!'
        });
    }
};

module.exports.confirm = (req, res) => {
    res.status(200).json({
        page: 'Confirm'
    });
};