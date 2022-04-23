<template>
  <q-layout view="lHh Lpr lFf">
    <h2>Main Layout</h2>

    <router-link to="/">
      Home
    </router-link>

    <!--
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Essential Links
        </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <h2>Main Layout</h2>

      <div class="flex flex-center fit window-height" v-if="isLoading">
        <div class="rotationLoader">Loading</div>
      </div>


        <router-view v-slot="{ Component, route }" v-if="!isLoading">
        <Transition appear @appear="onAppear" @enter="onEnter" @leave="onLeave" :css="false" duration="250"
          mode="out-in" :key="route">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </Transition>
      </router-view>

      <router-view v-else />
    </q-page-container>
      -->


  </q-layout>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, onActivated, onDeactivated } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const essentialLinks = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

const isLoading = ref(false)

const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

/* Life cycles hooks */

onBeforeMount(() => {
  console.log('MAIN LAYOUT: onBeforeMount');
})

onMounted(() => {
  console.log('MAIN LAYOUT: onMounted invoked\n\n');

  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false

    if (!document.body.classList.contains('app-active')) {
      document.body.classList.add('app-active')
    }
  }, 350)
})

onActivated(() => {
  console.log('MAIN LAYOUT: onActivated');
})

onDeactivated(() => {
  console.log('MAIN LAYOUT: onDeactivated');
})

/* Transition cycles */

// APPEAR

const onAppear = (el, done) => {
  console.log('MAIN LAYOUT: onAppear invoked');

  setTimeout(() => {
    console.log('   ...done')
    done()
  }, 2000)
}

// ENTER

const onEnter = (el, done) => {
  console.log('MAIN LAYOUT: onEnter invoked, el =', el);

  setTimeout(() => {
    console.log('   ...done')
    done()
  }, 2000)
}

// LEAVE

const onBeforeLeave = (el) => {
  console.log('MAIN LAYOUT: onBeforeLeave invoked, el =', el);
}

const onLeave = (el, done) => {
  console.log('MAIN LAYOUT: onLeave invoked, el =', el);
  done
}

const onAfterLeave = (el) => {
  console.log('MAIN LAYOUT: onAfterLeave invoked, el =', el);
}

const onLeaveCancelled = (el) => {
  console.log('MAIN LAYOUT: onLeaveCancelled, el =', el);
}
</script>
