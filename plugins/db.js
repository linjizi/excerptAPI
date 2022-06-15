// 用于连接数据库

const mongoose = require('mongoose');

const ip = "localhost";
const port = "27017";
const dbName = "excerpt";

mongoose.connect(`mongodb://${ip}:${port}/${dbName}`);

// 数据库连接成功
mongoose.connection.on('connected', () => {
    console.log('数据库连接成功！');
});

// 数据库连接失败
mongoose.connection.on('error', error => {
    console.log(`数据库连接失败，${error}`);
});

// 数据库连接断开
mongoose.connection.on('disconnected', () => {
    console.log('数据库连接已断开！');
});

module.exports = mongoose;