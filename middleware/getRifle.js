const { rifleModel } = require("../models/rifle");

module.exports = async function getRifle(req, res, next){
    let rifle;
    try{
        rifle = await rifleModel.findById(req.params.id);
        if (rifle == null){
            console.log("glove niet gevonden")
        }
    } catch (error) {
        console.log(error);
    }
    res.rifle = rifle;
    next();
}