const express = require("express");
require("./plugins/db");
//引入trueloveRouter
const trueloveRouter = require("./routes/truelove");
//引入extractRouter
const extractRouter = require("./routes/extract");

const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(trueloveRouter);
app.use(extractRouter);

// app.get("/", (req, res) => {
//     console.log('有人访问浏览器');
//     res.send('hhh');
// })



app.listen(port, () => {
    console.log(`服务器启动成功，请访问http://localhost:${port}`);
})