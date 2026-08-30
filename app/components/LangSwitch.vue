<script setup lang="ts">
import { LOCALES } from '~/utils/i18n'

const { locale, setLocale, t } = useLocale()
</script>

<template>
  <div class="lang" role="group" :aria-label="t('lang.label')">
    <button
      v-for="item in LOCALES"
      :key="item.code"
      type="button"
      class="lang__btn"
      :class="{ 'lang__btn--active': locale === item.code }"
      :aria-pressed="locale === item.code"
      :aria-label="item.code === 'th' ? t('lang.th') : t('lang.en')"
      @click="setLocale(item.code)"
    >
      {{ item.short }}
    </button>
  </div>
</template>

<style scoped>
.lang {
  display: inline-flex;
  align-items: center;
  gap: 0;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: var(--radius-pill);
  overflow: hidden;
  flex-shrink: 0;
}

.lang__btn {
  min-width: 2.35rem;
  padding: 0.4rem 0.55rem;
  font-family: var(--font-display);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.5);
  background: transparent;
  transition: color 0.2s, background 0.2s;
}

.lang__btn + .lang__btn {
  border-left: 1px solid rgba(255, 255, 255, 0.16);
}

.lang__btn:hover {
  color: var(--color-white);
}

.lang__btn--active {
  color: #111;
  background: var(--color-lime);
}

@media (max-width: 1024px) {
  .lang__btn {
    min-width: 2.2rem;
    padding: 0.38rem 0.5rem;
  }
}
</style>
