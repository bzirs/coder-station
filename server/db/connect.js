/**
 * 该文件负责连接数据库
 */

const mongoose = require("mongoose");

// 定义链接数据库字符串
const dbURI = "mongodb://" + process.env.DB_HOST + "/" + process.env.DB_NAME;

console.log('当前uri地址--->',dbURI)

// 连接
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.on("error", function (err) {
  console.error("连接数据库时发生错误:", err);
});

// 监听
mongoose.connection.on("connected", function () {
  console.log(`coderstation 数据库已经连接...`);
});
