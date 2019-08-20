
export const template = [
    {
        label: '文件',
        submenu: [
            {
                label: '新建',
                click: function(){

                }
            },
            {
                label: '打开',
                click: function(){

                }
            },
            {
                label: '保存',
                click: function(){

                }
            },
            { type: 'separator' },
            {
                label: '打印',
                click: function(){

                }
            },
            {
                label: '退出',
                click: function(){

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
                label: '缩小',
                role: 'zoomin'
            },
            {
                label: '放大',
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
            }
        ]
    },
    {
        label: '帮助',
        submenu: [
            {
                label: '关于',
                click: function() {
                    // shell.openExternal('');
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
