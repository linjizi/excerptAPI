// 引入express
const express = require("express");
// 引入ExtractSchema
const ExtractSchema = require("../model/extract");
const dayjs = require('dayjs');

// 查询
const getExtractList = (req, res, message) => {
    ExtractSchema.find().then(docs => {
        res.status(200).send({extract: docs.reverse(), message});
    }, err => {
        res.status(500).send(err.message);
    })
}

const router = express.Router();

// 获取列表
router.get("/getExtractList", (req, res) => {
    getExtractList(req, res, "成功获取句子列表数据！");
})

// 添加
router.post("/addExtract", (req, res) => {
    console.log("req.body.extract" );
    // 查重
    ExtractSchema.findOne({extract: req.body.extract}, (err, doc) => {
        console.log("err", err)
        if(!doc){
            // 获取日期
            const date = dayjs().format("YYYY-MM-DD");
            const extract = new ExtractSchema({...req.body, date});
            extract.save().then(() => {
                getExtractList(req, res, "成功添加！");
            }, err => {
                res.status(500).send(err.message);
            });
        }else{
            res.status(500).send("添加失败，该句子已存在！");
        }
    });
})

// 删除
router.get("/delExtract", (req, res) => {
    ExtractSchema.findByIdAndRemove(req.query.id).then(() => {
        getExtractList(req, res, "成功删除！");
    }, err => {
        res.status(500).send(err.message);
    })
})


module.exports = router