<template>
  <q-layout view="lHh lpR lFf" container class="absolute-full overflow-hidden">
    <q-page-container>
      <div class="flex flex-center fit window-height" v-if="isLoading">
        <div class="rotationLoader">Loading</div>
      </div>

      <router-view v-slot="{ Component, route }" v-if="!isLoading">
        <Transition appear @before-appear="onBeforeAppear" @appear="onAppear" @after-appear="onAfterAppear"
          @before-enter="onBeforeEnter" @enter="onEnter" @after-enter="onAfterEnter" @before-leave="onBeforeLeave"
          @leave="onLeave" @after-leave="onAfterLeave" :css="false" duration="250" mode="out-in" :key="route">
          <component :is="Component" />
        </Transition>
      </router-view>

    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, onActivated, onDeactivated } from 'vue'

const isLoading = ref(false)

/* Life cycles hooks */

onMounted(() => {
  console.log('START_PAGE LAYOUT: mounted invoked\n\n');

  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false

    if (!document.body.classList.contains('app-active')) {
      document.body.classList.add('app-active')
    }
  }, 350)
})

onActivated(() => {
  console.log('START_PAGE LAYOUT: activated');
})

onDeactivated(() => {
  console.log('START_PAGE LAYOUT: deactivated');
})

/* Transition cycles */

// APPEAR

function onBeforeAppear(el) {
  console.log('START_PAGE LAYOUT: onBeforeAppear invoked');

}

function onAppear(el, done) {
  console.log('START_PAGE LAYOUT: onAppear invoked');
  done
}

function onAfterAppear(el) {
  console.log('START_PAGE LAYOUT: onAfterAppear invoked');
}

function onAfterCancelled(el) {
  console.log('START_PAGE LAYOUT: onAfterCancelled invoked');
}

// ENTER

function onBeforeEnter(el) {
  console.log('START_PAGE LAYOUT: onBeforeEnter invoked, el =', el);
}

function onEnter(el, done) {
  console.log('START_PAGE LAYOUT: onEnter invoked, el =', el);
  done
}

function onAfterEnter(el) {
  console.log('START_PAGE LAYOUT: onAfterEnter invoked, el =', el);
}

function onEnterCancelled(el) {
  console.log('START_PAGE LAYOUT: onEnterCancelled, el =', el);
}

// LEAVE

function onBeforeLeave(el) {
  console.log('START_PAGE LAYOUT: onBeforeLeave invoked, el =', el);
}

function onLeave(el, done) {
  console.log('START_PAGE LAYOUT: onLeave invoked, el =', el);
  done
}

function onAfterLeave(el) {
  console.log('START_PAGE LAYOUT: onAfterLeave invoked, el =', el);
}

function onLeaveCancelled(el) {
  console.log('START_PAGE LAYOUT: onLeaveCancelled, el =', el);
}
</script>
