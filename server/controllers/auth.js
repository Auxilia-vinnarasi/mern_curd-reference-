const User = require("../models/user");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

//signup
exports.signup = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array()[0].msg });
    }
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({ err: "NOT able to save user in DB" });
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id,
        });
    });
};
//signout
exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "user signout" });
};

//signin
exports.signin = (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array()[0].msg });
    }
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: "email not found" });
        }
        if (!user.autheticate(password)) {
            return res.status(401).json({ error: "invalid password" });
        }

        const token = jwt.sign({ _id: user._id }, "vijayaraj");
        res.cookie("COOKIE", token, { expire: new Date() + 9999 });
        const { _id, name, email } = user;
        res.json({ token, user: { _id, name, email } });
    });
};

// exports.isSignedIn = expressJwt({
//     secret: "vijayaraj",
//     userProperty: "auth",
// });

exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.auth._id == req.profile._id;
    if (!checker) {
        return res.status(403).json({ error: "ACCESS DENIED" });
    }
    next();
};
