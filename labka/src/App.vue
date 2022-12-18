<template>
  <navbar-component>
    <template #icon>
      <CommunityIcon
          style="cursor: pointer;" @click="$router.push('/')"
      />
    </template>
    <template #menu>
      <MenuIcon
          @click="toggle_menu()"
      />
    </template>
  </navbar-component>
  <div class="content">
    <router-view/>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import NavbarComponent from "./components/UI/NavbarComponent.vue";
import MenuIcon from "./components/icons/IconMenu.vue";
import CommunityIcon from "./components/icons/IconCommunity.vue";
import {toggle_menu, start_toggle} from "./functions/function_toggle";

export default defineComponent({
  components: {
    MenuIcon,
    CommunityIcon,
    NavbarComponent
  },
  methods: {
    toggle_menu
  },
  mounted() {
    start_toggle();
  }
})
</script>

<style scoped>
#api {
  min-height: 100vh;
}

main {
  margin: 50px auto;

}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}


nav a:first-of-type {
  border: 0;
}

</style>
