<script setup lang="ts">
import {
  contactInfo,
  contactLineHandle,
  contactLineHref,
  contactTelHref,
} from '~/utils/nav'

const { t } = useLocale()

function track(channel: string) {
  trackGtm('contact_channel', { channel, location: 'dock' })
}
</script>

<template>
  <nav class="dock" :aria-label="t('dock.label')">
    <a
      class="dock__btn dock__btn--line"
      :href="contactLineHref()"
      target="_blank"
      rel="noopener noreferrer"
      @click="track('line')"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path
          fill="currentColor"
          d="M19.7 10.3c0-3.7-3.7-6.7-8.3-6.7S3.1 6.6 3.1 10.3c0 3.3 2.9 6.1 6.9 6.6.27.06.64.17.73.4.08.2.05.52.03.73l-.12.74c-.04.22-.18 1.07.94.58 1.12-.48 6.04-3.56 8.24-6.1 1.5-1.7 1.88-3.4 1.88-4.41Z"
        />
      </svg>
      <span>{{ t('dock.line') }}</span>
      <em class="dock__hint">{{ contactLineHandle() }}</em>
    </a>
    <a class="dock__btn dock__btn--call" :href="contactTelHref()" @click="track('phone')">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
        <path
          d="M6.5 3.8h3.1l1.2 3.1-1.9 1.2a12.4 12.4 0 0 0 5.9 5.9l1.2-1.9 3.1 1.2v3.1c0 .8-.7 1.5-1.5 1.5C9.7 18 6 14.3 6 5.3c0-.8.7-1.5 1.5-1.5H6.5Z"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span>{{ t('dock.call') }}</span>
      <em class="dock__hint">{{ contactInfo.phone }}</em>
    </a>
    <NuxtLink class="dock__btn dock__btn--quote" to="/contact/quotation" @click="track('quote')">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
        <path
          d="M7 4h10a2 2 0 0 1 2 2v14l-4-2.2L11 20V6a2 2 0 0 1 2-2"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span>{{ t('dock.quote') }}</span>
      <em class="dock__hint">{{ t('dock.quoteHint') }}</em>
    </NuxtLink>
  </nav>
</template>

<style scoped>
.dock {
  position: fixed;
  right: 1.15rem;
  bottom: 1.15rem;
  z-index: 80;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.dock__btn {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  min-width: 9.5rem;
  padding: 0.7rem 0.9rem;
  border-radius: var(--radius-pill);
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--color-black);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
}

.dock__btn svg {
  flex-shrink: 0;
}

.dock__hint {
  display: none;
  font-style: normal;
  font-weight: 500;
  font-size: 0.68rem;
  letter-spacing: 0;
  opacity: 0.72;
}

.dock__btn--line {
  background: #06c755;
  color: #fff;
}

.dock__btn--call {
  background: var(--color-white);
}

.dock__btn--quote {
  background: var(--color-lime);
}

.dock__btn:hover {
  filter: brightness(1.06);
}

@media (max-width: 720px) {
  .dock {
    inset: auto 0 0;
    right: 0;
    bottom: 0;
    flex-direction: row;
    gap: 0;
    background: #101010;
    border-top: 1px solid rgba(212, 255, 0, 0.16);
    box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.35);
  }

  .dock__btn {
    flex: 1;
    min-width: 0;
    justify-content: center;
    border-radius: 0;
    box-shadow: none;
    padding: 0.8rem 0.35rem;
  }

  .dock__hint {
    display: none;
  }
}
</style>
