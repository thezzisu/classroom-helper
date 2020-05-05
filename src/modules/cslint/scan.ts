import * as fs from 'fs-extra'
import { app } from 'electron'

export async function getChanges () {
  const desktop = app.getPath('desktop')
  const files = await fs.readdir(desktop)
  return []
}
