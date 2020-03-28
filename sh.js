
/**
 * 获取 node 参数
 * @type {[]} arguments
 */
var arguments = process.argv.splice(2);
if (arguments[0] == undefined) {
    console.log('请输入tool参数: false 或 true');
    process.exit();
}

/**
 * 0:
 * 如果使用此shell；请先配置好Chrome的环境变量
 */
shell = require('shelljs');

/**
 * 1:
 * shell one
 */
shell.exec(`npm start ` + arguments[0],
    { async: true },
    (code, stdout, stderr) => {}
);

/**
 * 2:
 * shell two
 */
shell.exec(
    `chrome --allow-file-access-from-files file:///D:/phpstudy_pro/find/index.html`,
    { async: true },
    (code, stdout, stderr) => {}
);