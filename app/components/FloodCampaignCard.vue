<script setup lang="ts">
import { lowestFloodPrice, type FloodMarketplaceCatalog } from '~/utils/flood-marketplace'
import { formatFloodBaht } from '~/utils/flood-recovery'

const { t, locale } = useLocale()
const starting = ref<number | null>(null)

onMounted(async () => {
  try {
    const catalog = await $fetch<FloodMarketplaceCatalog>('/api/flood/packages')
    starting.value = lowestFloodPrice(catalog)
  } catch {
    starting.value = null
  }
})

const priceLabel = computed(() => {
  if (starting.value == null) return t('home.floodPrice')
  const amount = formatFloodBaht(starting.value)
  return locale.value === 'en' ? `From ${amount} THB` : `เริ่ม ${amount} บาท`
})
</script>

<template>
  <aside class="hero-campaign" aria-label="Flood recovery campaign">
    <div class="hero-campaign__copy">
      <p class="hero-campaign__kicker">
        <span class="hero-campaign__live">{{ t('home.floodLive') }}</span>
        {{ t('home.floodKicker') }}
      </p>
      <h2>{{ t('home.floodTitle') }}</h2>
      <p>{{ t('home.floodLead') }}</p>
    </div>
    <div class="hero-campaign__offer">
      <p class="hero-campaign__price">{{ priceLabel }}</p>
      <NuxtLink to="/flood-recovery#book" class="hero-campaign__cta">
        {{ t('home.floodCta') }}
        <span aria-hidden="true">→</span>
      </NuxtLink>
      <NuxtLink to="/flood-recovery" class="hero-campaign__more">{{ t('home.floodMore') }}</NuxtLink>
    </div>
  </aside>
</template>

<style scoped>
.hero-campaign {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 1.25rem 1.5rem;
  align-items: center;
  margin-bottom: 1.75rem;
  padding: 1.15rem 1.2rem 1.15rem 1.25rem;
  background: var(--color-lime);
  color: #111;
  border-radius: 18px;
  box-shadow: 0 22px 50px rgba(0, 0, 0, 0.38);
}

.hero-campaign__kicker {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 0.35rem;
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.hero-campaign__live {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-pill);
  background: #111;
  color: var(--color-lime);
  letter-spacing: 0.08em;
}

.hero-campaign__live::before {
  content: '';
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: var(--color-lime);
  box-shadow: 0 0 0 0 rgba(212, 255, 0, 0.7);
  animation: flood-pulse 1.8s ease-out infinite;
}

@keyframes flood-pulse {
  70% {
    box-shadow: 0 0 0 6px rgba(212, 255, 0, 0);
  }
}

.hero-campaign h2 {
  margin: 0 0 0.35rem;
  color: #111;
  font-size: clamp(1.45rem, 2.5vw, 2.05rem);
  line-height: 1.15;
  max-width: 16em;
}

.hero-campaign__copy p:last-child {
  margin: 0;
  max-width: 38rem;
  color: rgba(17, 17, 17, 0.78);
  font-size: 0.95rem;
  line-height: 1.55;
}

.hero-campaign__offer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.55rem;
  min-width: 12.5rem;
}

.hero-campaign__price {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
}

.hero-campaign__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  width: 100%;
  padding: 0.85rem 1.15rem;
  border-radius: var(--radius-pill);
  background: #111;
  color: var(--color-lime);
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: 0.02em;
}

.hero-campaign__cta:hover {
  background: #000;
}

.hero-campaign__more {
  font-size: 0.85rem;
  font-weight: 600;
  color: #111;
  text-decoration: underline;
  text-underline-offset: 0.18em;
}

@media (max-width: 720px) {
  .hero-campaign {
    grid-template-columns: 1fr;
  }

  .hero-campaign__offer {
    width: 100%;
  }
}
</style>
