//查询SQL
selectSql = function (tag, res, filebuffer, config, isAll=false) {
    initSqlJs(config, tag, res).then(SQL => {
        // 加载数据库到内存中
        var db = new SQL.Database(filebuffer);
        //兼容标签
        if (isAll) {
            var result = db.exec("SELECT tag FROM find");
            //处理空数组
            var back_res = result[0] ? result[0].values : [];
            var len = back_res.length; var back_res_real = [];
            for (var i=0; i<len; i++) {
                back_res_real[i] = back_res[i][0];
            }
            //set数据结构: 去重
            var back_res = Array.from(new Set(back_res_real));
        } else {
            var result = db.exec("SELECT * FROM find WHERE tag like \'%"+tag+"%\'");
            //处理空数组
            var back_res = result[0] ? result[0].values : [];
        }
        console.log(JSON.stringify(back_res));
        res.send({'code':0, 'msg':'ok', 'data':back_res});
    });
};