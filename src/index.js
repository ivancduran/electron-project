const {
    app,
    BrowserWindow,
    Menu
} = require('electron')
const url = require('url')
const path = require('path')

if (process.env.NODE_ENV != 'production') {
    require('electron-reload')(__dirname, {
        electorn: path.join(__dirname, '../node_modules', '.bin', 'electron')
    })
}

let mainWindow
let newProductWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        title: "My App"
    })

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }))

    const mainMenu = Menu.buildFromTemplate(templateMenu)
    Menu.setApplicationMenu(mainMenu)

    mainWindow.on('closed', () => {
        app.quit()
    })
})

const templateMenu = [{
    label: 'File',
    submenu: [{
        label: 'New Product',
        accelerator: 'Ctrl+N',
        click() {
            createNewProductWindow()
        }
    }]
}]

function createNewProductWindow() {
    newProductWindow = new BrowserWindow({
        width: 400,
        height: 400,
        title: 'New Product'
    })

    newProductWindow.setMenu(null)

    newProductWindow.loadURL(url.format({
        pathname:path.join(__dirname, 'views/new.html'),
        protocol: 'file',
        slashes: true
    }))

}