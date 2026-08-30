<template>
  <div class="app-shell">
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const { locale } = useLocale()

useHead(() => ({
  htmlAttrs: { lang: locale.value || 'th' },
}))
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
