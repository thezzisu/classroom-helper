import { ensureDirSync, writeFileSync, readFileSync, existsSync, readdirSync } from 'fs-extra'
import * as path from 'path'
import * as electron from 'electron'

const app = electron.app || electron.remote.app

const root = path.join(app.getPath('appData'), 'classroom-helper', 'config', 'cslint')
ensureDirSync(root)

const configPath = path.join(root, 'config.json')

const defaultConfig = {
  base: app.getPath('desktop'),
  rules: {
    课件: [
      '\\.pptx?$',
      '\\.docx?$',
      '\\.pdf$'
    ],
    媒体: [
      '\\.3g2$',
      '\\.3gp$',
      '\\.aaf$',
      '\\.asf$',
      '\\.avchd$',
      '\\.avi$',
      '\\.drc$',
      '\\.flv$',
      '\\.m2v$',
      '\\.m4p$',
      '\\.m4v$',
      '\\.mkv$',
      '\\.mng$',
      '\\.mov$',
      '\\.mp2$',
      '\\.mp4$',
      '\\.mpe$',
      '\\.mpeg$',
      '\\.mpg$',
      '\\.mpv$',
      '\\.mxf$',
      '\\.nsv$',
      '\\.ogg$',
      '\\.ogv$',
      '\\.qt$',
      '\\.rm$',
      '\\.rmvb$',
      '\\.roq$',
      '\\.svi$',
      '\\.vob$',
      '\\.webm$',
      '\\.wmv$',
      '\\.yuv$'
    ],
    文件: [
      '\\.xlsx?$',
      '\\.rtf$',
      '\\.txt$'
    ]
  } as { [key: string]: string[] },
  ignore: readdirSync(app.getPath('desktop'))
}

type Config = typeof defaultConfig

export function saveConfig (config: Config) {
  writeFileSync(configPath, JSON.stringify(config, null, '\t'))
}

export function getConfig () {
  if (existsSync(configPath)) {
    return JSON.parse(readFileSync(configPath).toString()) as Config
  } else {
    saveConfig(defaultConfig)
    return defaultConfig
  }
}
