const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { UserModel, validateUser } = require("../models/user");

const config = require('config');


router.post('/login', async (req, res, next) => {
    /* #swagger.tags = ['Auth'] */

    try {
        const { email, password } = req.body;
        const user = await User.UserModel.findOne({ email });
        console.log(user)
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        const validPassword = await bcrypt.compare( password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        const token = jwt.sign({ userId: user._id, isAdmin: user.admin }, config.get('jwtPrivateKey'), {
            expiresIn: '1d', 
        });
        res.cookie("token",token, {
            withCredentials: true,
            httpOnly: false,
        });


        res.status(200).json({ message: "user logged in", token : token });
        next()
    }
    catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
        })
    }
});

router.post("/register", async (req, res) => {
    /* #swagger.tags = ['Auth'] */

    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
        const user = new UserModel({
          admin: req.body.admin,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
  
        try {
          const newUser = await user.save();
          res.status(201).json(newUser);
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
  
  });


module.exports = router;
