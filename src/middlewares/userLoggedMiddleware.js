const db = require('../database/models');
async function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;

    if (emailInCookie) {
        let userCookie = await db.User.findOne({ where: { email: emailInCookie } });
        if (userCookie) {
            req.session.userLogged = userCookie;
        }

    }
    if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddleware