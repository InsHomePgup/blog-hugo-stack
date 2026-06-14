import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', () => {
  const isDark = ref(false)
  const drawerVisible = ref(false)

  watch(isDark, (val) => {
    document.documentElement.setAttribute('theme-mode', val ? 'dark' : 'light')
  }, { immediate: true })

  return { isDark, drawerVisible }
}, {
  persist: { key: 'blog-editor-ui', pick: ['isDark'] },
})
