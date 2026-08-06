<script setup lang="ts">
import { mainNav } from '~/utils/nav'

const route = useRoute()
const open = ref(false)
const openGroup = ref<string | null>(null)

watch(() => route.path, () => {
  open.value = false
  openGroup.value = null
})

const isActive = (to: string) => {
  if (to === '/') return route.path === '/'
  return route.path === to || route.path.startsWith(`${to}/`)
}

const isChildActive = (childTo: string, parentTo: string) => {
  if (childTo === parentTo) return route.path === childTo
  return route.path === childTo || route.path.startsWith(`${childTo}/`)
}

const onGroupClick = (event: MouseEvent, label: string) => {
  // Mobile menu: first tap expands submenu instead of navigating away
  if (open.value) {
    event.preventDefault()
    openGroup.value = openGroup.value === label ? null : label
  }
}
</script>

<template>
  <header class="header" :class="{ 'header--open': open }">
    <div class="container-wide header__inner">
      <NuxtLink to="/" class="logo" aria-label="CX ENERTECH Home">
        <BrandLogo variant="light" :height="52" />
      </NuxtLink>

      <nav class="nav" :class="{ 'nav--open': open }" aria-label="Main">
        <template v-for="item in mainNav" :key="item.to">
          <div
            v-if="item.children?.length"
            class="nav__group"
            :class="{ 'nav__group--open': openGroup === item.label }"
            @mouseenter="openGroup = item.label"
            @mouseleave="openGroup = null"
          >
            <NuxtLink
              :to="item.to"
              class="nav__link"
              :class="{ 'nav__link--active': isActive(item.to) }"
              @click="onGroupClick($event, item.label)"
            >
              {{ item.label }}
              <span class="nav__chev" aria-hidden="true" />
            </NuxtLink>
            <div class="nav__dropdown" role="menu">
              <NuxtLink
                v-for="child in item.children"
                :key="child.to"
                :to="child.to"
                class="nav__dropdown-link"
                :class="{ 'nav__dropdown-link--active': isChildActive(child.to, item.to) }"
                role="menuitem"
              >
                {{ child.label }}
              </NuxtLink>
            </div>
          </div>
          <NuxtLink
            v-else
            :to="item.to"
            class="nav__link"
            :class="{ 'nav__link--active': isActive(item.to) }"
          >
            {{ item.label }}
          </NuxtLink>
        </template>
        <NuxtLink to="/contact" class="btn btn-primary nav__cta-mobile">
          ติดต่อเรา
        </NuxtLink>
      </nav>

      <div class="header__actions">
        <NuxtLink to="/contact" class="btn btn-primary header__cta">
          ติดต่อเรา
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
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
  background: rgba(11, 11, 11, 0.88);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(212, 255, 0, 0.08);
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

.nav__group {
  position: relative;
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
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.nav__link:hover {
  color: var(--color-white);
}

.nav__link--active {
  color: var(--color-white);
}

.nav__link--active::after {
  content: '';
  position: absolute;
  left: 0.65rem;
  right: 0.65rem;
  bottom: 0.15rem;
  height: 2px;
  background: var(--color-lime);
}

.nav__chev {
  width: 0;
  height: 0;
  border-left: 3.5px solid transparent;
  border-right: 3.5px solid transparent;
  border-top: 4px solid currentColor;
  opacity: 0.7;
}

.nav__dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 220px;
  padding: 0.5rem 0;
  background: #111;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top: 2px solid var(--color-lime);
  opacity: 0;
  visibility: hidden;
  transform: translateY(6px);
  transition: opacity 0.2s, transform 0.2s, visibility 0.2s;
  z-index: 120;
}

.nav__group:hover .nav__dropdown,
.nav__group--open .nav__dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.nav__dropdown-link {
  display: block;
  padding: 0.7rem 1rem;
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.75);
  transition: color 0.2s, background 0.2s;
}

.nav__dropdown-link:hover,
.nav__dropdown-link--active {
  color: var(--color-lime);
  background: rgba(212, 255, 0, 0.06);
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
    background: var(--color-black);
    padding: 1.5rem;
    gap: 0.25rem;
    overflow-y: auto;
  }

  .nav__group {
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .nav__link {
    font-size: 1rem;
    padding: 1rem 0.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    width: 100%;
  }

  .nav__group .nav__link {
    border-bottom: none;
  }

  .nav__link--active::after {
    display: none;
  }

  .nav__dropdown {
    position: static;
    opacity: 1;
    visibility: visible;
    transform: none;
    border: none;
    border-top: none;
    background: transparent;
    padding: 0 0 0.75rem 0.75rem;
    display: none;
    min-width: 0;
  }

  .nav__group--open .nav__dropdown {
    display: block;
  }

  .nav__dropdown-link {
    padding: 0.65rem 0.5rem;
    font-size: 0.9rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
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
