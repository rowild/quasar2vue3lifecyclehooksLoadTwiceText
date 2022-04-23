<template>
  <q-page padding class="flex flex-center column window-height">
    <div class="intro-container" ref="introContainer">
      <h1>Index Page</h1>

      <router-link to="/main" class="btn btn-bright btn-medium btn-ui-show" data-sub-set-name="_exclude_">
        Enter
      </router-link>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onActivated, onDeactivated } from 'vue'

/* Life cycles hooks */

onBeforeMount(() => {
  console.log('IndexPage onBeforeMount invoked');
})

onMounted(() => {
  console.log('IndexPage onMounted invoked')
})

onActivated(() => {
  console.log('IndexPage onActivated invoked')
})

onDeactivated(() => {
  console.log('IndexPage onDeactivated invoked')
})

onBeforeUpdate(() => {
  console.log('onBeforeUpdate invoked');
})

onUpdated(() => {
  console.log('onUpdated invoked');
})

</script>

<style lang="postcss" scoped>
.intro-container {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  font-family: var(--k2d);
}
</style>
