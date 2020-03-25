require('./static/js/sql-wasm.js');
var fs = require("fs");
var config = {
    // 指定加载sql-wasm.wasm文件的位置
    locateFile: filename => `./static/js/${filename}`
};
initSqlJs(config).then(SQL => {
    // 创建数据库
    var db = new SQL.Database();
    // 插入两行：(1,111) and (2,222)
    db.run("INSERT INTO find VALUES (?,?), (?,?)", [1,111,2,222]);
    // 将数据库导出到包含SQLite数据库文件的Uint8Array
    // export() 返回值: ( Uint8Array ) — SQLite3数据库文件的字节数组
    var data = db.export();
    // 由于安全性和可用性问题，不建议使用Buffer()和new Buffer()构造函数
    var buffer = Buffer.from(data, 'binary');
    // 被创建数据库名称
    var filename = "find.sqlite";
    fs.writeFileSync(filename, buffer);
    document.querySelector('#result').innerHTML = filename + "Created successfully.";
});