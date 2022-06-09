const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Shortner = require('./Models/model')
const shortId = require('shortid')
const { findById } = require('./Models/model')
require("dotenv").config()

// express app
const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.URL, {
    useNewUrlParser: true
}).then(() => console.log("connected")).catch((err) => console.log(err));
app.get("/", (req, res) => {
    res.send("Not the link you were looking for !")
})
app.get("/:id", async (req, res) => {
    try {
        let id2 = req.params.id;
        console.log(id2)
        const urlfind = await Shortner.find({ short_url: { $eq: id2 } })
        res.status(200).redirect(urlfind[0].original_url)
    } catch (err) {
        res.status(404).send(err)
    }
})

app.post('/create', async (req, res) => {
    try {
        const original = req.body.original;
        console.log(req.body)
        const shorturl = shortId.generate();
        console.log(shorturl)
        const url = new Shortner({ original_url: original, short_url: shorturl })
        await url.save()
        res.status(200).send(shorturl)
    } catch (err) {
        res.status(400).send(err);
    }
})

app.listen(process.env.PORT || 8080, () => {
    console.log("server is running")
})


