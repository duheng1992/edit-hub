const { Menu, ipcMain, BrowserWindow, app, Tray } = require('electron');
const path = require('path'); 

import { template, contextMenuTemplate, tpl } from './Menu';

let m = Menu.buildFromTemplate(template);
let cm = Menu.buildFromTemplate(contextMenuTemplate);
let tplm = Menu.buildFromTemplate(tpl);

Menu.setApplicationMenu(m);

// 页面的右键菜单, 通过渲染进程的通信触发
ipcMain.on('contextMenu', function() {
    cm.popup(BrowserWindow.getFocusedWindow());
});

ipcMain.on('confirmQuit', function() {
    app.quit();
});

// console.log(tpl)
// 系统托盘
const iconTray = new Tray(path.join(__dirname, '../static/icon/lover.png'));

iconTray.setContextMenu(tplm);
iconTray.setToolTip('edit-hub');

// 这里获取的为什么是null
// const curWin = BrowserWindow.getFocusedWindow()
// curWin.on('close', function(e) {
//     // 阻止窗口关闭
//     e.preventDefault();
//     // 隐藏到托盘
//     curWin.hide();
// });

// iconTray.on('double-click', function() {
//     // 双击托盘图标， 显示窗口
//     curWin.show();
// });