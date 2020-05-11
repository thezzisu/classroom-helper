'use strict'

import path from 'path'
import { app, protocol, Notification } from 'electron'
import { installVueDevtools } from 'vue-cli-plugin-electron-builder/lib'
import { getConfig } from '@/common/config'
import { showWindow, createWindow } from '@/backend/wm'
import { createTray } from '@/backend/tray'
import { onReady } from '@/modules/bg'

const isDevelopment = process.env.NODE_ENV !== 'production'

protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

const icon = path.join(__static, 'icon.png')

if (app.requestSingleInstanceLock()) {
  app.on('window-all-closed', () => {
    const ntf = new Notification({
      title: '课堂助手',
      body: '正在后台运行',
      icon
    })
    ntf.show()
  })

  app.on('activate', () => {
    showWindow()
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
    app.setLoginItemSettings({ openAtLogin: config.autoStart })
    if (!config.hideOnStart) {
      createWindow()
    }
    onReady()
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
