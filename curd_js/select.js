require('./static/js/sql-wasm.js');
var fs = require("fs");
var filebuffer = fs.readFileSync('d.sqlite');
var config = {
    // 指定加载sql-wasm.wasm文件的位置
    locateFile: filename => `./static/js/${filename}`
};
initSqlJs(config).then(SQL => {
    // 加载数据库到内存中
    var db = new SQL.Database(filebuffer);
    var res = db.exec("SELECT * FROM find");
    console.log(JSON.stringify(res));
    // [{"columns":["col1","col2"],"values":[[1,111],[2,222]]}]
});