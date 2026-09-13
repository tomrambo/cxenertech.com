<script setup lang="ts">
import {
  contactInfo,
  contactLineHandle,
  contactLineHref,
  contactMailtoHref,
  contactTelHref,
} from '~/utils/nav'

defineProps<{
  compact?: boolean
}>()

function track(channel: string, location: string) {
  trackGtm('contact_channel', { channel, location })
}
</script>

<template>
  <div class="channels" :class="{ 'channels--compact': compact }">
    <NuxtLink
      v-if="!compact"
      class="channel"
      to="/contact/quotation"
      @click="track('quote', 'cards')"
    >
      <strong>ขอใบเสนอราคา</strong>
      <span>กรอกข้อมูลไซต์ ทีมออกแบบแล้วเสนอราคา</span>
    </NuxtLink>
    <a
      class="channel channel--line"
      :href="contactLineHref()"
      target="_blank"
      rel="noopener noreferrer"
      @click="track('line', compact ? 'inline' : 'cards')"
    >
      <strong>LINE {{ contactLineHandle() }}</strong>
      <span>คุยกับทีมขายทันที ไม่ต้องรอฟอร์ม</span>
    </a>
    <a
      class="channel"
      :href="contactTelHref()"
      @click="track('phone', compact ? 'inline' : 'cards')"
    >
      <strong>โทร {{ contactInfo.phone }}</strong>
      <span>สายตรงประเมินเบื้องต้นและนัดสำรวจ</span>
    </a>
    <template v-if="!compact">
      <a
        class="channel"
        :href="contactMailtoHref()"
        @click="track('email', 'cards')"
      >
        <strong>อีเมล</strong>
        <span>{{ contactInfo.email }}</span>
      </a>
      <NuxtLink
        class="channel"
        to="/solar/finance"
        @click="track('finance_solar', 'cards')"
      >
        <strong>สินเชื่อโซล่าเซลล์</strong>
        <span>ผ่อนแล้วเป็นเจ้าของระบบ — เราจัดเอกสารผู้ขาย</span>
      </NuxtLink>
      <NuxtLink
        class="channel"
        to="/ev-charging/finance"
        @click="track('finance_ev', 'cards')"
      >
        <strong>สินเชื่อ EV Station</strong>
        <span>ผ่อนติดตั้งสถานีของตนเอง ไม่ใช่แพ็กเกจลงทุน</span>
      </NuxtLink>
      <NuxtLink
        class="channel"
        to="/contact/site-survey"
        @click="track('survey', 'cards')"
      >
        <strong>นัดสำรวจพื้นที่</strong>
        <span>ให้ทีมดูหลังคาหรือที่จอดก่อนออก BOQ</span>
      </NuxtLink>
    </template>
  </div>
</template>

<style scoped>
.channels {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.75rem;
}

.channels--compact {
  grid-template-columns: 1fr;
  margin: 0 0 1rem;
}

.channel {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 1rem 1.1rem;
  background: var(--color-panel);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: inherit;
  transition: border-color 0.2s, background 0.2s;
}

.channel:hover {
  border-color: rgba(212, 255, 0, 0.4);
  background: #191919;
}

.channel strong {
  font-family: var(--font-display);
  font-size: 0.95rem;
  color: var(--color-white);
}

.channel span {
  color: var(--color-muted);
  font-size: 0.85rem;
  line-height: 1.45;
}

.channel--line strong {
  color: #9dffb8;
}

.channels--compact .channel {
  padding: 0.85rem 1rem;
}
</style>
