<script setup lang="ts">
import type { FrontmatterFields } from '@/composables/useFrontmatter'
import { useGithubApi } from '@/composables/useGithubApi'
import { parseMarkdown, serializeMarkdown } from '@/composables/useFrontmatter'
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
const frontmatterFormRef = ref<{ validate: () => Promise<boolean> } | null>(null)

const fields = ref<FrontmatterFields>({
  title: '',
  date: '',
  draft: false,
  weight: null,
  description: '',
  tags: [],
  categories: [],
})
const extraRaw = ref('')
const hasFrontmatter = ref(false)

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
    const parsed = parseMarkdown(content)
    fields.value = parsed.fields
    extraRaw.value = parsed.extraRaw
    hasFrontmatter.value = parsed.hasFrontmatter
    if (!parsed.hasFrontmatter)
      fields.value.date = dayjs().format('YYYY-MM-DD')
    if (parsed.parseError)
      MessagePlugin.warning('frontmatter 解析失败，已原样保留在"其他字段"中')
    initVditor(parsed.body)
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
  const valid = await frontmatterFormRef.value?.validate()
  if (!valid)
    return
  saving.value = true
  try {
    const body = vditor.getValue()
    const { content, error } = serializeMarkdown(fields.value, extraRaw.value, body, hasFrontmatter.value)
    if (error) {
      MessagePlugin.error(`其他字段 YAML 格式错误：${error}`)
      saving.value = false
      return
    }
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
  <div class="h-screen">
    <t-layout style="height: 100%">
      <t-header style="height: 56px; padding: 0; border-bottom: 1px solid var(--td-component-stroke)">
        <div class="flex h-full items-center justify-between px-4">
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
          <div class="ml-4 flex shrink-0 items-center">
            <t-button theme="primary" size="small" :loading="saving" @click="save">
              <template #icon>
                <i class="i-ri-save-line" />
              </template>
              保存
            </t-button>
          </div>
        </div>
      </t-header>

      <div
        v-if="!loading"
        style="border-bottom: 1px solid var(--td-component-stroke); padding: 12px 16px; background: var(--td-bg-color-container)"
      >
        <FrontmatterForm ref="frontmatterFormRef" v-model:fields="fields" v-model:extra-raw="extraRaw" />
      </div>

      <t-content style="padding: 0; overflow: hidden; position: relative">
        <div
          v-if="loading"
          class="absolute inset-0 z-10 flex items-center justify-center"
          style="background: var(--td-bg-color-page)"
        >
          <t-loading size="medium" />
        </div>
        <div id="vditor" class="h-full" />
      </t-content>

      <t-footer style="height: 32px; padding: 0; border-top: 1px solid var(--td-component-stroke)">
        <div class="flex h-full items-center justify-between px-4">
          <span class="truncate text-xs" style="color: var(--td-text-color-placeholder)">
            {{ filePath }}
          </span>
          <span class="ml-4 shrink-0 text-xs" style="color: var(--td-text-color-placeholder)">
            Ctrl+S 保存
          </span>
        </div>
      </t-footer>
    </t-layout>
  </div>
</template>
