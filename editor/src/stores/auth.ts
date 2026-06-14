import { defineStore } from 'pinia'

const OAUTH_BASE = 'https://blog-cms-oauth-one.vercel.app'
const REPO = 'InsHomePgup/blog-hugo-stack'
const BRANCH = 'main'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<{ login: string; avatar_url: string } | null>(null)

  const isLoggedIn = computed(() => !!token.value)

  function login() {
    const popup = window.open(
      `${OAUTH_BASE}/auth`,
      'github-oauth',
      'width=600,height=700,left=200,top=100',
    )

    if (!popup) {
      alert('请允许浏览器弹出窗口后重试')
      return
    }

    const onMessage = async (event: MessageEvent) => {
      if (typeof event.data !== 'string')
        return

      // 代理先发 "authorizing:github"，需要回应以告知来源
      if (event.data === 'authorizing:github') {
        popup.postMessage(event.data, event.origin)
        return
      }

      if (event.data.startsWith('authorization:github:success:')) {
        const json = event.data.replace('authorization:github:success:', '')
        const data = JSON.parse(json)
        token.value = data.token
        window.removeEventListener('message', onMessage)
        popup.close()
        await fetchUser()
      }

      if (event.data.startsWith('authorization:github:error:')) {
        console.error('OAuth error:', event.data)
        window.removeEventListener('message', onMessage)
      }
    }

    window.addEventListener('message', onMessage)
  }

  function logout() {
    token.value = null
    user.value = null
  }

  async function fetchUser() {
    if (!token.value)
      return
    const res = await fetch('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${token.value}` },
    })
    user.value = await res.json()
  }

  return { token, user, isLoggedIn, login, logout, fetchUser, REPO, BRANCH }
}, {
  persist: { key: 'blog-editor-auth', pick: ['token', 'user'] },
})
