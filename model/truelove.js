
const {model, Schema} = require("mongoose");


const trueloveSchema = new Schema({
    title: String,
    tags: [String],
    author: String,
    protagonist: String,
    firstPublish: String,
    copyWriting: String
})

const TrueloveModel = model("Truelove", trueloveSchema);

module.exports = TrueloveModel