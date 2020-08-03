<template>
  <CHeader fixed with-subheader light style="background: #3A80BE">
    <CToggler in-header class="ml-3 d-lg-none" @click="$store.commit('toggleSidebarMobile')" />
    <CToggler in-header class="ml-3 d-md-down-none" @click="$store.commit('toggleSidebarDesktop')" />
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
      <CIcon name="logo" height="48" alt="Logo" />
    </CHeaderBrand>
    <CHeaderNav class="d-md-down-none mr-auto">
      <CHeaderNavItem class="px-3">
        <div id="nombrecito" style="font-size:17px; font-weight:500; color:#ffffff"></div>
        <span style="font-size:13.5px; color:#ffffff" id="sesión"></span>
      </CHeaderNavItem>
    </CHeaderNav>
    <CCol class="col-sm-2">
      <v-img
        :src="previewImage"
        class="uploading-image img-fluid"
        height="50"
        contain
        max-width="1000"
        max-height="1000"
        alt="Responsive Image"
      />
    </CCol>
    <CHeaderNav class="mr-4">
      <Desplegable />
    </CHeaderNav>
  </CHeader>
</template>

<script>
import Desplegable from "./Desplegable";
import axios from "axios";
import { bus } from "../../main";
export default {
  data() {
    return {
      previewImage: "",
    };
  },
  name: "TheHeader",
  components: {
    Desplegable,
  },
  created() {
    this.getImage();
    bus.$on("updateLogo", (data) => {
      console.log(data);
      this.getImage();
    });
  },
  methods: {
    getImage() {
      axios
        .get(
          "/admin/show_logo/" + JSON.parse(localStorage.getItem("Id_usuario")),
          { responseType: "arraybuffer" }
        )
        .then((response) => {
          let image = btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          this.previewImage = `data:${response.headers[
            "content-type"
          ].toLowerCase()};base64,${image}`;
        });
    },
  },
  mounted() {
    document.getElementById("nombrecito").innerHTML =
      JSON.parse(localStorage.getItem("Nombre")) +
      " " +
      JSON.parse(localStorage.getItem("Apellidos"));
    if (JSON.parse(localStorage.getItem("EsCoordinador"))) {
      document.getElementById("sesión").innerHTML =
        "Sesión de Coordinador - " + localStorage.getItem("Nombre_programa");
    } else if (JSON.parse(localStorage.getItem("EsAdministrador"))) {
      document.getElementById("sesión").innerHTML = "Sesión de Administrador";
    } else if (JSON.parse(localStorage.getItem("EsAlumno"))) {
      document.getElementById("sesión").innerHTML =
        "Sesión de Alumno - " + localStorage.getItem("Nombre_programa");
    } else if (JSON.parse(localStorage.getItem("EsTutor"))) {
      document.getElementById("sesión").innerHTML = "Sesión de Tutor";
    }
  },
};
</script>
