<script setup lang="ts">
import type { FrontmatterFields } from '@/composables/useFrontmatter'

const fields = defineModel<FrontmatterFields>('fields', { required: true })
const extraRaw = defineModel<string>('extraRaw', { required: true })

const listFields = [
  { key: 'tags', label: '标签' },
  { key: 'categories', label: '分类' },
] as const
</script>

<template>
  <div>
    <t-form label-width="72px" layout="inline">
      <t-form-item label="标题">
        <t-input v-model="fields.title" placeholder="标题" />
      </t-form-item>
      <t-form-item label="日期">
        <t-date-picker v-model="fields.date" mode="date" value-type="YYYY-MM-DD" clearable />
      </t-form-item>
      <t-form-item label="权重">
        <t-input-number v-model="fields.weight" :min="0" clearable />
      </t-form-item>
      <t-form-item label="草稿">
        <t-switch v-model="fields.draft" />
      </t-form-item>
      <t-form-item v-for="lf in listFields" :key="lf.key" :label="lf.label">
        <t-tag-input v-model="fields[lf.key]" clearable />
      </t-form-item>
      <t-form-item label="描述" style="width: 100%">
        <t-textarea v-model="fields.description" :autosize="{ minRows: 1, maxRows: 3 }" placeholder="描述" />
      </t-form-item>
    </t-form>
    <t-collapse expand-icon-placement="right">
      <t-collapse-panel value="extra" header="其他字段 (YAML)">
        <t-textarea
          v-model="extraRaw"
          :autosize="{ minRows: 3, maxRows: 10 }"
          placeholder="series / menu / cascade 等未识别字段的原始 YAML"
          style="font-family: var(--td-font-family-medium, monospace)"
        />
      </t-collapse-panel>
    </t-collapse>
  </div>
</template>
