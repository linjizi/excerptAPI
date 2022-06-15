const express = require("express");
const mongoose = require("./plugins/db");
const trueloveRouter = require("./routes/truelove");

const app = express();
const port = 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(trueloveRouter)
// app.get("/", (req, res) => {
//     console.log('有人访问浏览器');
//     res.send('hhh');
// })



app.listen(port, () => {
    console.log(`服务器启动成功，请访问http://localhost:${port}`);
})