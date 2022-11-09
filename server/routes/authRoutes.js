const express = require('express');
const router = express.Router();
const User = require('../models/Users')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv/config')

router.post('/signup', 
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Password should contain at least 5 characters').isLength({min: 5})
    ], 
    async (req, res) => {
        try {
            const errors = validationResult(req)
            const { email, password } = req.body;
            const isUsed = await User.findOne({email: email});
            if (!errors.isEmpty()) {
                const error_array = errors.array();
                if (error_array.length == 2) {
                    return res.status(400).json({message: "Incorrect data: email is invalid and password contains less than 5 characters"});
                } else {
                    return res.status(400).json({message: error_array[0].msg});
                }
            }
            if (isUsed) {
                return res.status(400).send({message: "This email is already in use"})
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = await new User({
                email: email,
                password: hashedPassword
            });
            await user.save()
            res.status(201).send(user)
        }
        catch (error) {
            res.status(500).json({message: ""})
        }
    });


router.post('/signin', 
    [
        check('email', 'Incorrect email').isEmail()
    ], 
    async (req, res) => {
        try {
            const errors = validationResult(req)
            const { email, password } = req.body;
            if (!errors.isEmpty()) {
                return res.status(400).json({message: errors.array()[0].msg});
            }
            await User.findOne({email: email})
            .then(user => {
                if (!user) return res.status(400).json({ message: "There is no account with such email" });
                bcrypt.compare(password, user.password, (err, data) => {
                    if (err) return res.status(400);
                    if (data) {
                        const token = jwt.sign(
                            {userId: user.id},
                            process.env.SECRET,
                            {expiresIn: '1h'}
                        )
                        return res.json({token: token, id: user.id})
                    } else {
                        return res.status(401).json({ message: "Wrong password" })
                    }
    
                })
            })
            
        }
        catch (error) {
            res.status(500).json({message: ""})
        }
    });


module.exports = router;