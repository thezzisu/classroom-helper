import path from 'path'
import { Notification } from 'electron'
import { showWindow } from '@/backend/wm'
import { BgMod } from '@/modules/common'
import mod from './mod'
import { getConfig } from './config'

const icon = path.join(__static, 'icon.png')

const bgmod: BgMod = {
  mod,
  onReady () {
    const cfg = getConfig()
    if (cfg.enabled) {
      const day = 1000 * 60 * 60 * 24
      let target = new Date(Math.floor(Date.now() / day) * day)
      target.setHours(cfg.target.h)
      target.setMinutes(cfg.target.m)
      if (+target <= Date.now()) {
        target = new Date(+target + day)
      }
      const delta = +target - Date.now() - 10 * 60 * 1000 // 10min earlier
      const ntf = new Notification({
        title: '课堂助手',
        body: `定时关机注册：${Math.floor(delta / 1000)}秒后`,
        icon
      })
      ntf.show()
      setTimeout(() => {
        showWindow(mod.id)
      }, delta)
    }
  }
}

export default bgmod
