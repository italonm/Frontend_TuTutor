<template>
  <div class="nav containerPrincipal">
    <div class="column">
      <h1 class="header">Bienvenido</h1>
      <p class="subheader">Clickee y complete para continuar</p>
      <div class="search">
        <div class="search_bar">
          <input id="searchOne" type="checkbox" />
          <label for="searchOne">
            <i class="icon fas fa-key"></i>
            <i class="last icon far fa-paper-plane" @click="validar"></i>
            <p>|</p>
          </label>
          <input placeholder="Ingrese el código..." type="text" v-model="setCode.code" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      setCode: {
        code: "",
      },
    };
  },
  methods: {
    validar() {
      var that = this;
      axios
        .post("user/authenticate_mail/", that.setCode)
        .then((response) => {
          let Id_usuario = response.data.id;
          localStorage.setItem("Id_usuario", JSON.stringify(Id_usuario));
          this.$router.push("/Reestablecer");
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error);
            that.$message.error("Datos inválidos, por favor ingrese de nuevo.");
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./Password.scss";
</style>