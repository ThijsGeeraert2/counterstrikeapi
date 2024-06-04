const { knifeModel } = require("../models/knife");

module.exports = async function getKnife(req, res, next){
    let knife;
    try{
        knife = await knifeModel.findById(req.params.id);
        if (knife == null){
            console.log("knife niet gevonden")
        }
    } catch (error) {
        console.log(error);
    }
    res.knife = knife;
    next();
}