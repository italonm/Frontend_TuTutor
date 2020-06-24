<template>
  <el-container direction="vertical">
    <!-- Titulo-->
    <el-row>
      <el-col :span="9">
        <div class="grid-content">
          <h1 style="text-align: center;">
            <i class="fas fa-chalkboard-teacher"></i>&nbsp;Mis Solicitudes
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
    >
      <template v-slot:item.t_schedule="{ item }">
        <li
          class="list-group-item"
          v-for="hor in item.t_schedule"
          v-bind:key="hor"
        >{{ hor.start +" - "+ hor.end }}</li>
      </template>
      <template v-slot:item.agendar="{ item }">
        <el-button type="info" icon="fas fa-calendar-times" circle @click="agendar(item)"></el-button>
      </template>
    </v-data-table>
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
        { text: "Estado", value: "estado" }
      ],
      form: {
        person_name: "",
        person_last_name: "",
        person_email: "",
        person_phone_number: "",
        person_code: ""
      },
      search: "",
      action: ""
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
        .then(res => {
          this.tutorias = res.data.tableData;
          console.log(this.tutorias);
        })
        .catch(error => console.log(error));
    },

    insertar() {
      this.action = "Registrar coordinador";
      this.dialog = true;
    },

    editar(item) {
      this.action = "Editar coordinador";
      this.form = Object.assign({}, item);
      this.dialog = true;
    }
  }
};
</script>