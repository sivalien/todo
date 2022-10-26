const express = require('express');
const router = express.Router();
const User = require('../models/Users')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
                return res.status(400).json({errors: errors.array(), message: "Incorrect data"})
            }
            if (isUsed) {
                return res.status(300).send({message: "This email is already in use"})
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
            res.status(400).json({message: error.message})
        }
    });


router.post('/signin', 
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Password should contain at least 5 characters').exists()
    ], 
    async (req, res) => {
        try {
            const errors = validationResult(req)
            const { email, password } = req.body;
            const user = await User.findOne({email: email});
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array(), message: "Incorrect data"})
            }
            if (!user) {
                return res.status(400).send({message: "There is no account with such email"})
            }
            const isCorrect = bcrypt.compare(password, user.password)
            if (!isCorrect) {
                return res.status(400).send({message: "Incorrect password"})
            }
            const token = jwt.sign(
                {userId: user.id},
                process.env.SECRET,
                {expiresIn: '1h'}
            )
            res.json({token: token, id: user.id})
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
    });


module.exports = router;