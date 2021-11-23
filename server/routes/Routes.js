const express = require("express");
const router = express.Router();
const { Users, Notes } = require("../models");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
// const nodemailer = require("nodemailer")
const nodemailer = require("nodemailer")
const { validateToken, verifyEmail } = require("../middlewares/AuthMiddleware")
const jwt = require("jsonwebtoken")

// sign used to create a token
const { sign } = require("jsonwebtoken");

// MAIL SENDER DETAILS
var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "email.test.coding@gmail.com",
        pass: "codewithme"
    },
    tls: {
        rejectUnauthorized: false
    }
})


// REGISTER USER EMAIL VERIFICATION
router.post("/auth/signup", async (req, res) => {
    try {
        const { name, surname, email, password } = req.body;
        // validate user input
        if (!(name && surname && email && password)) {
            return res.json({ error: "All inputs are required" })
        }
        else {
            const oldUser = await Users.findOne({ where: { email } });
            if (oldUser) {
                return res.json({ error: "User already exists" })
            }

            const token = sign({ email, expiresIn: (+new Date() + 7200000) }, "secretKey");
            const user = new Users({
                name,
                surname,
                email,
                password,
                emailToken: token,
                isVerified: false
            })

            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(user.password, salt);
            user.password = hashPassword
            const newUser = await user.save();

            // send verification mail to user
            var mailOptions = {
                from: `"Note taker app " <email.test.coding@gmail.com>`,
                to: user.email,
                subject: "Verify your email",
                html: `<h3> Hi ${user.name}! Thanks for registering on our platform</h3>
                    <h2>Please verify your email to continue...</h2>
                    <a href="http://${req.headers.host}/user/verify-email?token=${user.emailToken}">Verify your email</a>`
            }
            // sending email
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    res.send(err)
                }
                else {
                    res.send("A verification message is sent to your email account")
                }
            })
        }
    }
    catch (err) {
        res.send("err ", err)
    }
})

router.get("/user/verify-email", async (req, res) => {
    try {
        const token = req.query.token
        const user = await Users.findOne({ where: { emailToken: token } })
        if (user) {
            user.emailToken = null
            user.isVerified = true
            await user.save();
            console.log("Email verified successfully")
        }
        else {
            console.log("Email is not verified")
        }
    }
    catch (err) {
        console.log(err)
    }
})


// Login
router.post("/auth/login", verifyEmail, async (req, res) => {
    const { email, password } = req.body;

    const user = await Users.findOne({ where: { email: email } })
    // if (!user) {
    //     res.json({ error: "user doesn't exist" })
    // }
    bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
            res.json({ error: "Email or password incorrect" })
        }
        // if user is allowed to login, it generates a token
        // let token = sign({ name: user.name, surname: user.surname, email: user.email, password: user.password, expiresIn: (+new Date() + 7200000) }, "secretKey");
        const token = sign({ id: user.id, expiresIn: (+new Date() + 7200000) }, "secretKey");

        // const name = user.name;
        // const userId = user.id;
        // user.token = token;
        // res.status(200).send({ message: "Welcome", email, token })
        res.json({ ...user.toJSON(), token })
        console.log({ ...user.toJSON() })
    })
})


// go to AuthMiddleware and check the validateToken function, if the token is valid then do the res.json(req.user)
router.get("/auth/user", validateToken, async (req, res) => {
    const user = await Users.findOne({
        where: {
            id: req.user.id
        }
    })
    res.json(user);
    console.log("userUSER, ", user)
})

router.put("/auth/edit-profile/:id", validateToken, async (req, res) => {

    const profileId = req.params.id;
    const profile = await Users.update(req.body, {
        where: {
            id: profileId
        }
    })
    res.json(profile)
})


