import path from 'path'
import { Notification } from 'electron'
import { showWindow } from '@/backend/wm'
import mod from './mod'

const icon = path.join(__static, 'icon.png')

export default {
  mod,
  onReady () {
    const day = 1000 * 60 * 60 * 24
    let target = new Date(Math.floor(Date.now() / day) * day)
    target.setHours(9)
    target.setMinutes(20)
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
