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
        <BrandLogo variant="light" :height="36" />
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
  background: rgba(14, 26, 43, 0.94);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(212, 175, 55, 0.15);
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
  flex-shrink: 0;
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
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.72);
  padding: 0.5rem 0.65rem;
  transition: color 0.25s;
  white-space: nowrap;
}

.nav__link:hover,
.nav__link--active {
  color: var(--color-white);
}

.nav__link--active {
  color: var(--color-gold);
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
  font-size: 0.75rem;
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
  background: var(--color-white);
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
    background: var(--color-navy);
    padding: 1.5rem;
    gap: 0.25rem;
    overflow-y: auto;
  }

  .nav__link {
    font-size: 1rem;
    padding: 1rem 0.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
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