router.post("/forgot-password", verifyEmail, async (req, res) => {
    const { email } = req.body;

    const user = await Users.findOne({ where: { email: email } });
    if (!user) {
        res.json({ error: "User doesn't exist" })
    }

    const token = sign({ id: user.id, expiresIn: (+new Date() + 7200000) }, "secretKey");

    // send verification mail to user
    var mailOptions = {
        from: `"noreply@note.app " <email.test.coding@gmail.com>`,
        to: email,
        subject: "Reset password",
        html: `<h2>Please copy the link below and paste it to your form to change the password</h2>
                <h3>${token}</h3>`
    }

    // sending token to email
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            res.send(err)
        }
        else {
            {
                res.send("A link to reset your password is sent to your email")
            }
        }
    })

    return user.update({ resetLink: token }, (error, success) => {
        if (error) {
            return res.status(400).json({ error: "Reset password link error" })
        }
        else {
            res.json({ message: "Email has been sent, reset your password" })
        }
    })

})


router.put("/reset-password", async (req, res) => {
    try {
        const { resetToken, newPassword } = req.body;
        const user = await Users.findOne({ where: { resetLink: resetToken } })

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(newPassword, salt);
        // user.password = hashPassword

        if (user) {
            user.update({
                password: hashPassword,
                resetLink: null
            })
            res.json("Your password has been changed successfully")
        }
        else {
            res.json({ error: "It seems like your token isn't a valid token. Try again now or later." })
        }
    }
    catch (error) {
        res.json(error)
    }
})


router.put("/change-password", validateToken, async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;

        const user = await Users.findOne({
            where: {
                id: req.user.id
            }
        })
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(newPassword, salt);

        bcrypt.compare(oldPassword, user.password).then((match) => {
            if (!match) {
                res.json({ error: "Incorrect old password" })
            }
            else {
                if (newPassword === confirmPassword) {
                    user.update({
                        password: hashPassword
                    })
                    res.json("Your password has been changed successfully")
                }
                else {
                    res.json({ error: "Your new password and the confirmed one doesn't match." })
                }
            }
        })
    }
    catch (error) {
        res.json(error)
    }
})

// notes
router.post("/notes/add-note", validateToken, async (req, res) => {
    try {
        const title = req.body;
        const description = req.body;
        // const user = req.user.email;
        // title.user = user;

        // res.json(req.user.email)
        if (!(title)) {
            res.json({ error: "Title must not be empty" });
        }

        const note = await Notes.create(title, description)
        res.json(note)
    }
    catch (err) {
        res.json(err)
    }
})

router.get("/notes", validateToken, async (req, res) => {
    // res.json(req.user.email)
    try {
        const notes = await Notes.findAll()
        // const notes = Notes.find({ user: req.user.email });
        res.json(notes)

    }
    catch (err) {
        res.json(error)
    }
})

router.delete("/notes/:id", validateToken, async (req, res) => {
    const noteId = req.params.id;

    await Notes.destroy({
        where: {
            id: noteId
        }
    })
    res.json("Deleted successfully")
})

// router.get("/notes/:id", validateToken, async (req, res) => {
//     const noteId = req.params.id;
//     const note = await Notes.findOne({
//         where: {
//             id: noteId
//         }
//     });

//     if (note) {
//         res.json(note);
//     } else {
//         res.json({ message: `note ${noteId} doesn't exist` })
//     }
// })



// router.get("/notes/user/:user", async (req, res) => {
//     try {
//         const notes = await Notes.find(
//             { user: req.params.user },
//             function (err, result) {
//                 if (err) throw err;
//             }
//         );
//         return res.status(200).json(notes);
//     } catch (error) {
//         return res.status(500).json({ error: error });
//     }
// });

router.get("/notes/user", validateToken, async (req, res) => {
    // res.json(req.user.email)
    try {
        const notes = await Notes.findAll()
        var filteredArray = notes.filter(item => (item.UserId === req.user.id));
        // const notes = Notes.find({ user: req.user.email });
        res.json(filteredArray)

    }
    catch (err) {
        res.json(error)
    }
})

router.put("/notes/:id", validateToken, async (req, res) => {
    const noteId = req.params.id;

    await Notes.update(req.body, {
        where: {
            id: noteId
        }
    })

    res.json(req.body)
})



module.exports = router;