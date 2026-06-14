<script setup lang="ts">
import type { GithubFile } from '@/composables/useGithubApi'
import { useGithubApi } from '@/composables/useGithubApi'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const { listFiles } = useGithubApi()
const router = useRouter()

const CONTENT_DIRS = [
  { name: '博客文章', path: 'content/post' },
  { name: '编程', path: 'content/programming' },
  { name: '投资', path: 'content/investing' },
  { name: '阅读', path: 'content/reading' },
  { name: '英语', path: 'content/english' },
  { name: '草稿箱', path: 'content/draft' },
]

const selectedDir = ref(CONTENT_DIRS[0])
const files = ref<GithubFile[]>([])
const currentPath = ref(selectedDir.value.path)
const pathStack = ref<string[]>([])
const loading = ref(false)

async function loadFiles(path: string) {
  loading.value = true
  try {
    const result = await listFiles(path)
    files.value = result.filter(f => f.type === 'dir' || f.name.endsWith('.md'))
    files.value.sort((a, b) => {
      if (a.type !== b.type)
        return a.type === 'dir' ? -1 : 1
      return a.name.localeCompare(b.name, 'zh')
    })
  }
  finally {
    loading.value = false
  }
}

function selectDir(dir: typeof CONTENT_DIRS[0]) {
  selectedDir.value = dir
  currentPath.value = dir.path
  pathStack.value = []
  loadFiles(dir.path)
}

function enterDir(file: GithubFile) {
  pathStack.value.push(currentPath.value)
  currentPath.value = file.path
  loadFiles(file.path)
}

function goBack() {
  const prev = pathStack.value.pop()
  if (prev) {
    currentPath.value = prev
    loadFiles(prev)
  }
}

function openFile(file: GithubFile) {
  router.push(`/edit/${file.path}`)
}

onMounted(() => loadFiles(currentPath.value))
</script>

<template>
  <div class="h-screen flex flex-col">
    <header class="flex items-center justify-between border-b border-gray-200 px-6 py-3">
      <span class="text-lg font-semibold">Blog Editor</span>
      <div class="flex items-center gap-3">
        <t-avatar v-if="auth.user" :image="auth.user.avatar_url" size="small" />
        <span v-if="auth.user" class="text-sm text-gray-600">{{ auth.user.login }}</span>
        <t-button theme="default" size="small" @click="auth.logout">
          退出
        </t-button>
      </div>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <aside class="w-48 shrink-0 border-r border-gray-200 overflow-y-auto">
        <div
          v-for="dir in CONTENT_DIRS"
          :key="dir.path"
          class="cursor-pointer px-4 py-2.5 text-sm hover:bg-gray-100"
          :class="selectedDir.path === dir.path ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'"
          @click="selectDir(dir)"
        >
          {{ dir.name }}
        </div>
      </aside>

      <main class="flex-1 overflow-y-auto">
        <div class="flex items-center gap-2 border-b border-gray-100 px-4 py-2">
          <t-button
            v-if="pathStack.length > 0"
            theme="default"
            variant="text"
            size="small"
            @click="goBack"
          >
            <template #icon>
              <i class="i-ri-arrow-left-line" />
            </template>
            返回
          </t-button>
          <span class="text-sm text-gray-500">{{ currentPath }}</span>
        </div>

        <t-loading v-if="loading" class="mt-12 flex justify-center" />

        <div v-else class="divide-y divide-gray-100">
          <div
            v-for="file in files"
            :key="file.path"
            class="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-gray-50"
            @click="file.type === 'dir' ? enterDir(file) : openFile(file)"
          >
            <i
              class="text-base"
              :class="file.type === 'dir' ? 'i-ri-folder-line text-yellow-500' : 'i-ri-file-text-line text-gray-400'"
            />
            <span class="text-sm">{{ file.name }}</span>
          </div>

          <div v-if="files.length === 0" class="py-16 text-center text-sm text-gray-400">
            该目录下没有文章
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
