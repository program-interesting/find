/**
 * Class Luck
 * User : LuckLiDi
 * Email: fomo3d.wiki@gmail.com
 */

/**
 * 载入：数据库sql.js
 */
require('../static/js/sql-wasm.js');
/**
 * Express扩展
 */
const express = require('express');
const exp = express();
const bodyParser = require('body-parser');
var fs = require("fs");
/**
 * sqlite数据库
 */
var filebuffer = fs.readFileSync('./find.sqlite');
/**
 * sql-wasm.wasm文件
 * @type {{locateFile: (function(*): string)}}
 */
var config = {
    locateFile: filename => `./static/js/${filename}`
};
/**
 * Post提交最大内容
 */
exp.use(bodyParser.json({limit: '20mb'}));
exp.use(bodyParser.urlencoded({limit: '20mb', extended: false}));
exp.use(bodyParser.text());
/**
 * 解决跨域问题
 */
exp.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",'Find v0.0.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
/**
 * 载入：查询SQL方法
 */
require('../service/select.js');
//按照标签：查询
exp.get('/select/:tag?', function(req, res){
    //为空返回
    if(Object.keys(req.params).length === 0) {
        return res.send({'code':400, 'msg':'not'});
    }
    var tag = req.params.tag;
    //add 模糊查询
    selectSql(tag, res, filebuffer, config);
});
//所有标签：查询
exp.get('/all/tags', function(req, res){
    selectSql(false, res, filebuffer, config, true);
});

/**
 * 载入：插入SQL方法
 */
require('../service/insert.js');
//按照标签：插入
exp.post('/insert/tag/content', function(req, res){
    //为空返回
    if(Object.keys(req.body).length === 0) {
        return res.send({'code':400, 'msg':'not'});
    }
    console.log(req.body);
    var tag     = req.body.tag;
    var content = req.body.content;
    insertSql(tag, content, res, fs, filebuffer, config);
    res.send({'code':0, 'msg':'ok'});
});

//退出登录
exp.get('/logout', function (req, res) {
    res.send({'code':0, 'msg':'ok'});
});

//成功跳转
exp.get('/success', (req, res)=>res.send({'code':0, 'msg':'ok'}));

//你好世界
exp.get('/', function (req, res) {
    res.send({'code':0, 'msg':'ok'});
});

//监听9898端口
exp.listen(9898, () => {
    console.log({'code':0, 'msg':'ok'});
});