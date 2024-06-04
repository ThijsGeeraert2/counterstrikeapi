const express = require("express");
const router = express.Router();
const { UserModel, validateUser } = require("../models/user");
const getUser = require("../middleware/getUser");
const getAuth = require("../middleware/getAuth");
const getAdmin = require("../middleware/getAdmin");




router.get("/:id",getAuth, getAdmin, getUser, (req, res) => {
    /* #swagger.tags = ['User'] */

    try {
        if (res.user != null) {
            res.status(200).json(res.user);
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

});

router.get("/", getAuth, async (req, res) => {
    /* #swagger.tags = ['User'] */
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/:id", getAuth, getAdmin, getUser, async (req, res) => {
    /* #swagger.tags = ['User'] */
    try {
        if (res.user == null) {
            return res.status(404).json({ message: "user not found" });
        }
        await res.user.deleteOne()
        res.status(200).json({ message: "user is deleted " });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
