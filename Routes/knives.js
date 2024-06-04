const express = require("express");
const router = express.Router();
const { knifeModel, validateKnife } = require("../models/knife");
const getKnife = require("../middleware/getKnife");


//getById
router.get('/:id', getKnife, async (req, res) => {
  /* #swagger.tags = ['Knife'] */

  try {
    if (res.knife == null) {
      return res.status(404).json({ message: "Knife not found" });
    }
    res.status(200).json(res.knife);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//getAll
router.get("/", async (req, res) => {
  /* #swagger.tags = ['Knife'] */
  try {
    const knives = await knifeModel.find();
    console.log(knives);
    res.status(200).json(knives);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});





module.exports = router;