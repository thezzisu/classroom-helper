import fs from 'fs-extra'
import path from 'path'
import { getConfig } from './config'

function getDst (p: string) {
  const name = path.basename(p)
  if (name.startsWith('~$')) return '#remove'
  const cfg = getConfig()
  for (const key in cfg.rules) {
    if (cfg.rules[key].some(k => new RegExp(k).test(name))) {
      return key
    }
  }
  return '未整理'
}

export interface Change {
  src: string;
  dst: string;
}

export async function getChanges (): Promise<Change[]> {
  const cfg = getConfig()
  let files = await fs.readdir(cfg.base)
  files = files
    .filter(x => !cfg.ignore.includes(x))
    .map(x => path.resolve(cfg.base, x))
  return files.map(x => ({ src: x, dst: getDst(x) }))
}
