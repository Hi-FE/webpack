import Vue from 'vue';
import Router from 'vue-router';

import main from './main'
import others from './others'

Vue.use(Router)

{{#if_in options "i18n"}}
interface Route {
  name: string
  path: string
  component(resolve: any):any
  alias?: string
  meta?: {
    bnstype?: string
  }
}

// 业务类型 划分路由
const bns_types = [
  { type: 'main', routes: main },
  { type: 'others', routes: others }
]

// 每个路由添加业务类型标记
// 用于动态加载对应语言包
const putBusinessType = (sign: string, routes: Array<Route>) => {
  return routes.map(route => {
    route.meta = route.meta || {}
    route.meta.bnstype = sign
    return route
  })
}

let routes: Array<Route> = []

bns_types.forEach(item => {
  routes = routes.concat(putBusinessType(item.type, item.routes))
})

{{else}}
const routes = [main, others]

{{/if_in}}
const router = new Router({
  mode: 'history',
  base: '/',
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      interface Position {
        x: number
        y: number
        selector?: string
      }

      const position: Position = { x: 0, y: 0 }

      if (to.hash) {
        position.selector = to.hash
      }

      return position
    }
  },
  routes
})

export default router