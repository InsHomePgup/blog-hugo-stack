import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'
import BaseLayout from '@/Layout/BaseLayout.vue'

function wrapRoutes(autoRoutes: RouteRecordRaw[]) {
  return [
    {
      path: '/',
      component: BaseLayout,
      children: autoRoutes.map(r => ({
        ...r,
        path: r.path === '/' ? '' : r.path.slice(1),
      })),
    },
  ]
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: wrapRoutes(routes),
})

if (import.meta.hot) {
  handleHotUpdate(router, (newRoutes) => {
    router.clearRoutes()
    for (const route of wrapRoutes(newRoutes)) {
      router.addRoute(route)
    }
  })
}

export default router
