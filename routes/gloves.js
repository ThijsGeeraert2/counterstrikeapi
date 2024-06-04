const express = require("express");
const router = express.Router();
const { gloveModel, validateGlove } = require("../models/glove");
const getGlove = require("../middleware/getGlove");


// GET a glove by ID
router.get("/:id", getGlove, async (req, res) => {
    /* #swagger.tags = ['Gloves'] */

    try {
        if (res.glove == null) {
            return res.status(404).json({ message: "Glove not found" });
        }
        res.status(200).json(res.glove);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/", async (req, res) => {
    /* #swagger.tags = ['Gloves'] */

    try {
        const gloves = await gloveModel.find();
        res.status(200).json(gloves)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});


router.patch("/:id", getGlove, async (req, res) => {
    /* #swagger.tags = ['Gloves'] */

    if (req.body.name != null) {
        res.glove.name = req.body.name
    }
    if (req.body.type != null) {
        res.glove.type = req.body.type
    }
    if (req.body.rarity != null) {
        res.glove.rarity = req.body.rarity
    }
    if (req.body.skin != null) {
        res.glove.skin = req.body.skin
    }
    if (req.body.float != null) {
        res.glove.float = req.body.float
    }
    if (req.body.stat_trak != null) {
        res.glove.stat_trak = req.body.stat_trak
    }
    if (req.body.exterior != null) {
        res.glove.exterior = req.body.exterior
    }
    if (req.body.price != null) {
        res.glove.price = req.body.price
    }

 

    try {
        const updatedGlove = await res.glove.save({ validateModifiedOnly: true });
        res.status(201).json(updatedGlove)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

router.post("/", async (req, res) => {
    /* #swagger.tags = ['Gloves'] */

    const { error } = validateGlove(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const glove = new gloveModel({
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
        const newGlove = await glove.save();
        res.status(201).json(newGlove);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});

// DELETE a glove by ID
router.delete("/:id", getGlove, async (req, res) => {
    /* #swagger.tags = ['Gloves'] */

    try {
        if (res.glove == null) {
            return res.status(404).json({ message: "Glove not found" });
        }
        await res.glove.deleteOne()
        res.status(200).json({ message: "glove is delted " });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
