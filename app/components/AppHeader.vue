<script setup lang="ts">
import { mainNav } from '~/utils/nav'

const route = useRoute()
const open = ref(false)

watch(() => route.path, () => {
  open.value = false
})

const isActive = (to: string) => {
  if (to === '/') return route.path === '/'
  return route.path === to || route.path.startsWith(`${to}/`)
}
</script>

<template>
  <header class="header" :class="{ 'header--open': open }">
    <div class="container-wide header__inner">
      <NuxtLink to="/" class="logo" aria-label="CX ENERTECH Home">
        <span class="logo__mark" aria-hidden="true">
          <svg viewBox="0 0 36 36" fill="none" width="36" height="36">
            <rect width="36" height="36" rx="6" fill="currentColor" class="logo__bg" />
            <path d="M18 6L21.5 15H14.5L18 6Z" fill="#F0A202" />
            <circle cx="18" cy="22" r="7" stroke="#1AA6A0" stroke-width="2" fill="none" />
            <path d="M18 17.5V22L21.5 24" stroke="#F5F7F4" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </span>
        <span class="logo__text">
          <span class="logo__name">CX ENERTECH</span>
          <span class="logo__tag">Smart Energy & EV</span>
        </span>
      </NuxtLink>

      <nav class="nav" :class="{ 'nav--open': open }" aria-label="Main">
        <NuxtLink
          v-for="item in mainNav"
          :key="item.to"
          :to="item.to"
          class="nav__link"
          :class="{ 'nav__link--active': isActive(item.to) }"
        >
          {{ item.label }}
        </NuxtLink>
        <NuxtLink to="/contact/quotation" class="btn btn-primary nav__cta-mobile">
          ขอใบเสนอราคา
        </NuxtLink>
      </nav>

      <div class="header__actions">
        <NuxtLink to="/contact/quotation" class="btn btn-primary header__cta">
          ขอใบเสนอราคา
        </NuxtLink>
        <button
          class="menu-btn"
          type="button"
          :aria-expanded="open"
          aria-label="Toggle menu"
          @click="open = !open"
        >
          <span /><span /><span />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 100;
  height: var(--header-h);
  background: rgba(5, 46, 36, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(245, 247, 244, 0.08);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  gap: 1.5rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-cream);
  flex-shrink: 0;
}

.logo__bg {
  color: var(--color-forest-mid);
}

.logo__text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.logo__name {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1rem;
  letter-spacing: 0.04em;
}

.logo__tag {
  font-size: 0.65rem;
  opacity: 0.55;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.nav {
  display: flex;
  align-items: center;
  gap: 0.15rem;
}

.nav__link {
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: rgba(245, 247, 244, 0.7);
  padding: 0.5rem 0.65rem;
  transition: color 0.25s;
  white-space: nowrap;
}

.nav__link:hover,
.nav__link--active {
  color: var(--color-cream);
}

.nav__link--active {
  color: var(--color-solar);
}

.nav__cta-mobile {
  display: none;
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header__cta {
  padding: 0.65rem 1.25rem;
  font-size: 0.8rem;
}

.menu-btn {
  display: none;
  flex-direction: column;
  gap: 5px;
  width: 28px;
  padding: 4px 0;
}

.menu-btn span {
  display: block;
  height: 2px;
  background: var(--color-cream);
  border-radius: 1px;
  transition: transform 0.3s var(--ease), opacity 0.3s;
}

.header--open .menu-btn span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.header--open .menu-btn span:nth-child(2) {
  opacity: 0;
}
.header--open .menu-btn span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 1024px) {
  .nav {
    display: none;
  }

  .nav--open {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    position: fixed;
    top: var(--header-h);
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--color-forest);
    padding: 1.5rem;
    gap: 0.25rem;
    overflow-y: auto;
  }

  .nav__link {
    font-size: 1rem;
    padding: 1rem 0.5rem;
    border-bottom: 1px solid rgba(245, 247, 244, 0.08);
  }

  .nav__cta-mobile {
    display: inline-flex;
    margin-top: 1.5rem;
  }

  .header__cta {
    display: none;
  }

  .menu-btn {
    display: flex;
  }
}
</style>
