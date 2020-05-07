import { BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import path from 'path'

let win: BrowserWindow | null

export function createWindow (module?: string) {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false,
    icon: path.join(__static, 'icon.png')
  })

  const base = process.env.WEBPACK_DEV_SERVER_URL || 'app://./index.html'
  win.loadURL(module ? base + '/#/' + module : base)

  win.on('closed', () => {
    win = null
  })
}

export function isWindowOpen () {
  return !!win
}

export function showWindow (module?: string) {
  if (win) {
    win.show()
    module && win.webContents.executeJavaScript(`location.hash = '#/${module}'`)
  } else {
    createWindow(module)
  }
}
