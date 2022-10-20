const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

//image static folder
app.use("/public", express.static("public"));

//mongodb connected
mongoose
    .connect("mongodb://localhost:27017/casperon", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        })
    .then(() => {
        console.log("DB CONNECTED");
    });

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});

//api routes
const authRoutes = require("./routes/auth.js");
const productRoutes = require("./routes/product");

app.use("/api", authRoutes);
app.use("/api", productRoutes);
const port = 8000;
console.log("sdnajkd")

//port connect
app.listen(port, () => {
    console.log(`app is running at ${port}`);
});
