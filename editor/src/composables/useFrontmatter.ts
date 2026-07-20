import { parse, stringify } from 'yaml'

export interface FrontmatterFields {
  title: string
  date: string
  draft: boolean
  weight: number | null
  description: string
  tags: string[]
  categories: string[]
}

export interface ParsedMarkdown {
  hasFrontmatter: boolean
  fields: FrontmatterFields
  extraRaw: string
  body: string
  parseError: boolean
}

export interface SerializeResult {
  content: string
  error: string | null
}

const FRONTMATTER_REGEX = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/
const KNOWN_KEYS = ['title', 'date', 'draft', 'weight', 'description', 'tags', 'categories']

function defaultFields(): FrontmatterFields {
  return { title: '', date: '', draft: false, weight: null, description: '', tags: [], categories: [] }
}

function toStringValue(value: unknown): string {
  if (typeof value === 'string')
    return value
  return value == null ? '' : String(value)
}

function toStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String) : []
}

function toDateString(value: unknown): string {
  if (value instanceof Date) {
    const year = value.getUTCFullYear()
    const month = String(value.getUTCMonth() + 1).padStart(2, '0')
    const day = String(value.getUTCDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  return toStringValue(value)
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

export function parseMarkdown(raw: string): ParsedMarkdown {
  const match = raw.match(FRONTMATTER_REGEX)
  if (!match)
    return { hasFrontmatter: false, fields: defaultFields(), extraRaw: '', body: raw, parseError: false }

  const yamlText = match[1]
  const body = raw.slice(match[0].length)

  let parsed: unknown
  try {
    parsed = parse(yamlText)
  }
  catch {
    return { hasFrontmatter: true, fields: defaultFields(), extraRaw: yamlText, body, parseError: true }
  }

  if (!isPlainObject(parsed))
    return { hasFrontmatter: true, fields: defaultFields(), extraRaw: yamlText, body, parseError: true }

  const fields: FrontmatterFields = {
    title: toStringValue(parsed.title),
    date: toDateString(parsed.date),
    draft: Boolean(parsed.draft ?? false),
    weight: typeof parsed.weight === 'number' ? parsed.weight : null,
    description: toStringValue(parsed.description),
    tags: toStringArray(parsed.tags),
    categories: toStringArray(parsed.categories),
  }

  const extra = { ...parsed }
  for (const key of KNOWN_KEYS)
    delete extra[key]
  const extraRaw = Object.keys(extra).length > 0 ? stringify(extra) : ''

  return { hasFrontmatter: true, fields, extraRaw, body, parseError: false }
}

export function serializeMarkdown(
  fields: FrontmatterFields,
  extraRaw: string,
  body: string,
  hasFrontmatter: boolean,
): SerializeResult {
  const fieldsAreDefault = JSON.stringify(fields) === JSON.stringify(defaultFields())
  if (!hasFrontmatter && fieldsAreDefault && extraRaw.trim() === '')
    return { content: body, error: null }

  let extra: Record<string, unknown> = {}
  if (extraRaw.trim() !== '') {
    let parsedExtra: unknown
    try {
      parsedExtra = parse(extraRaw)
    }
    catch (e) {
      return { content: '', error: e instanceof Error ? e.message : String(e) }
    }
    if (!isPlainObject(parsedExtra))
      return { content: '', error: '其他字段必须是 YAML 对象' }
    extra = parsedExtra
  }

  const data: Record<string, unknown> = {
    title: fields.title,
    date: fields.date,
    draft: fields.draft,
  }
  if (fields.weight !== null)
    data.weight = fields.weight
  if (fields.description)
    data.description = fields.description
  if (fields.tags.length > 0)
    data.tags = fields.tags
  if (fields.categories.length > 0)
    data.categories = fields.categories
  Object.assign(data, extra)

  return { content: `---\n${stringify(data)}---\n\n${body}`, error: null }
}
