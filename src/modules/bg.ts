import cslint from './cslint/bg'
import autoshut from './autoshut/bg'

export const modules = [cslint, autoshut]

export function onReady () {
  for (const mod of modules) {
    mod.onReady && mod.onReady()
  }
}
