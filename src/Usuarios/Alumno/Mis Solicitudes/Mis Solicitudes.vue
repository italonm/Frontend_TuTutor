<template>
  <el-container direction="vertical">
    <!-- Titulo-->
    <el-row>
      <el-col :span="9">
        <div class="grid-content">
          <h1 style="text-align: center;">
            <i class="far fa-envelope-open"></i>&nbsp;Mis Solicitudes
          </h1>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <el-input placeholder="Buscar tutoría" v-model="search" clearable>
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
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
      :items="tutorias"
      :search="search"
      :items-per-page="5"
      :sort-by="['t_fullname']"
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
      tutorias: [],
      headers: [
        { text: "Fecha", value: "date" },
        { text: "Tutor", value: "tutor" },
        { text: "Tipo Tutoría", value: "tipotutoria" },
        { text: "Estado", value: "estado" },
        { text: "Motivo", value: "motivo" },
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
        .get(
          "/student/show_assignment_request_student/" +
            localStorage.getItem("Id_usuario")
        )
        .then((res) => {
          this.tutorias = res.data.tableData;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>