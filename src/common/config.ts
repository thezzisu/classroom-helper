import { ensureDirSync, writeFileSync, readFileSync, existsSync } from 'fs-extra'
import * as path from 'path'
import * as electron from 'electron'

const app = electron.app || electron.remote.app

const root = path.join(app.getPath('appData'), 'classroom-helper', 'config')
ensureDirSync(root)

const configPath = path.join(root, 'config.json')

const defaultConfig = {
  autoStart: true,
  hideOnStart: true
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
