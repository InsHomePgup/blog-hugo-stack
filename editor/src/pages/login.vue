<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

onMounted(async () => {
  if (window.location.search.includes('code=')) {
    const ok = await auth.handleCallback()
    if (ok)
      router.replace('/')
  }
})
</script>

<template>
  <div class="flex h-screen flex-col items-center justify-center gap-6">
    <div class="text-2xl font-semibold">
      Blog Editor
    </div>
    <div class="text-sm text-gray-500">
      使用 GitHub 账号登录后编辑文章
    </div>
    <t-button theme="primary" @click="auth.login">
      <template #icon>
        <i class="i-ri-github-fill" />
      </template>
      使用 GitHub 登录
    </t-button>
  </div>
</template>
