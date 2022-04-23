<template>
  <q-layout view="lHh lpR lFf" container class="absolute-full overflow-hidden bi-border">
    <q-page-container>

      <div class="flex flex-center fit window-height" v-if="isLoading">
        <div class="rotationLoader">Loading</div>
      </div>

      <router-view v-slot="{ Component, route }" v-else>
        <Transition appear @before-enter="onBeforeEnter" @enter="onEnter" @after-enter="onAfterEnter"
          @before-leave="onBeforeLeave" @leave="onLeave" @after-leave="onAfterLeave" :css="false" duration="250"
          mode="out-in" :key="route">
          <KeepAlive>
            <component :is="Component" />
          </KeepAlive>
        </Transition>
      </router-view>

    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, onActivated, onDeactivated } from 'vue'

const isLoading = ref(false)

/* Life cycles hooks */

onBeforeMount(() => {
  console.log('START_PAGE LAYOUT: onBeforeMount');
})

onMounted(() => {
  console.log('START_PAGE LAYOUT: onMounted invoked');

  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false

    if (!document.body.classList.contains('app-active')) {
      document.body.classList.add('app-active')
    }
  }, 350)
})

onActivated(() => {
  console.log('START_PAGE LAYOUT: onActivated');
})

onDeactivated(() => {
  console.log('START_PAGE LAYOUT: onDeactivated');
})

/* Transition cycles */

const consColEnter = 'color: green'

// APPEAR

const onBeforeAppear = (el) => {
  console.log('START_PAGE LAYOUT: onBeforeAppear invoked');
}

const onAppear = (el, done) => {
  console.log('START_PAGE LAYOUT: onAppear invoked');
  setTimeout(() => {
    console.log('   ...done onAppear StartpageLayout');
    done
  }, 2000)
}

const onAfterAppear = (el) => {
  console.log('START_PAGE LAYOUT: onAfterAppear invoked');
}

// ENTER

const onBeforeEnter = (el) => {
  console.log('%cSTART_PAGE LAYOUT: onBeforeEnter invoked, el =', consColEnter, el);
}

const onEnter = (el, done) => {
  console.log('%cSTART_PAGE LAYOUT: onEnter invoked, el =', consColEnter, el);
  setTimeout(() => {
    console.log('   ...done onEnter StartpageLayout');
    done
  }, 2000)
}

const onAfterEnter = (el) => {
  console.log('%cSTART_PAGE LAYOUT: onAfterEnter invoked, el =', consColEnter, el);
}

// LEAVE

const onBeforeLeave = (el) => {
  console.log('START_PAGE LAYOUT: onBeforeLeave invoked, el =', el);
}

const onLeave = (el, done) => {
  console.log('START_PAGE LAYOUT: onLeave invoked, el =', el);
  done
}

const onAfterLeave = (el) => {
  console.log('START_PAGE LAYOUT: onAfterLeave invoked, el =', el);
}
</script>
