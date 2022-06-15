##1.```/addTruelove post请求```
title：小说文名<br>
cover：小说封面<br>
author：小说作者<br>
protagonist：主角<br>
firstPublish：首发<br>
copyWriting：文案<br>
##查询
```
await TrueloveModel.find({
    $or: [
        {title: {$regex: reg}},
        {author: {$regex: reg}},
        {protagonist: {$regex: reg}}
    ]
}
```