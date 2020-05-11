import { BgMod } from '@/modules/common'
import electron from 'electron'
import chokidar from 'chokidar'
import fs from 'fs-extra'
import path from 'path'
import mod from './mod'

const app = electron.app || electron.remote.app

const root = path.join(app.getPath('appData'), 'classroom-helper', 'config', 'autoconf')

const bgmod: BgMod = {
  mod,
  onReady: () => {
    const watcher = chokidar.watch(root)
    watcher.on('add', (path) => {
      if (path.endsWith('.restart')) {
        fs.unlinkSync(path)
        app.relaunch()
      }
    })
  }
}

export default bgmod
