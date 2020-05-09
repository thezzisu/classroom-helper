import { BgMod } from '@/modules/common'
import { getWindow } from '@/backend/wm'
import chokidar from 'chokidar'
import mod from './mod'
import { getConfig } from './config'

const bgmod: BgMod = {
  mod,
  onReady: () => {
    const cfg = getConfig()
    const watcher = chokidar.watch(cfg.base)
    watcher.on('all', () => {
      const win = getWindow()
      if (!win) return
      win.webContents.send('cslint-fschanged')
    })
  }
}

export default bgmod
