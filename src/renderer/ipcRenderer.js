const { ipcRenderer, remote } = require('electron');
const fs = require('fs');
const dialog = remote.dialog;
const bw = remote.BrowserWindow;

// let contentDOM = document.querySelector('#content');
let COMMON = {
    isSaved: true,
    currentFIlePath: null,
}

const savedFlag = '*';

// 如何设置支持多种语言？？这个默认通过文件名后缀判断
const mixedMode = {
    name: 'htmlmixed',
    scriptTypes: [
        {matches: /\/x-handlebars-template|\/x-mustache/i, mode: null},
        {matches: /(text|application)\/(x-)?vb(a|script)/i, mode: 'vbscript'},
    ]
}

const langMode = {
    'java': 'x-java',
    'html': mixedMode,
    'js': 'text/javascript',
    'c': 'text/x-csrc',
    'cpp': 'text/x-c++src"',
    'scala': 'text/x-scala',
}

function getSuffix(dir){
    if(dir){
        let index1 = dir.lastIndexOf(".");
        let index2 = dir.length;
        return dir.substring(index1 + 1, index2);  //后缀名
    } else {
        return false;
    }
}

let editor = CodeMirror.fromTextArea(document.getElementById('content'), {
    mode: mixedMode,
    lineNumbers: true,
    theme: 'paraiso-dark'
});

document.title = '新建文档';

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    // 给主进程通信
    ipcRenderer.send('contextMenu');
})

editor.on("change", function (Editor, changes) {
    if(COMMON.isSaved){
        COMMON.isSaved = false;
        document.title += (' ' + savedFlag);
    }
});

// 接收主进程传入的动作
ipcRenderer.on('action', function(e, action){
    // console.log(action)
    switch(action) {
        case 'new':
            // 判断文件是否保存
            saveGuard(function(){
                setDomValue('');
                document.title = '新建文档';
                setCurrentFilePath();
            });
            break;
        case 'open':
            saveGuard(open);
            break;
        case 'save':
            save(function(){});    
            break;
        case 'quit':
            saveGuard(function(){
                // 通知主进程退出
                ipcRenderer.send('confirmQuit');
            });
            break;
    }
});

function getIsSaved() {
    return COMMON.isSaved;
}

function setIsSaved(saved) {
    COMMON.isSaved = saved;
    document.title  = document.title.split('*')[0];
}

function getCurrentFIlePath() {
    return COMMON.currentFIlePath;
}

function setCurrentFilePath(path) {
    if(path){
        COMMON.currentFIlePath = path;
        document.title = path;
    } else {
        COMMON.currentFIlePath = '';
    }
}

function setDomValue(data) {
    editor.setValue(data);
}

function getDomValue() {
    return editor.getValue();
}

function saveGuard(fn){
    if(!getIsSaved()) {
        dialog.showMessageBox(bw.getFocusedWindow(), {
            type: 'question',
            message: '是否要保存此文件？',
            buttons: ['Yes', 'No'],
        }, function(index){
            if(index === 1){
                fn();
            }
            if(index === 0){
                save(fn);
            }
        });
    } else {
        fn();
    }
}

function save(fn) {
    if(!getCurrentFIlePath()){
        dialog.showSaveDialog(bw.getFocusedWindow(), {
            defaultPath: 'new file.txt',
            filters: [
                {name: 'All files', extensions: ['*']}
            ]
        }, function(dir){
            if(dir) { 
                fs.writeFile(dir, getDomValue(), function(err){
                    if(!err){
                        setIsSaved(true);
                        setCurrentFilePath(dir);
                        fn();
                    }
                });
            }
        });
    } else {
        // 当前保存目录存在
        fs.writeFile(COMMON.currentFIlePath, getDomValue(), function(err){
            if(!err){
                setIsSaved(true);
                fn();
            }
        });
    }
}

function open() {
    dialog.showOpenDialog(bw.getFocusedWindow(), {
        properties: ['openFile'],
    }, function(dir){
        // console.log(dir)
        // dir是选择的文件目录，这里需读取文件
        if(dir && dir.length){
            fs.readFile(dir[0], function(err, data){
                if(!err){
                    setDomValue(data);
                    setCurrentFilePath(dir[0]);
                    setIsSaved(true);
                } else {
                    dialog.showErrorBox('出错了', '读取文件失败！');
                }
            });
        } else {
            // dialog.showErrorBox('出错了', '读取文件失败！');
        }
    });
}
