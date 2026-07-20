<script setup lang="ts">
import type { FormInstanceFunctions, FormRule } from 'tdesign-vue-next'
import type { FrontmatterFields } from '@/composables/useFrontmatter'
import { parse } from 'yaml'

const fields = defineModel<FrontmatterFields>('fields', { required: true })
const extraRaw = defineModel<string>('extraRaw', { required: true })

const listFields = [
  { key: 'tags', label: '标签' },
  { key: 'categories', label: '分类' },
] as const

const weight = computed({
  get: () => fields.value.weight ?? undefined,
  set: (val: number | undefined) => {
    fields.value.weight = val ?? null
  },
})

const rules: Record<string, FormRule[]> = {
  title: [{ required: true, message: '请输入标题', type: 'error', trigger: 'blur' }],
  date: [{ required: true, message: '请选择日期', type: 'error', trigger: 'change' }],
}

const extraError = computed(() => {
  if (!extraRaw.value.trim())
    return ''
  try {
    const parsed = parse(extraRaw.value)
    if (parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed))
      return ''
    return '其他字段必须是 YAML 对象'
  }
  catch (e) {
    return e instanceof Error ? e.message : String(e)
  }
})

const formRef = ref<FormInstanceFunctions>()

async function validate() {
  const result = await formRef.value?.validate()
  return result === true
}

defineExpose({ validate })
</script>

<template>
  <t-form ref="formRef" :data="fields" :rules="rules">
    <t-row :gutter="[16, 16]">
      <t-col :span="10">
        <t-form-item label="标题" name="title">
          <t-input v-model="fields.title" placeholder="标题" />
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item label="日期" name="date">
          <t-date-picker v-model="fields.date" mode="date" value-type="YYYY-MM-DD" clearable style="width: 100%" />
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="权重">
          <t-input-number v-model="weight" :min="0" clearable style="width: 100%" />
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="草稿">
          <t-switch v-model="fields.draft" />
        </t-form-item>
      </t-col>
      <t-col v-for="lf in listFields" :key="lf.key" :span="12">
        <t-form-item :label="lf.label">
          <t-tag-input v-model="fields[lf.key]" clearable />
        </t-form-item>
      </t-col>
      <t-col :span="24">
        <t-form-item label="描述">
          <t-textarea v-model="fields.description" :autosize="{ minRows: 1, maxRows: 3 }" placeholder="描述" />
        </t-form-item>
      </t-col>
      <t-col :span="24">
        <t-form-item
          label="其他字段"
          :status="extraError ? 'error' : undefined"
          :tips="extraError || undefined"
        >
          <t-textarea
            v-model="extraRaw"
            :autosize="{ minRows: 3, maxRows: 10 }"
            placeholder="series / menu / cascade 等未识别字段的原始 YAML"
            style="font-family: var(--td-font-family-medium, monospace)"
          />
        </t-form-item>
      </t-col>
    </t-row>
  </t-form>
</template>
