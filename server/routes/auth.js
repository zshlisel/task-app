import {createUser, verifyPassword } from "../controllers/auth.js";
import { Router } from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import CookieStrategy from "passport-cookie";
import db from "../controllers/db.js";
import jwt from "jsonwebtoken";

const router = Router();

async function verifyLocal(username, password, done) {
    try {
        const user = await db.oneOrNone('SELECT * FROM person WHERE email = ${username}', { username });
        if (user) {
            const verify = await verifyPassword(password, user.pass)
            if (verify) {
                return done(null, user);
            }
        }

        return done(null, false, { message: "Incorrect username or password." });
    } catch (e) {
        console.error(e);
        throw e;
    }
};

function verifyCookie(token, done) {
    try{
        const result = jwt.verify(token, "mySecret")
        console.log(result)
        return done(null, result);
    }catch (e) {
        console.error('JWT verification error:', e);
        return done(e, false);
    }
};


const localStrategy = new LocalStrategy(verifyLocal);
passport.use(localStrategy);
const cookieStrategy = new CookieStrategy({
    cookieName: 'token'
}, verifyCookie);
passport.use(cookieStrategy);


router.post('/login',
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
        const { id, name } = req.user;
        const payload = { id, name };


        const token = jwt.sign(payload, 'mySecret');
        return res
            .cookie("token", token, {
                // can only be accessed by server requests
                httpOnly: true,
                // path = where the cookie is valid
                path: "/",
                // domain = what domain the cookie is valid on
                domain: ".localhost",
                // secure = only send cookie over https
                secure: false,
                // sameSite = only send cookie if the request is coming from the same origin
                sameSite: "lax", // "strict" | "lax" | "none" (secure must be true)
                // maxAge = how long the cookie is valid for in milliseconds
                maxAge: 3600000, // 1 hour
            })
            .json({ ok: true, message: 'Logged In Succesfully'})

        
    })


router.post('/user', async (req, res) => {
    try {
        const user = await createUser(
            req.body.name,
            req.body.pass,
            req.body.email
        );
        if (user) {
        const { id, name } = user;
        const payload = { id, name };

        const token = jwt.sign(payload, 'mySecret');
        

        res
        .cookie("token", token, {
            // can only be accessed by server requests
            httpOnly: true,
            // path = where the cookie is valid
            path: "/",
            // domain = what domain the cookie is valid on
            domain: ".localhost",
            // secure = only send cookie over https
            secure: false,
            // sameSite = only send cookie if the request is coming from the same origin
            sameSite: "lax", // "strict" | "lax" | "none" (secure must be true)
            // maxAge = how long the cookie is valid for in milliseconds
            maxAge: 3600000, // 1 hour
        })
        .json({ ok: true, message: 'User Created Successfully' })};
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: 'User creation failed' });
    }
});


router.post('/logOut', (req, res) => {
    return res
        .clearCookie('token', {
            httpOnly: true,
            path: '/',
            domain: '.localhost',
            secure: false,
            sameSite: 'lax',
        })
        .json({ ok: true, message: 'Logged out successfully' });
});


router.get('/check-auth', passport.authenticate('cookie', { session: false }), (req, res) => {
    if (req.user) {
        res.json(req.user); 
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

export default router;