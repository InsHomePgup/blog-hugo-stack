<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'

const auth = useAuthStore()
useUiStore()
const router = useRouter()
const route = useRoute()

onMounted(async () => {
  if (auth.token && !auth.user)
    await auth.fetchUser()
})

watchEffect(() => {
  const isLoginPage = route.path === '/login'
  if (!auth.isLoggedIn && !isLoginPage)
    router.replace('/login')
  if (auth.isLoggedIn && isLoginPage)
    router.replace('/')
})
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>
