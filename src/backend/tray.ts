import path from 'path'
import { Tray, Menu, app } from 'electron'
import { showWindow } from './wm'
import { modules } from '@/modules/bg'

let tray: Tray | null

export function createTray () {
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '模块',
      submenu: [
        ...modules.map(x => ({ label: x.mod.name, click: () => { showWindow(x.mod.id) } }))
      ]
    },
    { type: 'separator' },
    { label: '显示界面', click: () => { showWindow() } },
    { label: '退出', click: () => { app.quit() } }
  ])
  tray = new Tray(path.join(__static, 'icon.png'))
  tray.setContextMenu(contextMenu)
  tray.on('double-click', () => { showWindow() })
}
