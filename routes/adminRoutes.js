const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");


const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const sessionSecretKey = process.env.SESSION_SECRET_KEY;
const accessKey = process.env.JWT_SECRET_KEY_AT;
const refreshKey = process.env.JWT_SECRET_KEY_RT;

const userSchema = require("../model/adminSchema");

router.use(session({
    secret: sessionSecretKey,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}))

router.use(passport.initialize());
router.use(passport.session());
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);


passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


router.post("/register", (req, res) => {
    User.register({ username: req.body.username }, req.body.password, (err, user) => {
        if (err) {
            res.send(err);
        } else {
            passport.authenticate('local', { failureMessage: true })(req, res, () => {
                res.send("registered successfully");
            })
        }
    })
});

function generateToken(userID){
    const accessToken = jwt.sign({ _id: userID}, accessKey, { expiresIn: "30s" });
    const refreshToken = jwt.sign({ _id: userID}, refreshKey, { expiresIn: "3m" });
    console.log("accessToken:",accessToken);
    console.log("refreshToken:",refreshToken);
}

function authenticateUser(req, res, next) {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })
    req.logIn(user, (err) => {
        if (err) {
            res.send(err);
        } else {
            passport.authenticate('local', { failureMessage: true })(req, res, () => {
                generateToken(req.user._id);
            })
            next();
        }
    })
}





router.post("/login", authenticateUser, (req, res) => {
    res.send("logged-in successfully");
});

router.post("/refresh",(req,res)=>{
    const refreshToken = req.body.refreshToken;
    jwt.verify(refreshToken,refreshKey,(err,user)=>{
        if(err){
            console.log(err);
        }else{
            generateToken(user._id);
            res.send("access token generated successfully");
        }
    })
});

module.exports = router;