<template>
  <CHeader fixed with-subheader light style="background: #0BB783">
    <CToggler in-header class="ml-3 d-lg-none" @click="$store.commit('toggleSidebarMobile')" />
    <CToggler in-header class="ml-3 d-md-down-none" @click="$store.commit('toggleSidebarDesktop')" />
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
      <CIcon name="logo" height="48" alt="Logo" />
    </CHeaderBrand>
    <CHeaderNav class="d-md-down-none mr-auto">
      <CHeaderNavItem class="px-3">
        <div id="nombrecito" style="font-size:17px; font-weight:500; color:#ffffff"></div>
        <span style="font-size:13.5px; color:#FFFFFF" id="sesión"></span>
      </CHeaderNavItem>
    </CHeaderNav>
     <CCol  class="col-sm-2">
      <v-img :src="previewImagen" class="uploading-image img-fluid" height="50" contain max-width="1000" max-height="1000" alt="Responsive Image"/>
     </CCol>
    <CHeaderNav class="mr-4">
      <Desplegable />
    </CHeaderNav>
  </CHeader>
</template>

<script>
import Desplegable from "./Desplegable";
export default { 
  data() {
			return {
        previewImagen: "http://184.73.231.88:5000/api/admin/show_logo/37"+"?"+Date.now()
      }
  },
  name: "TheHeader",
  components: {
    Desplegable
  },
  mounted() {
    document.getElementById("nombrecito").innerHTML =
      JSON.parse(localStorage.getItem("Nombre")) +
      " " +
      JSON.parse(localStorage.getItem("Apellidos"));      
      console.log(localStorage.getItem("Nombre_programa"))
    if (JSON.parse(localStorage.getItem("EsCoordinador"))) {
      document.getElementById("sesión").innerHTML = "Sesión de Coordinador - " + localStorage.getItem("Nombre_programa");
    } else if (JSON.parse(localStorage.getItem("EsAdministrador"))) {
      document.getElementById("sesión").innerHTML = "Sesión de Administrador";
    } else if (JSON.parse(localStorage.getItem("EsAlumno"))) {
      document.getElementById("sesión").innerHTML = "Sesión de Alumno - " + localStorage.getItem("Nombre_programa");
    } else if (JSON.parse(localStorage.getItem("EsTutor"))) {
      document.getElementById("sesión").innerHTML = "Sesión de Tutor";
    }
  },
};
</script>
