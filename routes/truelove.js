const express = require("express");
const TrueloveModel = require("../model/truelove");

async function findTrueloveList (req, res, message){
    // 查询所有数据库truelove列表数据
    const truelove = await TrueloveModel.find().then(docs => {
        console.log(docs);
        res.status(200).send({truelove: docs.reverse(), message});
    }, err => {
        console.log(err.message);
        res.status(500).send(err.message);
    })
};

const router = express.Router();

// 获取列表
router.get('/getTrueloveList', async (req, res) => {
    await findTrueloveList(req, res, "成功获取纯爱小说列表！")
})
// 添加
router.post('/addTruelove', async (req, res) => {
    const truelove = new TrueloveModel({...req.body});
    // 查询数据库中是否存在该小说
    TrueloveModel.findOne({title: req.body.title}, async (err, doc) => {
        console.log("findOne", err, doc);
        if (doc) {
            res.status(500).send("该小说已存在！")
        } else {
            // 将数据保存至数据库
            await truelove.save().then(truelove => {
                console.log(truelove);
                findTrueloveList(req, res, "成功添加纯爱小说！")
            }, err => {
                console.log(err);
                res.status(500).send(err.message);
            })
        }
    })
})

// 删除
router.get("/deleteTruelove", (req, res) => {
    console.log("deleteTruelove", req.query)
    TrueloveModel.findOneAndRemove({_id: req.query.id}, async (err, doc) => {
        if(!err){
            await findTrueloveList(req, res, `成功删除${doc.title}！`);
        }else{
            res.status(500).send(err.message);
        }
    })
})

module.exports = router;