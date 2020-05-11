import { RouteConfig } from 'vue-router'
import cslint from './cslint/fg'
import autoshut from './autoshut/fg'
import autoimport from './autoimport/fg'
import autoconf from './autoconf/fg'
import ryfucker from './ryfucker/fg'

const modules = [cslint, autoshut, autoimport, autoconf, ryfucker]

export const routes: RouteConfig[] = modules.map(x => ({
  path: '/' + x.mod.id,
  component: x.view
}))

export const nav = modules.map(x => ({
  path: '/' + x.mod.id,
  title: x.mod.name,
  icon: x.mod.icon
}))
