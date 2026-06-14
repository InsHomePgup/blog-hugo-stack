<script setup lang="ts">
import type { GithubFile } from '@/composables/useGithubApi'
import { useGithubApi } from '@/composables/useGithubApi'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'
import { MessagePlugin } from 'tdesign-vue-next'

const auth = useAuthStore()
const ui = useUiStore()
const { listFiles } = useGithubApi()
const router = useRouter()

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 768)

const CONTENT_DIRS = [
  { name: '博客文章', path: 'content/post', icon: 'i-ri-article-line' },
  { name: '编程', path: 'content/programming', icon: 'i-ri-code-box-line' },
  { name: '投资', path: 'content/investing', icon: 'i-ri-funds-line' },
  { name: '阅读', path: 'content/reading', icon: 'i-ri-book-2-line' },
  { name: '英语', path: 'content/english', icon: 'i-ri-translate-2' },
  { name: '草稿箱', path: 'content/draft', icon: 'i-ri-draft-line' },
]

const selectedDir = ref(CONTENT_DIRS[0].path)
const files = ref<GithubFile[]>([])
const currentPath = ref(CONTENT_DIRS[0].path)
const pathStack = ref<string[]>([])
const loading = ref(false)

async function loadFiles(path: string) {
  loading.value = true
  try {
    const result = await listFiles(path)
    files.value = result
      .filter(f => f.type === 'dir' || f.name.endsWith('.md'))
      .sort((a, b) => {
        if (a.type !== b.type)
          return a.type === 'dir' ? -1 : 1
        return a.name.localeCompare(b.name, 'zh')
      })
  }
  catch {
    MessagePlugin.error('加载失败，请检查网络连接')
  }
  finally {
    loading.value = false
  }
}

function onMenuChange(val: string | number) {
  const path = String(val)
  selectedDir.value = path
  currentPath.value = path
  pathStack.value = []
  loadFiles(path)
  ui.drawerVisible = false
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
  <div class="flex h-screen flex-col" style="background: var(--td-bg-color-page)">
    <header
      class="flex h-14 shrink-0 items-center justify-between px-4"
      style="background: var(--td-bg-color-container); border-bottom: 1px solid var(--td-component-stroke)"
    >
      <div class="flex items-center gap-2">
        <t-button
          v-if="isMobile"
          variant="text"
          shape="square"
          @click="ui.drawerVisible = true"
        >
          <template #icon>
            <i class="i-ri-menu-line text-base" />
          </template>
        </t-button>
        <i class="i-ri-quill-pen-line text-xl" style="color: var(--td-brand-color)" />
        <span class="font-semibold" style="color: var(--td-text-color-primary)">Blog Editor</span>
      </div>

      <div class="flex items-center gap-1">
        <t-button variant="text" shape="square" @click="ui.isDark = !ui.isDark">
          <template #icon>
            <i class="text-base" :class="ui.isDark ? 'i-ri-sun-line' : 'i-ri-moon-line'" />
          </template>
        </t-button>
        <t-avatar
          v-if="auth.user"
          :image="auth.user.avatar_url"
          size="small"
          class="mx-1"
        />
        <t-button variant="text" size="small" @click="auth.logout">
          退出
        </t-button>
      </div>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <nav
        v-if="!isMobile"
        class="w-48 shrink-0 overflow-y-auto"
        style="background: var(--td-bg-color-container); border-right: 1px solid var(--td-component-stroke)"
      >
        <t-menu :value="selectedDir" width="192px" @change="onMenuChange">
          <t-menu-item
            v-for="dir in CONTENT_DIRS"
            :key="dir.path"
            :value="dir.path"
          >
            <template #icon>
              <i :class="dir.icon" />
            </template>
            {{ dir.name }}
          </t-menu-item>
        </t-menu>
      </nav>

      <t-drawer
        v-model:visible="ui.drawerVisible"
        header="目录"
        :footer="false"
        placement="left"
        size="200px"
      >
        <t-menu :value="selectedDir" width="100%" @change="onMenuChange">
          <t-menu-item
            v-for="dir in CONTENT_DIRS"
            :key="dir.path"
            :value="dir.path"
          >
            <template #icon>
              <i :class="dir.icon" />
            </template>
            {{ dir.name }}
          </t-menu-item>
        </t-menu>
      </t-drawer>

      <main class="flex flex-1 flex-col overflow-hidden">
        <div
          class="flex h-10 shrink-0 items-center gap-2 px-4"
          style="background: var(--td-bg-color-container); border-bottom: 1px solid var(--td-component-stroke)"
        >
          <t-button
            v-if="pathStack.length"
            variant="text"
            size="small"
            @click="goBack"
          >
            <template #icon>
              <i class="i-ri-arrow-left-line" />
            </template>
          </t-button>
          <span class="truncate text-sm" style="color: var(--td-text-color-secondary)">
            {{ currentPath }}
          </span>
        </div>

        <div class="flex-1 overflow-y-auto">
          <div v-if="loading" class="flex h-48 items-center justify-center">
            <t-loading size="medium" />
          </div>

          <template v-else>
            <div
              v-if="files.length === 0"
              class="flex h-48 items-center justify-center text-sm"
              style="color: var(--td-text-color-placeholder)"
            >
              该目录下没有内容
            </div>

            <div
              v-for="file in files"
              :key="file.path"
              class="file-item flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors"
              style="border-bottom: 1px solid var(--td-component-stroke)"
              @click="file.type === 'dir' ? enterDir(file) : openFile(file)"
            >
              <i
                class="shrink-0 text-base"
                :class="file.type === 'dir' ? 'i-ri-folder-line' : 'i-ri-file-text-line'"
                :style="{
                  color: file.type === 'dir'
                    ? 'var(--td-warning-color)'
                    : 'var(--td-text-color-placeholder)',
                }"
              />
              <span class="flex-1 truncate text-sm" style="color: var(--td-text-color-primary)">
                {{ file.name }}
              </span>
              <i
                v-if="file.type === 'dir'"
                class="i-ri-arrow-right-s-line text-sm shrink-0"
                style="color: var(--td-text-color-placeholder)"
              />
            </div>
          </template>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.file-item:hover {
  background: var(--td-bg-color-container-hover);
}
</style>
