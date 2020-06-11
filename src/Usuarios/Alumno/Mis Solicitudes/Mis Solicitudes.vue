<template>
  <el-container direction="vertical">
    <!-- Titulo-->
    <el-row>
      <el-col :span="9">
        <div class="grid-content">
          <h1 style="text-align: center;">
            <i class="fas fa-chalkboard-teacher"></i>&nbsp;Mis tutorías
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
      <el-col :span="7">
        <div class="grid-content">
          <el-button
            type="success"
            icon="fas fa-user-plus"
            @click="insertar()"
            class="buttonAdd"
          >&nbsp;Agregar</el-button>
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

    <!--Formulario
    <coordinadorForm
      :form="form"
      :dialog="dialog"
      :action="action"
      v-on:resetDialog="dialog=false"
      v-on:resetList="listar()"
    ></coordinadorForm>-->
  </el-container>
</template>

<script>
import axios from "axios";
// import CoordinadorForm from "./CoordinadorForm";

export default {
  data() {
    return {
      tutorias: [],
      headers: [
        { text: "Nombre", value: "t_fullname" },
        { text: "Email", value: "t_email" },
        { text: "Horario", value: "t_schedule" },
        { text: "Reservar cita", value: "agendar", sortable: false }
      ],
      form: {
        person_name: "",
        person_last_name: "",
        person_email: "",
        person_phone_number: "",
        person_code: ""
      },
      search: "",
      dialog: false,
      action: ""
    };
  },

  created() {
    this.listar();
  },

  methods: {
    listar() {
      axios
        .get("/student/show_tutoring_list/" + 100)
        .then(res => {
          this.tutorias = res.data.tutor;
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

  //   components: {
  //     coordinadorForm: CoordinadorForm
  //   }
};
</script>