<template>
  <div v-if="isLoading" class="flex flex-center fit">
    <div class="rotationLoader">Loading...</div>
  </div>

  <router-view v-slot="{ Component, route }" v-if="!isLoading">
    <!--
      <transition appear mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"
    -->
    <Transition appear mode="out-in" @before-appear="onBeforeAppear" @appear="onAppear" @after-appear="onAfterAppear"
      @before-enter="onBeforeEnter" @enter="onEnter" @after-enter="onAfterEnter" @before-leave="onBeforeLeave"
      @leave="onLeave" @after-leave="onAfterLeave" :css="false" duration="350" :key="route">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<script setup>
import { ref, onMounted, onActivated, onDeactivated } from "vue";

let isLoading = ref(false);

/* Life cycles hooks */

onMounted(() => {
  console.log("App onMounted invoked");

  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;

    if (!document.body.classList.contains("app-active")) {
      document.body.classList.add("app-active");
    }
  }, 500);
});

onActivated(() => {
  console.log("App onActivated invoked");
});

onDeactivated(() => {
  console.log("App onDeactivated invoked");
});

/* Transition cycles */

// APPEAR

function onBeforeAppear(el) {
  // console.log('APP: onBeforeAppear invoked');
  // gsap.set(el, { opacity: 0.25 })
}

function onAppear(el, done) {
  // console.log('APP: onAppear invoked');
  // gsap.to(el, { opacity: 1, duration: 2, onComplete: done })
  done
}

function onAfterAppear(el) {
  // console.log('APP: onAfterAppear invoked');
}

function onAfterCancelled(el) {
  // console.log('APP: onAfterCancelled invoked');
}

// ENTER

function onBeforeEnter(el) {
  // console.log('APP: onBeforeEnter invoked');
}

function onEnter(el, done) {
  // console.log('APP: onEnter invoked');
  done
}

function onAfterEnter(el) {
  // console.log('APP: onAfterEnter invoked, el =', el);
}

function onEnterCancelled(el) {
  // console.log('APP: onEnterCancelled, el =', el);
}

// LEAVE

function onBeforeLeave(el) {
  // console.log('APP: onBeforeLeave invoked, el =', el);
}

function onLeave(el, done) {
  // console.log('APP: onLeave invoked, el =', el);
  done
}

function onAfterLeave(el) {
  // console.log('APP: onAfterLeave invoked, el =', el);
}

function onLeaveCancelled(el) {
  // console.log('APP: onLeaveCancelled, el =', el);
}
</script>

<style lang="postcss">
.rotationLoader {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  border-top: 4px solid #FFF;
  border-right: 4px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

.rotationLoader::after {
  content: '';
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border-left: 4px solid orange;
  border-bottom: 4px solid transparent;
  animation: rotation 0.5s linear infinite reverse;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
