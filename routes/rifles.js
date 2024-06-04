const express = require("express");
const router = express.Router();
const { rifleModel, validateRifle } = require("../models/rifle");
const getRifle = require("../middleware/getRifle");


router.get("/:id", getRifle, async (req, res) => {
    /* #swagger.tags = ['Rifles'] */

    try {
        if (res.rifle == null) {
            return res.status(404).json({ message: "Rifle not found" });
        }
        res.status(200).json(res.rifle);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/", async (req, res) => {
    /* #swagger.tags = ['Rifles'] */

    try {
        const rifles = await rifleModel.find();
        res.status(200).json(rifles)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});


router.patch("/:id", getRifle, async (req, res) => {
    /* #swagger.tags = ['Rifles'] */

    if (req.body.name != null) {
        res.rifle.name = req.body.name;
    }
    if (req.body.type != null) {
        res.rifle.type = req.body.type;
    }
    if (req.body.rarity != null) {
        res.rifle.rarity = req.body.rarity;
    }
    if (req.body.skin != null) {
        res.rifle.skin = req.body.skin;
    }
    if (req.body.float != null) {
        res.rifle.float = req.body.float;
    }
    if (req.body.stat_trak != null) {
        res.rifle.stat_trak = req.body.stat_trak;
    }
    if (req.body.exterior != null) {
        res.rifle.exterior = req.body.exterior;
    }
    if (req.body.price != null) {
        res.rifle.price = req.body.price;
    }

    try {
        const updatedRifle = await res.rifle.save({ validateModifiedOnly: true });
        res.status(201).json(updatedRifle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.post("/", async (req, res) => {
    /* #swagger.tags = ['Rifles'] */

    const { error } = validateRifle(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const rifle = new rifleModel({
        name: req.body.name,
        type: req.body.type,
        rarity: req.body.rarity,
        skin: req.body.skin,
        float: req.body.float,
        stat_trak: req.body.stat_trak,
        exterior: req.body.exterior,
        price: req.body.price
    });

    try {
        const newRifle = await rifle.save();
        res.status(201).json(newRifle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});

router.delete("/:id", getRifle, async (req, res) => {
    /* #swagger.tags = ['Rifles'] */

    try {
        if (res.rifle == null) {
            return res.status(404).json({ message: "Rifle not found" });
        }
        await res.rifle.deleteOne()
        res.status(200).json({ message: "rifle is deleted " });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;