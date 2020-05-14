import cslint from './cslint/bg'
import autoshut from './autoshut/bg'
import autoimport from './autoimport/bg'
import autoconf from './autoconf/bg'
import xhfucker from './xhfucker/bg'

export const modules = [cslint, autoshut, autoimport, autoconf, xhfucker]

export function onReady () {
  for (const mod of modules) {
    mod.onReady && mod.onReady()
  }
}
