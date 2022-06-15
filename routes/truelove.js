const express = require("express");
const TrueloveModel = require("../model/truelove");

// 查询列表
async function findTrueloveList (req, res, message){
    // 查询所有数据库truelove列表数据
    await TrueloveModel.find().then(docs => {
        res.status(200).send({truelove: docs.reverse(), message});
    }, err => {
        console.log(err.message);
        res.status(500).send(err.message);
    });
};

const router = express.Router();

// 获取列表
router.get('/getTrueloveList', async (req, res) => {
    await findTrueloveList(req, res, "成功获取纯爱小说列表！")
})
// 添加
router.post('/addTruelove', async (req, res) => {
    console.log('/addTruelove', req.body)
    const truelove = new TrueloveModel({...req.body});
    // 查询数据库中是否存在该小说
    TrueloveModel.findOne({title: req.body.title}, async (err, doc) => {
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
    TrueloveModel.findByIdAndRemove(req.query.id, async (err, doc) => {
        if(!err){
            await findTrueloveList(req, res, `成功删除${doc.title}！`);
        }else{
            res.status(500).send(err.message);
        }
    });
});

// 编辑
router.post("/editTruelove", (req, res) => {
    console.log("/editTruelove", req.body);
    const {title, tags, author, protagonist, firstPublish, copyWriting} = req.body;
    TrueloveModel.findByIdAndUpdate(req.body._id, {title, tags, author, protagonist, firstPublish, copyWriting},async (err, doc) => {
        if(!err){
            await findTrueloveList(req, res, `成功修改${doc.title}！`);
        }else{
            res.status(500).send(err.message);
        }
        console.log(err, doc)
    })
})

// 查询
router.get("/searchTruelove", async (req, res) => {
    const reg = new RegExp(req.query.keyWord, 'i')
    await TrueloveModel.find({
       $or: [
           {title: {$regex: reg}},
           {author: {$regex: reg}},
           {protagonist: {$regex: reg}}
       ]
    }).then(docs => {
        console.log("res", docs)
        if(docs.length) {
            res.status(200).send({truelove: docs.reverse(), message: "成功查询列表数据！"});
        }else{
            res.status(404).send("数据不存在！");
        }
    }, err => {
        console.log("err", err)
        res.status(500).send( "查询列表数据失败！");
    })
})
module.exports = router;


