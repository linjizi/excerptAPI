const {Schema, model} = require("mongoose");

const extractSchema = new Schema({
    date: String,
    extract: String,
    source: String,
    author: String,
    remark: String
});

module.exports = model("extract", extractSchema);