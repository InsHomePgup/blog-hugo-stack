import { createRouter, createWebHashHistory } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

if (import.meta.hot) {
  handleHotUpdate(router, (newRoutes) => {
    router.clearRoutes()
    for (const route of newRoutes)
      router.addRoute(route)
  })
}

export default router
