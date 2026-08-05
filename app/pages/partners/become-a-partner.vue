<template>
  <div>
    <PageHero
      title="Become a Partner"
      description="สนใจเป็นพันธมิตรกับ CX ENERTECH — ติดต่อทีมเราเพื่อหารือโอกาสร่วมกัน"
      :crumbs='[{"label":"Home","to":"/"},{"label":"Partners","to":"/partners"},{"label":"Become a Partner"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>สนใจเป็นพันธมิตรกับ CX ENERTECH — ติดต่อทีมเราเพื่อหารือโอกาสร่วมกัน</p>
          <p><NuxtLink class="btn btn-primary" to="/contact">ติดต่อเพื่อเป็นพันธมิตร</NuxtLink></p>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Become a Partner | CX ENERTECH',
  description: 'สนใจเป็นพันธมิตรกับ CX ENERTECH — ติดต่อทีมเราเพื่อหารือโอกาสร่วมกัน',
})
</script>
