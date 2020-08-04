<template>
  <el-container direction="vertical">
    <!-- Titulo-->
    <el-row>
      <el-col :span="12">
        <div class="grid-content">
          <h1 style="text-align: center;">
            <i class="fas fa-bug"></i>&nbsp;Log de errores
          </h1>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <el-input placeholder="Buscar error" v-model="search" clearable>
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <el-button type="success" @click="descargar()" class="buttonAdd">&nbsp;Descargar Errores</el-button>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content"></div>
      </el-col>
    </el-row>

    <!-- Tabla-->
    <v-data-table
      :footer-props="{'items-per-page-options': [5, 10, 15, -1],
                      'items-per-page-text': 'Registros por página:',
                      'items-per-page-all-text': 'Listar todos'}"
      :headers="headers"
      :items="errores"
      :search="search"
      :items-per-page="5"
      :sort-by="['date']"
      multi-sort
      class="elevation-3"
      loading-text="Cargando.."
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
      errores: [],
      headers: [
        { text: "Fecha", value: "date" },
        { text: "Error", value: "reason" },
      ],
      search: "",
    };
  },

  created() {
    this.listar();
  },

  methods: {
    listar() {
      axios
        .get("/admin/show_error_log/" + localStorage.getItem("Id_institución"))
        .then((res) => {
          this.errores = res.data.errors;
        })
        .catch((error) => console.log(error));
    },

    descargar() {
      axios
        .get("http://184.73.231.88:5000/api/admin/download_error_log/", {
          responseType: "blob",
        })
        .then((res) => {
          var fileLink = document.createElement("a");
          fileLink.href = window.URL.createObjectURL(new Blob([res.data]));
          fileLink.setAttribute("download", "errores.txt");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>