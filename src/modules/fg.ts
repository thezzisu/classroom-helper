import { RouteConfig } from 'vue-router'
import cslint from './cslint/fg'
import autoshut from './autoshut/fg'

const modules = [cslint, autoshut]

export const routes: RouteConfig[] = modules.map(x => ({
  path: '/' + x.mod.id,
  component: x.view
}))

export const nav = modules.map(x => ({
  path: '/' + x.mod.id,
  title: x.mod.name,
  icon: x.mod.icon
}))
