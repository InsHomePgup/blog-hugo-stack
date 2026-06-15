<script setup lang="ts">
import { useGithubApi } from '@/composables/useGithubApi'
import { MessagePlugin } from 'tdesign-vue-next'
import Vditor from 'vditor'
import 'vditor/dist/index.css'

const route = useRoute()
const router = useRouter()
const { readFile, writeFile } = useGithubApi()

const filePath = computed(() => {
  const p = route.params as Record<string, string | string[]>
  return Array.isArray(p.path) ? p.path.join('/') : (p.path ?? '')
})

const sha = ref('')
const saving = ref(false)
const loading = ref(true)

let vditor: Vditor | null = null

function initVditor(content: string) {
  vditor?.destroy()
  vditor = new Vditor('vditor', {
    height: '100%',
    mode: 'ir',
    theme: 'classic',
    cache: { enable: false },
    toolbar: [
      'headings', 'bold', 'italic', 'strike', '|',
      'line', 'quote', 'list', 'ordered-list', 'check', '|',
      'code', 'inline-code', 'link', 'table', '|',
      'undo', 'redo', '|',
      'fullscreen', 'preview',
    ],
    after() {
      vditor!.setValue(content)
      loading.value = false
    },
  })
}

onMounted(async () => {
  try {
    const { content, sha: fileSha } = await readFile(filePath.value)
    sha.value = fileSha
    initVditor(content)
  }
  catch {
    MessagePlugin.error('文件加载失败')
    loading.value = false
  }
})


onUnmounted(() => {
  vditor?.destroy()
  vditor = null
})

async function save() {
  if (!vditor || saving.value)
    return
  saving.value = true
  try {
    const content = vditor.getValue()
    const fileName = filePath.value.split('/').pop() ?? 'update'
    await writeFile(filePath.value, content, sha.value, `docs: update ${fileName}`)
    MessagePlugin.success('已保存')
  }
  catch {
    MessagePlugin.error('保存失败')
  }
  finally {
    saving.value = false
  }
}

useEventListener('keydown', (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 's') {
    e.preventDefault()
    save()
  }
})
</script>

<template>
  <div class="flex h-screen flex-col" style="background: var(--td-bg-color-page)">
    <header
      class="flex h-14 shrink-0 items-center justify-between px-4"
      style="background: var(--td-bg-color-container); border-bottom: 1px solid var(--td-component-stroke)"
    >
      <div class="flex min-w-0 flex-1 items-center gap-2">
        <t-button variant="text" shape="square" @click="router.push('/')">
          <template #icon>
            <i class="i-ri-arrow-left-line text-base" />
          </template>
        </t-button>
        <i class="i-ri-file-text-line shrink-0" style="color: var(--td-text-color-placeholder)" />
        <span
          class="truncate text-sm"
          style="color: var(--td-text-color-secondary)"
          :title="filePath"
        >
          {{ filePath }}
        </span>
      </div>

      <div class="ml-4 flex shrink-0 items-center gap-2">
        <t-button theme="primary" size="small" :loading="saving" @click="save">
          <template #icon>
            <i class="i-ri-save-line" />
          </template>
          保存
        </t-button>
      </div>
    </header>

    <div class="relative flex-1 overflow-hidden">
      <div
        v-if="loading"
        class="absolute inset-0 z-10 flex items-center justify-center"
        style="background: var(--td-bg-color-page)"
      >
        <t-loading size="medium" />
      </div>
      <div id="vditor" class="h-full" />
    </div>
  </div>
</template>
