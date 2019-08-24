const { BrowserWindow, shell } = require('electron');
export const template = [
    {
        label: '文件111',
        submenu: [
            {
                label: '新建',
                click: function(){
                    BrowserWindow.getFocusedWindow().webContents.send('action', 'new');
                }
            },
            {
                label: '打开',
                accelerator: 'Command+O',
                click: function(){ 
                    // 主进程通知渲染进程
                    BrowserWindow.getFocusedWindow().webContents.send('action', 'open');
                }
            },
            {
                label: '保存',
                accelerator: 'Command+S',
                click: function(){
                    BrowserWindow.getFocusedWindow().webContents.send('action', 'save');
                }
            },
            { type: 'separator' },
            {
                label: '打印',
                accelerator: 'Command+P',
                click: function(){
                    BrowserWindow.getFocusedWindow().webContents.print();
                }
            },
            {
                label: '退出',
                accelerator: 'Command+Q',
                click: function(){
                    // 提示渲染进程保存文件
                    BrowserWindow.getFocusedWindow().webContents.send('action', 'quit');
                }
            }
        ]
    },
    {
        label: '编辑',
        submenu: [
            {
                label: '撤销',
                role: 'undo'
            },
            {
                label: '恢复',
                role: 'redo'
            },
            {
                label: '剪切',
                role: 'cut'
            },
            {
                label: '复制',
                role: 'copy'
            },
            {
                label: '粘贴',
                role: 'paste'
            },
            {
                label: '删除',
                role: 'delete'
            },
            {
                label: '全选',
                role: 'selectAll'
            }
        ]
    },
    {
        label: '视图',
        submenu: [
            {
                label: '放大',
                role: 'zoomin'
            },
            {
                label: '缩小',
                role: 'zoomout'
            },
            {
                label: '重置缩放',
                role: 'resetzoom'
            },
            { type: 'separator' },
            {
                label: '全屏',
                role: 'togglefullscreen'
            },
            {
                label: '刷新',
                role: 'reload'
            }
        ]
    },
    {
        label: '帮助',
        submenu: [
            {
                label: '关于',
                click: function() {
                    shell.openExternal('http://122.112.216.70:1818/');
                }
            },
        ]
    },
    
]

export const contextMenuTemplate = [
    {
        label: '撤销',
        role: 'undo'
    },
    {
        label: '恢复',
        role: 'redo'
    },
    {
        label: '剪切',
        role: 'cut'
    },
    {
        label: '复制',
        role: 'copy'
    },
    {
        label: '粘贴',
        role: 'paste'
    },
    {
        label: '删除',
        role: 'delete'
    },
    {
        label: '全选',
        role: 'selectAll'
    }
]
