<template>
  <el-container direction="vertical">
    <!-- Titulo-->
    <el-row>
      <el-col :span="2">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <h1 style="text-align: center;">
            <i class="fas fa-users"></i>&nbsp;Usuarios
          </h1>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <el-input placeholder="Buscar usuario" v-model="search" clearable>
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content"></div>
      </el-col>
    </el-row>

    <!-- Tabla-->
    <v-data-table
      :footer-props="{
        'items-per-page-options': [5, 10, 15, -1],
        'items-per-page-text': 'Registros por página:',
        'items-per-page-all-text': 'Listar todos',
      }"
      :headers="headers"
      :items="usuarios"
      :search="search"
      :items-per-page="5"
      :sort-by="['person_code']"
      multi-sort
      class="elevation-3"
      loading-text="Cargando.."
      :loading="loading"
      height="288px"
      fixed-header
    ></v-data-table>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      usuarios: [],
      headers: [
        { text: "Código", value: "person_code" },
        { text: "Nombre", value: "person_full_name" },
        { text: "Rol", value: "person_rol" },
        { text: "Teléfono", value: "person_phone_number" },
        { text: "Correo", value: "person_email" }
      ],
      search: "",
      loading: false
    };
  },

  created() {
    this.listar();
  },

  methods: {
    listar() {
      axios
        .get("/admin/show_users/")
        .then(res => {
          this.usuarios = res.data.users;
        })
        .catch(error => console.log(error));
    }
  }
};
</script>