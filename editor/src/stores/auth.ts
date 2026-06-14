import { defineStore } from 'pinia'

const OAUTH_BASE = 'https://blog-cms-oauth-one.vercel.app'
const GITHUB_CLIENT_ID = 'Ov23lirj3oAaCJ1EqU7b'
const REPO = 'InsHomePgup/blog-hugo-stack'
const BRANCH = 'main'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<{ login: string; avatar_url: string } | null>(null)

  const isLoggedIn = computed(() => !!token.value)

  function login() {
    const params = new URLSearchParams({
      client_id: GITHUB_CLIENT_ID,
      scope: 'repo',
      redirect_uri: `${OAUTH_BASE}/callback`,
      state: btoa(JSON.stringify({ redirect: window.location.href })),
    })
    window.location.href = `https://github.com/login/oauth/authorize?${params}`
  }

  function logout() {
    token.value = null
    user.value = null
  }

  async function handleCallback() {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    if (!code)
      return false

    const res = await fetch(`${OAUTH_BASE}/auth?code=${code}`)
    const data = await res.json()
    if (data.token) {
      token.value = data.token
      window.history.replaceState({}, '', window.location.pathname)
      await fetchUser()
      return true
    }
    return false
  }

  async function fetchUser() {
    if (!token.value)
      return
    const res = await fetch('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${token.value}` },
    })
    user.value = await res.json()
  }

  return { token, user, isLoggedIn, login, logout, handleCallback, fetchUser, REPO, BRANCH }
}, {
  persist: { key: 'blog-editor-auth', pick: ['token', 'user'] },
})
