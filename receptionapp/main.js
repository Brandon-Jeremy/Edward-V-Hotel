const {app,BrowserWindow} = require('electron')

function createWindow() {
    const win = new BrowserWindow({
        width:1100,
        height:850,
        webPreference:{
            nodeIntegration:true
        }
    })
    win.webContents.openDevTools();
    win.loadFile("src/login.html")

}

app.whenReady().then(createWindow)