<template>
  <h1>App</h1>

  <div v-if="isLoading" class="flex flex-center fit">
    <div class="rotationLoader">Loading...</div>
  </div>

  <router-view v-slot="{ Component, route }" v-else>
    <Transition appear mode="out-in" @before-appear="onBeforeAppear" @appear="onAppear" @enter="onEnter"
      @leave="onLeave" duration="350" :css="false" :key="route">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </Transition>
  </router-view>
  <!--
  <router-view v-else />
  -->

</template>

<script setup>
import { ref, onBeforeMount, onMounted, onActivated, onDeactivated, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, onErrorCaptured } from "vue";

let isLoading = ref(false);

/* Life cycles hooks */

const consCol = "color: darkolivegreen"

onBeforeMount(() => {
  console.log("%cApp onBeforeMount invoked", consCol);
});

onMounted(() => {
  console.log("%cApp onMounted invoked", consCol);

  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;

    if (!document.body.classList.contains("app-active")) {
      document.body.classList.add("app-active");
    }
  }, 500);
});

onActivated(() => {
  console.log("%cApp onActivated invoked", consCol);
});

onDeactivated(() => {
  console.log("%cApp onDeactivated invoked", consCol);
});

onBeforeUpdate(() => {
  console.log("%cApp onBeforeUpdate invoked", consCol);
});

onUpdated(() => {
  console.log("%cApp onUpdated invoked", consCol);
});

onBeforeUnmount(() => {
  console.log("%cApp onBeforeUnmount invoked", consCol);
});

onUnmounted(() => {
  console.log("%cApp onUnmounted invoked", consCol);
});

onErrorCaptured(error => {
  console.error(error)
})

/* Transition cycles */

const consColTrans = "color: crimson"

// APPEAR

const onBeforeAppear = (el) => {
  console.log('%cAPP: onBeforeAppear invoked', consColTrans);
  // gsap.set(el, { opacity: 0.25 })
}

const onAppear = (el, done) => {
  console.log('%cAPP: onAppear invoked', consColTrans);
  // gsap.to(el, { opacity: 1, duration: 2, onComplete: done })
  setTimeout(() => {
    console.log(' %c  ...done onAppear App', consColTrans);
    done
  }, 2000)
}

const onAfterAppear = (el) => {
  console.log('%cAPP: onAfterAppear invoked', consColTrans);
}

// ENTER

const onBeforeEnter = (el) => {
  console.log('%cAPP: onBeforeEnter invoked', consColTrans);
}

const onEnter = (el, done) => {
  console.log('%cAPP: onEnter invoked', consColTrans);
  setTimeout(() => {
    console.log('%c   ...done onEnter App', consColTrans);
    done
  }, 2000)
}

const onAfterEnter = (el) => {
  console.log('%cAPP: onAfterEnter invoked, el =', el, consColTrans);
}

// LEAVE

const onBeforeLeave = (el) => {
  console.log('%cAPP: onBeforeLeave invoked, el =', el, consColTrans);
}

const onLeave = (el, done) => {
  console.log('%cAPP: onLeave invoked, el =', el, consColTrans);
  setTimeout(() => {
    console.log('   ...done onLeave App');
    done
  }, 2000)
}

const onAfterLeave = (el) => {
  console.log('%cAPP: onAfterLeave invoked, el =', el, consColTrans);
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
