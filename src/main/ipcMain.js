const { Menu, shell, ipcMain, BrowserWindow, app } = require('electron');

import { template, contextMenuTemplate } from './Menu';

let m = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(m);

let cm = Menu.buildFromTemplate(contextMenuTemplate);

// 页面的右键菜单, 通过渲染进程的通信触发
ipcMain.on('contextMenu', function() {
    cm.popup(BrowserWindow.getFocusedWindow());
});

ipcMain.on('confirmQuit', function() {
    app.quit();
});