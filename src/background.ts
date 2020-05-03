'use strict'

import path from 'path'
import { app, protocol, BrowserWindow, Tray, Menu, Notification } from 'electron'
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib'
import { getConfig } from './common/config'

const isDevelopment = process.env.NODE_ENV !== 'production'

protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

let win: BrowserWindow | null
let tray: Tray | null
const icon = path.join(__static, 'icon.png')

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false,
    icon: icon
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
}

function createTray () {
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show', click: () => { win ? win.show() : createWindow() } },
    { label: 'Quit', click: () => { app.quit() } }
  ])
  tray = new Tray(icon)
  tray.setContextMenu(contextMenu)
  tray.on('double-click', () => { win ? win.show() : createWindow() })
}

if (app.requestSingleInstanceLock()) {
  app.on('window-all-closed', () => {
    const ntf = new Notification({
      title: 'Classroom helper',
      body: 'running in background',
      icon
    })
    ntf.show()
  })

  app.on('activate', () => {
    if (win === null) {
      createWindow()
    }
  })

  app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
      // Install Vue Devtools
      try {
        await installVueDevtools()
      } catch (e) {
        console.error('Vue Devtools failed to install:', e.toString())
      }
    }
    createTray()
    const config = getConfig()
    if (!config.hideOnStart) {
      createWindow()
    }
  })

  // Exit cleanly on request from parent process in development mode.
  if (isDevelopment) {
    if (process.platform === 'win32') {
      process.on('message', data => {
        if (data === 'graceful-exit') {
          app.quit()
        }
      })
    } else {
      process.on('SIGTERM', () => {
        app.quit()
      })
    }
  }
} else {
  app.quit()
}
