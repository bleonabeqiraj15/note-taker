const cors = require("cors");
const express = require("express");
const app = express();

app.use(express.json());

const db = require("./models");
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "DELETE", "PUT"],
        credentials: true
    }));

console.log(db)

const appRoutes = require("./routes/Routes")
app.use("/", appRoutes)


db.sequelize.sync().then(() => {
    app.listen(3002, () => {
        console.log("server is running")
    })
})

