<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useFilesStore } from '@/stores/files'
import { useUiStore } from '@/stores/ui'

const auth = useAuthStore()
const filesStore = useFilesStore()
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

watch(() => auth.isLoggedIn, (val) => {
  if (val)
    filesStore.init()
}, { immediate: true })
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>
