//插入SQL
insertSql = function (tag, content, res, fs, filebuffer, config) {
    initSqlJs(config, tag, res).then(SQL => {
        // 加载数据库到内存中
        var db = new SQL.Database(filebuffer);
        var result = db.run("INSERT INTO find (tag, content) VALUES (?,?)", [tag, content]);
        console.log(JSON.stringify(result));
        //持久化数据
        var data   = db.export();
        var buffer = Buffer.from(data, 'binary');
        fs.writeFileSync("find.sqlite", buffer);
    });
};