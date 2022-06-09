const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const shortId = require('shortid')


const shorten = new mongoose.Schema({
    original_url: {
        type: String,
        required: true
    },
    short_url: {
        type: String,
        required: true,
    },
    url_clicks: {
        type: Number,
        required: true,
        default: 0
    }
})

const Shortner = mongoose.model('Shortner', shorten)
module.exports = Shortner;