<template>
  <div class="nav containerPrincipal">
    <div class="column">
      <h1 class="header">Reestablecer</h1>
      <p class="subheader">Parece que olvidaste algo, clickea y completa para continuar</p>
      <div class="search">
        <div class="search_bar">
          <input id="searchOne" type="checkbox" />
          <label for="searchOne">
            <i class="icon fas fa-key"></i>
            <i class="last icon far fa-paper-plane" @click="validar"></i>
            <p>|</p>
          </label>
          <input placeholder="Ingresa tu correo electrónico..." type="text" v-model="setCode.email" />
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
        email: "",
      },
    };
  },
  methods: {
    validar() {
      var that = this;
      axios
        .post("user/forgot_password/", that.setCode)
        .then((response) => {
          let Id_usuario = response.data.id;
          localStorage.setItem("Id_usuario", JSON.stringify(Id_usuario));
          that.$message.success("Revise su correo electrónico");
          this.$router.push("/PassSet");
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error);
            that.$message.error(
              "Este correo electrónico no se encuentra registrado"
            );
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./Password.scss";
</style>