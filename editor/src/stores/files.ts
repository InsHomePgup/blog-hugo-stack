import type { GithubFile } from '@/composables/useGithubApi'
import { useGithubApi } from '@/composables/useGithubApi'

export const CONTENT_DIRS = [
  { name: '博客文章', path: 'content/post', icon: 'i-ri-article-line' },
  { name: '编程', path: 'content/programming', icon: 'i-ri-code-box-line' },
  { name: '投资', path: 'content/investing', icon: 'i-ri-funds-line' },
  { name: '阅读', path: 'content/reading', icon: 'i-ri-book-2-line' },
  { name: '英语', path: 'content/english', icon: 'i-ri-translate-2' },
  { name: '草稿箱', path: 'content/draft', icon: 'i-ri-draft-line' },
]

function sortFiles(files: GithubFile[]): GithubFile[] {
  return files
    .filter(f => f.type === 'dir' || f.name.endsWith('.md'))
    .sort((a, b) => {
      if (a.type !== b.type)
        return a.type === 'dir' ? -1 : 1
      return a.name.localeCompare(b.name, 'zh')
    })
}

export const useFilesStore = defineStore('files', () => {
  const { listFiles: fetchFromApi } = useGithubApi()

  const cache = ref<Record<string, GithubFile[]>>({})
  const initializing = ref(false)
  const initialized = ref(false)

  function isCached(path: string): boolean {
    return path in cache.value
  }

  function getDir(path: string): GithubFile[] {
    return cache.value[path] ?? []
  }

  async function loadDir(path: string): Promise<void> {
    if (isCached(path))
      return
    const raw = await fetchFromApi(path)
    cache.value[path] = sortFiles(raw)
  }

  async function loadDirRecursive(path: string): Promise<void> {
    if (!isCached(path)) {
      const raw = await fetchFromApi(path)
      cache.value[path] = sortFiles(raw)
    }
    await Promise.all(
      cache.value[path].filter(f => f.type === 'dir').map(d => loadDirRecursive(d.path)),
    )
  }

  async function init(): Promise<void> {
    if (initialized.value || initializing.value)
      return
    initializing.value = true
    try {
      await Promise.all(CONTENT_DIRS.map(d => loadDirRecursive(d.path)))
      initialized.value = true
    }
    finally {
      initializing.value = false
    }
  }

  function invalidate(path: string): void {
    delete cache.value[path]
  }

  return { initializing, initialized, init, loadDir, getDir, isCached, invalidate }
})
