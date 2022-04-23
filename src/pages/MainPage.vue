<template>
  <q-page class="flex flex-center column">
    <h1>Main Page</h1>

    <router-link to="/" class="btn btn-bright btn-medium btn-ui-show" data-sub-set-name="_exclude_">
      Home
    </router-link>
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onActivated, onDeactivated } from 'vue'

/* Life cycles hooks */

onBeforeMount(() => {
  console.log('MainPage onBeforeMount invoked');
})

onMounted(() => {
  console.log('MainPage onMounted invoked')
})

onActivated(() => {
  console.log('MainPage onActivated invoked')
})

onDeactivated(() => {
  console.log('MainPage onDeactivated invoked')
})

onBeforeUpdate(() => {
  console.log('MainPage onBeforeUpdate invoked');
})

onUpdated(() => {
  console.log('MainPage onUpdated invoked');
})

</script>
