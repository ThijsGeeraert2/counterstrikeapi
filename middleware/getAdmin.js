module.exports = function (req, res, next) {
    if (!req.user.isAdmin) return res.status(403).send('Acces Denied: Not an Admin');
    console.log("admin login gelukt");
    next();
}