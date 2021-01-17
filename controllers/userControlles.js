const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');

const User = require('../models/User');
const keyToken = require('../config/token');

module.exports.login = async (req, res) => {
    const isUser = await User.findOne({ email: req.body.email });

    if (isUser) {
        const passwordResult = bcrypt.compareSync(req.body.password, isUser.password);
        
        if (passwordResult) {

           const token = jsonWebToken.sign({
                email: isUser.email,
                userId: isUser._id
           }, keyToken.jwt, { expiresIn: 3600 });

           res.status(200).json({
               user: {
                   id: isUser._id,
                   name: isUser.name,
                   email: isUser.email,
                   type: isUser.type,
                   token: token
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
            type: req.body.type,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
        });


        try {
            await user.save();

            const currentUser = await User.findOne({ email: req.body.email });

            const token = jsonWebToken.sign({
                email: currentUser.email,
                userId: currentUser._id,
            }, keyToken.jwt, { expiresIn: 3600 });

            res.status(201).json({
                user: {
                    id: currentUser._id,
                    name: req.body.name,
                    email: req.body.email,
                    type: req.body.type,
                    token: token
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
