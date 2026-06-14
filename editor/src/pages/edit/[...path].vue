<script setup lang="ts">
import { useGithubApi } from '@/composables/useGithubApi'
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
const message = ref('')

let vditor: Vditor | null = null

onMounted(async () => {
  const { content, sha: fileSha } = await readFile(filePath.value)
  sha.value = fileSha

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
    message.value = '已保存'
    setTimeout(() => message.value = '', 2000)
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
  <div class="h-screen flex flex-col">
    <header class="flex shrink-0 items-center justify-between border-b border-gray-200 px-4 py-2">
      <div class="flex items-center gap-3">
        <t-button theme="default" variant="text" size="small" @click="router.push('/')">
          <template #icon>
            <i class="i-ri-arrow-left-line" />
          </template>
          返回
        </t-button>
        <span class="max-w-xl truncate text-sm text-gray-500">{{ filePath }}</span>
      </div>
      <div class="flex items-center gap-3">
        <span v-if="message" class="text-sm text-green-600">{{ message }}</span>
        <t-button :loading="saving" theme="primary" size="small" @click="save">
          保存
        </t-button>
      </div>
    </header>

    <div class="relative flex-1 overflow-hidden">
      <t-loading v-if="loading" class="absolute inset-0 flex items-center justify-center" />
      <div id="vditor" class="h-full" />
    </div>
  </div>
</template>
