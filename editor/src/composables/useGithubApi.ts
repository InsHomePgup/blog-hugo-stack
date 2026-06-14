import { useAuthStore } from '@/stores/auth'

export interface GithubFile {
  name: string
  path: string
  type: 'file' | 'dir'
  sha: string
  size: number
}

export function useGithubApi() {
  const auth = useAuthStore()

  function headers() {
    return {
      Authorization: `Bearer ${auth.token}`,
      'Content-Type': 'application/json',
    }
  }

  async function listFiles(path: string): Promise<GithubFile[]> {
    const res = await fetch(
      `https://api.github.com/repos/${auth.REPO}/contents/${path}?ref=${auth.BRANCH}`,
      { headers: headers() },
    )
    return res.json()
  }

  async function readFile(path: string): Promise<{ content: string; sha: string }> {
    const res = await fetch(
      `https://api.github.com/repos/${auth.REPO}/contents/${path}?ref=${auth.BRANCH}`,
      { headers: headers() },
    )
    const data = await res.json()
    const binary = atob(data.content.replace(/\n/g, ''))
    const bytes = Uint8Array.from(binary, c => c.charCodeAt(0))
    return {
      content: new TextDecoder().decode(bytes),
      sha: data.sha,
    }
  }

  async function writeFile(path: string, content: string, sha: string, message: string): Promise<void> {
    await fetch(
      `https://api.github.com/repos/${auth.REPO}/contents/${path}`,
      {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify({
          message,
          content: btoa(unescape(encodeURIComponent(content))),
          sha,
          branch: auth.BRANCH,
        }),
      },
    )
  }

  async function createFile(path: string, content: string, message: string): Promise<void> {
    await fetch(
      `https://api.github.com/repos/${auth.REPO}/contents/${path}`,
      {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify({
          message,
          content: btoa(unescape(encodeURIComponent(content))),
          branch: auth.BRANCH,
        }),
      },
    )
  }

  return { listFiles, readFile, writeFile, createFile }
}
