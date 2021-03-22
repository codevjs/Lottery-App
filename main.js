const path                            = require('path');
const { app, BrowserWindow, ipcMain}  = require('electron');
const {shuffle}                       = require("./utils");
const url                             = require("url");
const fs                              = require("fs");
const isDev                           = true;
const URL                             = isDev ? "http://localhost:3000" : url.format({
    pathname: path.join(__dirname, 'build/index.html'),
    protocol: 'file:',
    slashes: true
});

let newWindow, handleInterval;

Array.prototype.remove = function() {

    let what, a = arguments, L = a.length, ax;

    while (L && this.length) {

        what = a[--L];

        while ((ax = this.indexOf(what)) !== -1) {

            this.splice(ax, 1);
        }
    }
    return this;
};

const windowConfig = {
    width: 1020,
    height: 800,
    minWidth : 1020,
    minHeight : 800,
    resizable : true,
    frame : true,
    webPreferences: {
        contextIsolation: false,
        nodeIntegration : false,
        devTools : isDev,
        preload: __dirname + '/preload.js'
    }
}

function createWindow () {

    // Create the browser window.
    const mainWindow = new BrowserWindow(windowConfig)

    // and load the index.html of the app.
    mainWindow.loadURL(URL);

    //maximize
    mainWindow.maximize();

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
    return mainWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then( async () => {

    createWindow();

    ipcMain.on("new-window", (event, link) => {

        event.preventDefault();

        newWindow = new BrowserWindow(windowConfig);

        newWindow.loadURL(link);
    });

    ipcMain.on("start-lot", (event, value) => {

        let winners = "[]";

        if (fs.existsSync("./winners.json")) {

            winners = fs.readFileSync("./winners.json");
        }

        const jsonParse = JSON.parse(winners);

        for(let i in jsonParse) {

            if (!jsonParse.hasOwnProperty(i)) continue;

            value.customers.remove(jsonParse[i]);
        }

        handleInterval = setInterval(() => {
            try {

                const result = [...shuffle(value.customers)].slice(0, (value.numWinners));

                fs.writeFileSync("./winners.json", JSON.stringify(jsonParse.concat(result)));

                newWindow?.webContents.send("winners", {...value, customers : result});

            } catch (e) {

            }
        }, 100);

    });

    ipcMain.on("stop-lot", () => {

        clearInterval(handleInterval);
    });

    ipcMain.on("clear-lot", (event, value) => {
        try {

            newWindow?.webContents.send("winners", {...value});
        } catch (e) {

        }
    });

    ipcMain.on("reset-lot", (event, value) => {
        try {

            fs.unlinkSync("./winners.json");

            newWindow?.webContents.send("winners", {...value});
        } catch (e) {

        }
    });

    // when app activate
    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });

});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {

    if (process.platform !== 'darwin') app.quit()
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.