const express = require("express");
const app = express();
const mongoose = require("mongoose");


//middleware

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect DB
const connectDB = async() => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/StudentsDB");
        console.log(`Hey Shimul I am created name "StudentDB"`);
    } catch (error) {
        console.log("Hey shimul i am seak");
    }
}

//create schema
const dbSchema = new mongoose.Schema({
    firstName: String,
    secondName: String,
    dept: String,
    id: String,
});

//create DB model

const user = mongoose.model("users", dbSchema);



app.get("/", (req, res) => {
    res.send("Hello Server my Friend :)");
});

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.post("/register", async(req, res) => {
    try {

        //save data

        const newUser = new user({
            firstName: req.body.firstName,
            secondName: req.body.secondName,
            dept: req.body.dept,
            id: req.body.id,
            file: req.body.file,
        });

        const User = await newUser.save();
        res.send(User);

    } catch (error) {
        console.log(error);
    }
});


//product find
app.get("/user/:id", async(req, res) => { //use id to find individual item
    try {
        const id = req.params.id;
        const findData = await user.find({ _id : id });  //model theke amra data find kori

        // res.send(findData);
        if (findData) {
            res.send(findData);
        } else {
            res.send({
                message: "Something error",
            });
        }

    } catch (error) {
        res.send(error.message);
    }
})


app.listen(3200, () => {
    console.log("I am from Rajshahi and connected ti your server");
    connectDB();
})