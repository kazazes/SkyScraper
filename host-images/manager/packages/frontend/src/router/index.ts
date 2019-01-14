/**
 * Vue Router
 *
 * @library
 *
 * https://router.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import Meta from 'vue-meta'

// Routes
import paths from './paths'

function route (path: string, view: string, name: string | undefined) {
  return {
    name: name || view,
    path,
    component: (resovle: ((value: any) => any) | null | undefined) =>
      import(`@/views/${view}.vue`).then(resovle)
  }
}

Vue.use(Router)

const routerPaths: RouteConfig[] = paths.map(path =>
  route(path.path, path.view, path.name)
)

// Create a new router
const router = new Router({
  mode: 'history',
  routes: routerPaths.concat([{ path: '*', redirect: '/dashboard' }]),
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})

Vue.use(Meta)

export default router
