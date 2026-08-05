<template>
  <div>
    <PageHero
      title="Solar Engineering"
      description="ออกแบบระบบโซลาร์อย่างละเอียด ครอบคลุมโครงสร้าง ไฟฟ้า และผลผลิตพลังงาน"
      :crumbs='[{"label":"Home","to":"/"},{"label":"Solar","to":"/solar"},{"label":"EPC","to":"/solar/epc"},{"label":"Engineering"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>ออกแบบระบบโซลาร์อย่างละเอียด ครอบคลุมโครงสร้าง ไฟฟ้า และผลผลิตพลังงาน</p>
          
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Solar Engineering | CX ENERTECH',
  description: 'ออกแบบระบบโซลาร์อย่างละเอียด ครอบคลุมโครงสร้าง ไฟฟ้า และผลผลิตพลังงาน',
})
</script>
