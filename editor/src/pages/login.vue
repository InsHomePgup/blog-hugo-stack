<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'

const auth = useAuthStore()
const ui = useUiStore()
</script>

<template>
  <div
    class="relative flex min-h-screen flex-col items-center justify-center p-4"
    style="background: var(--td-bg-color-page)"
  >
    <t-button
      class="fixed right-4 top-4"
      variant="text"
      shape="square"
      @click="ui.isDark = !ui.isDark"
    >
      <template #icon>
        <i class="text-lg" :class="ui.isDark ? 'i-ri-sun-line' : 'i-ri-moon-line'" />
      </template>
    </t-button>

    <t-card class="w-full max-w-xs" :bordered="false" shadow>
      <div class="flex flex-col items-center gap-6 py-2">
        <div class="flex flex-col items-center gap-2 text-center">
          <i class="i-ri-quill-pen-line text-5xl" style="color: var(--td-brand-color)" />
          <h1 class="text-2xl font-bold" style="color: var(--td-text-color-primary)">
            Blog Editor
          </h1>
          <p class="text-sm leading-relaxed" style="color: var(--td-text-color-secondary)">
            使用 GitHub 账号登录后<br />编辑你的博客文章
          </p>
        </div>
        <t-button theme="primary" block size="large" @click="auth.login">
          <template #icon>
            <i class="i-ri-github-fill" />
          </template>
          使用 GitHub 登录
        </t-button>
      </div>
    </t-card>
  </div>
</template>
