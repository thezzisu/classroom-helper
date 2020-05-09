import cslint from './cslint/bg'
import autoshut from './autoshut/bg'
import autoimport from './autoimport/bg'

export const modules = [cslint, autoshut, autoimport]

export function onReady () {
  for (const mod of modules) {
    mod.onReady && mod.onReady()
  }
}
