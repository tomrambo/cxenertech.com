<script setup lang="ts">
import type { EditorialInfo } from '~/utils/editorial'

defineProps<{ info: EditorialInfo }>()
</script>

<template>
  <div v-if="info.sources?.length || info.reviewStatus || info.reviewerName" class="content-block">
    <h2>แหล่งข้อมูลและการตรวจทาน</h2>
    <p v-if="info.reviewStatus === 'reviewed' && info.reviewerName && info.reviewedAt">
      ตรวจทานโดย {{ info.reviewerName }} เมื่อ <time :datetime="info.reviewedAt">{{ info.reviewedAt }}</time>
    </p>
    <p v-else-if="info.reviewStatus === 'needs_update'">อยู่ระหว่างทบทวนข้อมูลให้เป็นปัจจุบัน</p>
    <p v-else-if="info.reviewStatus">เนื้อหานี้ยังรอการตรวจทานโดยผู้เชี่ยวชาญ ตัวอย่างใช้เพื่ออธิบายวิธีคิด การออกแบบจริงต้องประเมินตามไซต์</p>
    <ul v-if="info.sources?.length">
      <li v-for="source in info.sources" :key="source.url">
        <a :href="source.url" rel="noopener noreferrer">{{ source.title }}</a>
        — ตรวจเอกสาร <time :datetime="source.accessedAt">{{ source.accessedAt }}</time>
      </li>
    </ul>
  </div>
</template>
