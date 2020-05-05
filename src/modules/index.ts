import { RouteConfig } from 'vue-router'
import autoshutdown from './cslint'

const modules = [autoshutdown]

export const routes: RouteConfig[] = modules.map(x => ({
  path: '/' + x.id,
  component: x.view
}))

export const nav = modules.map(x => ({
  path: '/' + x.id,
  title: x.name,
  icon: x.icon
}))
