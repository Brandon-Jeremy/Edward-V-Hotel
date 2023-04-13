const {app,BrowserWindow} = require('electron')

function createWindow() {
    const win = new BrowserWindow({
        width:800,
        height:600,
        webPreference:{
            nodeIntegration:true
        }
    })
    win.webContents.openDevTools();
    win.loadFile("src/index.html")

}

app.whenReady().then(createWindow)