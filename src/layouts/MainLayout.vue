<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> LIDERANÇA DO PSDB - SISCOPA </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Produtos",
    caption: "cadastro de produtos",
    icon: "dining",
    link: "http://localhost:9000/#/produtolist",
  },
  {
    title: "Funcionários",
    caption: "cadastro de funcionários",
    icon: "people",
    link: "http://localhost:9000/#/usuariolist",
  },
  {
    title: "Compras",
    caption: "cadastro de compras",
    icon: "local_grocery_store",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Extrato",
    caption: "extrato por funcionário",
    icon: "receipt_long",
    link: "https://forum.quasar.dev",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
