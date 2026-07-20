import { useAuthStore } from '@/stores/auth'

const IMAGE_REPO = 'InsHomePgup/pic_go_img'
const IMAGE_BRANCH = 'main'
const IMAGE_DIR = 'blog'
const MAX_SIZE = 5 * 1024 * 1024

function timestampFilename(file: File): string {
  const now = new Date()
  const pad = (n: number, len = 2) => String(n).padStart(len, '0')
  const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}${pad(now.getMilliseconds(), 3)}`
  const dotIndex = file.name.lastIndexOf('.')
  const ext = dotIndex >= 0 ? file.name.slice(dotIndex).toLowerCase() : `.${file.type.split('/')[1] ?? 'png'}`
  return `${stamp}${ext}`
}

function readAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve((reader.result as string).split(',')[1])
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

export function useImageUpload() {
  const auth = useAuthStore()

  async function uploadImage(file: File): Promise<string> {
    if (file.size > MAX_SIZE)
      throw new Error(`${file.name} 超过 5MB 限制`)

    const filename = timestampFilename(file)
    const content = await readAsBase64(file)
    const res = await fetch(
      `https://api.github.com/repos/${IMAGE_REPO}/contents/${IMAGE_DIR}/${filename}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `upload: ${filename}`,
          content,
          branch: IMAGE_BRANCH,
        }),
      },
    )
    if (!res.ok) {
      const data = await res.json().catch(() => null)
      throw new Error(data?.message ?? `图片上传失败 (${res.status})`)
    }
    return `https://raw.githubusercontent.com/${IMAGE_REPO}/${IMAGE_BRANCH}/${IMAGE_DIR}/${filename}`
  }

  return { uploadImage }
}
