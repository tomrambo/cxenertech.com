<script setup lang="ts">
const {
  decided,
  open,
  hydrated,
  draft,
  hydrate,
  acceptAll,
  rejectOptional,
  saveDraft,
  openSettings,
  closePanel,
} = useCookieConsent()

const { t } = useLocale()

onMounted(() => {
  hydrate()
})

const categories = computed(() => [
  {
    key: 'necessary' as const,
    locked: true,
    title: t('cookies.necessaryTitle'),
    desc: t('cookies.necessaryDesc'),
  },
  {
    key: 'analytics' as const,
    locked: false,
    title: t('cookies.analyticsTitle'),
    desc: t('cookies.analyticsDesc'),
  },
  {
    key: 'marketing' as const,
    locked: false,
    title: t('cookies.marketingTitle'),
    desc: t('cookies.marketingDesc'),
  },
])

function toggleCategory(key: 'analytics' | 'marketing') {
  draft.value = { ...draft.value, [key]: !draft.value[key] }
}
</script>

<template>
  <ClientOnly>
    <div v-if="hydrated" class="cookie">
      <Transition name="cookie-panel">
        <div
          v-if="open"
          class="cookie__scrim"
          :class="{ 'cookie__scrim--soft': decided }"
          @click.self="closePanel"
        >
          <section
            class="cookie__panel"
            role="dialog"
            aria-modal="true"
            :aria-label="t('cookies.title')"
          >
            <header class="cookie__head">
              <div class="cookie__brand">
                <span class="cookie__mark" aria-hidden="true">
                  <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
                    <circle cx="16" cy="16" r="13" stroke="currentColor" stroke-width="1.6" />
                    <circle cx="11.5" cy="12" r="1.6" fill="currentColor" />
                    <circle cx="18.5" cy="10.5" r="1.2" fill="currentColor" />
                    <circle cx="14" cy="18.5" r="1.4" fill="currentColor" />
                    <circle cx="21" cy="17.5" r="1.5" fill="currentColor" />
                  </svg>
                </span>
                <div>
                  <p class="cookie__kicker">{{ t('cookies.kicker') }}</p>
                  <h2 class="cookie__title">{{ t('cookies.title') }}</h2>
                </div>
              </div>
              <button
                v-if="decided"
                type="button"
                class="cookie__close"
                :aria-label="t('cookies.close')"
                @click="closePanel"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                </svg>
              </button>
            </header>

            <p class="cookie__lead">{{ t('cookies.lead') }}</p>

            <ul class="cookie__cats">
              <li v-for="cat in categories" :key="cat.key" class="cookie__cat">
                <div class="cookie__cat-copy">
                  <div class="cookie__cat-top">
                    <h3>{{ cat.title }}</h3>
                    <span v-if="cat.locked" class="cookie__badge">{{ t('cookies.required') }}</span>
                  </div>
                  <p>{{ cat.desc }}</p>
                </div>
                <button
                  type="button"
                  class="cookie__switch"
                  role="switch"
                  :aria-checked="cat.locked ? true : draft[cat.key]"
                  :aria-label="cat.title"
                  :disabled="cat.locked"
                  :class="{
                    'is-on': cat.locked || draft[cat.key],
                    'is-locked': cat.locked,
                  }"
                  @click="!cat.locked && toggleCategory(cat.key as 'analytics' | 'marketing')"
                >
                  <span class="cookie__knob" />
                </button>
              </li>
            </ul>

            <div class="cookie__actions">
              <button type="button" class="cookie__btn cookie__btn--ghost" @click="rejectOptional">
                {{ t('cookies.reject') }}
              </button>
              <button type="button" class="cookie__btn cookie__btn--soft" @click="saveDraft">
                {{ t('cookies.save') }}
              </button>
              <button type="button" class="cookie__btn cookie__btn--solid" @click="acceptAll">
                {{ t('cookies.acceptAll') }}
              </button>
            </div>
          </section>
        </div>
      </Transition>

      <Transition name="cookie-fab">
        <button
          v-if="decided && !open"
          type="button"
          class="cookie__fab"
          :aria-label="t('cookies.fab')"
          @click="openSettings"
        >
          <svg viewBox="0 0 32 32" width="22" height="22" fill="none" aria-hidden="true">
            <circle cx="16" cy="16" r="12.5" stroke="currentColor" stroke-width="1.7" />
            <circle cx="11.5" cy="12.2" r="1.5" fill="currentColor" />
            <circle cx="18.2" cy="10.8" r="1.15" fill="currentColor" />
            <circle cx="14.2" cy="18.6" r="1.35" fill="currentColor" />
            <circle cx="20.8" cy="17.4" r="1.4" fill="currentColor" />
          </svg>
        </button>
      </Transition>
    </div>
  </ClientOnly>
</template>

<style scoped>
.cookie__scrim {
  position: fixed;
  inset: 0;
  z-index: 120;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 1rem;
  background: rgba(5, 8, 12, 0.55);
  backdrop-filter: blur(4px);
}

.cookie__scrim--soft {
  background: rgba(5, 8, 12, 0.42);
}

.cookie__panel {
  width: min(100%, 420px);
  margin: 0 0 0.25rem;
  padding: 1.25rem 1.25rem 1.15rem;
  border: 1px solid rgba(212, 255, 0, 0.18);
  border-radius: 18px;
  background:
    radial-gradient(120% 80% at 0% 0%, rgba(212, 255, 0, 0.08), transparent 55%),
    linear-gradient(165deg, #151b24 0%, #0d1218 100%);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
  color: var(--color-ink);
}

.cookie__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.7rem;
}

