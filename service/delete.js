require('./static/js/sql-wasm.js');
var fs = require("fs");
var filebuffer = fs.readFileSync('find.sqlite');
var config = {
    // 指定加载sql-wasm.wasm文件的位置
    locateFile: filename => `./static/js/${filename}`
};
initSqlJs(config).then(SQL => {
    // 加载数据库到内存中
    var db = new SQL.Database(filebuffer);
    // 删除一行
    db.run("DELETE FROM find WHERE id=(?)", [4]);
    console.log(JSON.stringify(res));
    // [{"columns":["col1","col2"],"values":[[1,111],[2,222],[3,3333],[4,444]]}]
    // 注意：上面的增、改、删都只是对载入内存中
    var data = db.export();
    var buffer = Buffer.from(data, 'binary');
    fs.writeFileSync("find.sqlite", buffer);
    document.querySelector('#result').innerHTML = "SQLite database changed.";
});