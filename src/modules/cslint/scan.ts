import * as fs from 'fs-extra'
import * as path from 'path'
import { remote } from 'electron'

const desktop = remote.app.getPath('desktop')

const coursesExts = [
  /\.pptx?$/,
  /\.docx?$/,
  /\.pdf?$/
]

const mediaExts = [
  /\.3g2$/,
  /\.3gp$/,
  /\.aaf$/,
  /\.asf$/,
  /\.avchd$/,
  /\.avi$/,
  /\.drc$/,
  /\.flv$/,
  /\.m2v$/,
  /\.m4p$/,
  /\.m4v$/,
  /\.mkv$/,
  /\.mng$/,
  /\.mov$/,
  /\.mp2$/,
  /\.mp4$/,
  /\.mpe$/,
  /\.mpeg$/,
  /\.mpg$/,
  /\.mpv$/,
  /\.mxf$/,
  /\.nsv$/,
  /\.ogg$/,
  /\.ogv$/,
  /\.qt$/,
  /\.rm$/,
  /\.rmvb$/,
  /\.roq$/,
  /\.svi$/,
  /\.vob$/,
  /\.webm$/,
  /\.wmv$/,
  /\.yuv$/
]

function shouldChange (p: string) {
  const stat = fs.statSync(p)
  if (!stat.isFile()) return false
  return [...coursesExts, ...mediaExts].some(x => x.test(p))
}

function getDst (p: string) {
  if (mediaExts.some(x => x.test(p))) {
    return path.resolve(desktop, '临时媒体')
  } else if (coursesExts.some(x => x.test(p))) {
    return path.resolve(desktop, '课件')
  } else {
    return path.resolve(desktop, '未整理')
  }
}

export interface Change {
  src: string;
  dst: string;
}

export async function getChanges (): Promise<Change[]> {
  let files = await fs.readdir(desktop)
  files = files
    .map(x => path.resolve(desktop, x))
    .filter(x => shouldChange(x))
  return files.map(x => ({ src: x, dst: getDst(x) }))
}
