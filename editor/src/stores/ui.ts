import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', () => {
  const drawerVisible = ref(false)

  document.documentElement.setAttribute('theme-mode', 'light')

  return { drawerVisible }
})
