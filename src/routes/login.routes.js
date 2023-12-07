const express = require('express');
const router = express.Router();

const email_user = "abc.1"
const password_user = "qwerty"

const isAuth = (req, res, next) => {
    if (!req.session.isAuth) {
        return res.status(401).send("No tienes permiso de estar aquí");
    }
    next();
};

router.get("/", (req, res) => {
    if (req.session && req.session.counter) {
        req.session.counter++;
        res.send(`Te has logeado ${req.session.counter} veces`);
    } else {
        req.session.counter = 1;
        res.send("Bienvenido!");
    }
});

router.get("/login", (req, res) => {
    const { email, password: password } = req.query;
    if (email != email_user || password != password_user) {
        return res.status(401).send("Usuario o contraseña son invalidos")
    }
    req.session.email = email
    req.session.isAdmin = true
    req.session.isAuth = true
    res.status(200).send("OK")
});

router.get("/profile", isAuth, (req, res) => {
    res.json({
        email: req.session.email,
        isAdmin: req.session.isAdmin,
    })
})
router.get("/logout", (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            res.status(500).json({ message: "Ha ocurrido un error durante el logout" })
        } else {
            res.status(200).json({ message: "Se ha cerrado la sesion correctamente" })
        }
    })
});

module.exports = router;
