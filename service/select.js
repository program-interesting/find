//查询SQL
selectSql = function (tag, res, filebuffer, config) {
    initSqlJs(config, tag, res).then(SQL => {
        // 加载数据库到内存中
        var db = new SQL.Database(filebuffer);
        var result = db.exec("SELECT * FROM find WHERE tag=(?)", [tag]);
        console.log(JSON.stringify(result));
        //处理空数组
        var back_res = result[0] ? result[0].values : [];
        res.send(JSON.stringify(back_res));
    });
};