.cookie__brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.cookie__mark {
  display: grid;
  place-items: center;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 12px;
  color: var(--color-lime);
  background: rgba(212, 255, 0, 0.1);
  border: 1px solid rgba(212, 255, 0, 0.22);
}

.cookie__kicker {
  font-family: var(--font-display);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-lime);
  margin-bottom: 0.15rem;
}

.cookie__title {
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.cookie__close {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  color: var(--color-muted);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: color 0.2s var(--ease), background 0.2s var(--ease);
}

.cookie__close:hover {
  color: var(--color-white);
  background: rgba(255, 255, 255, 0.08);
}

.cookie__lead {
  font-size: 0.86rem;
  line-height: 1.55;
  color: var(--color-muted);
  margin-bottom: 1rem;
}

.cookie__cats {
  display: grid;
  gap: 0.55rem;
  margin-bottom: 1.1rem;
}

.cookie__cat {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.8rem 0.85rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.cookie__cat-copy {
  flex: 1;
  min-width: 0;
}

.cookie__cat-top {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  flex-wrap: wrap;
  margin-bottom: 0.2rem;
}

.cookie__cat h3 {
  font-size: 0.88rem;
  font-weight: 700;
}

.cookie__cat p {
  font-size: 0.76rem;
  line-height: 1.45;
  color: var(--color-muted);
}

.cookie__badge {
  font-family: var(--font-display);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-gold-light);
  border: 1px solid rgba(212, 175, 55, 0.35);
  background: rgba(212, 175, 55, 0.1);
  padding: 0.12rem 0.4rem;
  border-radius: 999px;
}

.cookie__switch {
  position: relative;
  flex-shrink: 0;
  width: 2.7rem;
  height: 1.5rem;
  border-radius: 999px;
  background: #2a313c;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: background 0.22s var(--ease), border-color 0.22s var(--ease);
}

.cookie__switch.is-on {
  background: rgba(212, 255, 0, 0.22);
  border-color: rgba(212, 255, 0, 0.45);
}

.cookie__switch.is-locked {
  opacity: 0.85;
  cursor: default;
}

.cookie__knob {
  position: absolute;
  top: 50%;
  left: 0.18rem;
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 50%;
  background: #8b93a0;
  transform: translateY(-50%);
  transition: transform 0.22s var(--ease), background 0.22s var(--ease);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
}

.cookie__switch.is-on .cookie__knob {
  transform: translate(1.15rem, -50%);
  background: var(--color-lime);
}

.cookie__actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.cookie__btn {
  min-height: 2.55rem;
  padding: 0.65rem 0.85rem;
  border-radius: 999px;
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  transition: filter 0.2s var(--ease), background 0.2s var(--ease), color 0.2s var(--ease);
}

.cookie__btn--ghost {
  grid-column: 1 / -1;
  color: var(--color-muted);
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: transparent;
}

.cookie__btn--ghost:hover {
  color: var(--color-white);
  border-color: rgba(255, 255, 255, 0.22);
}

.cookie__btn--soft {
  color: var(--color-white);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.cookie__btn--soft:hover {
  background: rgba(255, 255, 255, 0.1);
}

.cookie__btn--solid {
  color: var(--color-black);
  background: var(--color-lime);
}

.cookie__btn--solid:hover {
  filter: brightness(1.06);
}

.cookie__fab {
  position: fixed;
  left: 1.15rem;
  bottom: 1.15rem;
  z-index: 85;
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 999px;
  color: var(--color-black);
  background: var(--color-lime);
  border: 1px solid rgba(212, 255, 0, 0.5);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
  transition: transform 0.22s var(--ease), filter 0.22s var(--ease);
}

.cookie__fab:hover {
  filter: brightness(1.05);
  transform: translateY(-2px);
}

.cookie-panel-enter-active,
.cookie-panel-leave-active {
  transition: opacity 0.28s var(--ease);
}

.cookie-panel-enter-active .cookie__panel,
.cookie-panel-leave-active .cookie__panel {
  transition: transform 0.32s var(--ease), opacity 0.28s var(--ease);
}

.cookie-panel-enter-from,
.cookie-panel-leave-to {
  opacity: 0;
}

.cookie-panel-enter-from .cookie__panel,
.cookie-panel-leave-to .cookie__panel {
  opacity: 0;
  transform: translateY(1.25rem) scale(0.98);
}

.cookie-fab-enter-active,
.cookie-fab-leave-active {
  transition: opacity 0.25s var(--ease), transform 0.25s var(--ease);
}

.cookie-fab-enter-from,
.cookie-fab-leave-to {
  opacity: 0;
  transform: scale(0.7);
}

@media (min-width: 721px) {
  .cookie__actions {
    grid-template-columns: 1fr 1fr 1.15fr;
  }

  .cookie__btn--ghost {
    grid-column: auto;
  }
}

@media (max-width: 720px) {
  .cookie__scrim {
    padding: 0.75rem 0.75rem 5rem;
  }

  .cookie__panel {
    width: 100%;
    border-radius: 16px 16px 14px 14px;
  }

  .cookie__fab {
    left: 0.85rem;
    bottom: 5rem;
    width: 2.75rem;
    height: 2.75rem;
  }
}
</style>
