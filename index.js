require('./service/api.js');
const { app, BrowserWindow, Menu, Tray} = require('electron');
const path = require('path');
var start_tool = process.argv.splice(2)[0];
function createWindow () {
    // 隐藏菜单栏
    Menu.setApplicationMenu(null);
    // 创建浏览器窗口
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            //preload: configJs,
            nodeIntegration: true
        }
    });
    // 并且为你的应用加载index.html
    win.loadFile('index.html');
    //加载端口
    //win.loadURL('http://localhost:9898/');
    // 打开开发者工具
    if (start_tool === 'true') {
        win.webContents.openDevTools()
    }
    //系统图标
    var Icon = path.resolve(__dirname, 'static/imgs/find.ico');
    console.log(Icon);
    var tray = new Tray(Icon);
    tray.setImage('D:\\phpstudy_pro\\find\\static\\imgs\\find.ico');
   /* //设置此托盘图标的悬停提示内容
    tray.setToolTip('Fin My Self');
    //单击右下角小图标显示应用
    tray.on('click',function(){
        win.show();
    });*/
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
});