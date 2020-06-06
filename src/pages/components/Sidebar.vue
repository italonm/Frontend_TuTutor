<template>
  <CSidebar
    fixed
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
    style="background: #1D2736"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <CIcon
        class="c-sidebar-brand-full"
        name="logo"
        size="custom-size"
        :height="35"
        viewBox="0 0 556 134"
      />
      <CIcon
        class="c-sidebar-brand-minimized"
        name="logo"
        size="custom-size"
        :height="35"
        viewBox="10 0 110 134"
      />
    </CSidebarBrand>

    <CRenderFunction flat :content-to-render="$options.nav" />
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
      style="background: #1D2736"
    />
  </CSidebar>
</template>

<script>
//AQUÍ DE ALGUNA FORMA ES EL LOGIN PERSONALIZADO :C

import navAdministrador from "./nav/_administrador";
import navCoordinador from "./nav/_coordinador";

var navAuxiliar = navAdministrador;
if (JSON.parse(localStorage.getItem("EsCoordinador"))) {
  navAuxiliar = navCoordinador;
} else if (JSON.parse(localStorage.getItem("EsAdministrador"))) {
  navAuxiliar = navAdministrador;
}

/* const nav = () => import ("./_nav") */

export default {
  name: "TheSidebar",
  nav: navAuxiliar,
  computed: {
    show() {
      return this.$store.state.sidebarShow;
    },
    minimize() {
      return this.$store.state.sidebarMinimize;
    }
  }
};
</script>
