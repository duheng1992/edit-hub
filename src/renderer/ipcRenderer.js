const { ipcRenderer } = require('electron');

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();

    ipcRenderer.send('contextMenu');
})