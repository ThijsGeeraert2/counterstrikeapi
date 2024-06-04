const { gloveModel } = require("../models/glove");

module.exports = async function getGlove(req, res, next){
    let glove;
    try{
        glove = await gloveModel.findById(req.params.id);
        if (glove == null){
            console.log("glove niet gevonden")
        }
    } catch (error) {
        console.log(error);
    }
    res.glove = glove;
    next();
}