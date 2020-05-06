import { RouteConfig } from 'vue-router'
import cslint from './cslint'
import autoshut from './autoshut'

const modules = [cslint, autoshut]

export const routes: RouteConfig[] = modules.map(x => ({
  path: '/' + x.id,
  component: x.view
}))

export const nav = modules.map(x => ({
  path: '/' + x.id,
  title: x.name,
  icon: x.icon
}))
