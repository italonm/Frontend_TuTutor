<template>
  <div class="c-app">
    <TheSidebar />
    <CWrapper>
      <TheHeader />
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid>
            <transition name="fade">
              <router-view></router-view>
            </transition>
          </CContainer>
        </main>
        <TheFooter />
      </div>
    </CWrapper>
  </div>
</template>

<script>
import TheSidebar from "../components/SidebarAlumno";
import TheHeader from "../components/Header";
import TheFooter from "../components/Footer";
export default {
  name: "TheContainer",
  components: {
    TheSidebar,
    TheHeader,
    TheFooter
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.c-body {
  background: rgb(245, 240, 240) ;
  background-size:cover;
}
</style>
