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
            icon="fas fa-praying-hands"
            @click="solicitar()"
            class="buttonAdd"
          >&nbsp;Solicitar tutoría</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- Tabla-->
    <v-container fluid grid-list-xl>
      <v-layout wrap justify-space-around>
        <v-flex v-for="tutoria in miFiltrado(tutorias)" :key="tutoria.t_email">
          <v-card class="mx-auto" max-width="300">
            <v-img
              class="white--text align-end"
              height="100px"
              src="data:image/jpeg;base64,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"
            >
              <v-card-title>{{ tutoria.t_tutoringtype}}</v-card-title>
            </v-img>
            <v-card-subtitle class="pb-0">{{ tutoria.t_fullname }}</v-card-subtitle>
            <v-card-text class="text--primary">
              <div>{{ tutoria.t_email }}</div>
              <div>{{tutoria.t_description}}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="green" text @click="editar(tutoria)">
                <i class="fas fa-calendar-times"></i>Agendar cita
              </v-btn>
              <v-btn color="#212DA8" text @click="editar(tutoria)">Sesiones</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <!--Formulario-->
    <sesionForm :dialog="dialog" :idtutor="idtutor" v-on:closeDialog="dialog = false"></sesionForm>
  </el-container>
</template>

<script>
import axios from "axios";
import SesionForm from "./SesionForm";

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
      idtutor: ""
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

    solicitar() {
      var that = this;
      that.$router.push("/Alumno/Solicitar Tutor");
    },

    editar(tutoria) {
      this.idtutor = tutoria.t_code;
      this.dialog = true;
    },

    miFiltrado(tutorias) {
      var app = this;
      return tutorias.filter(function(tutoria) {
        let regex = new RegExp("(" + app.search + ")", "i");
        return tutoria.t_email.match(regex) || tutoria.t_fullname.match(regex);
      });
    }
  },

  components: {
    sesionForm: SesionForm
  }
};
</script>
<style lang="scss">
.flex {
  flex-grow: 0;
}

.flex-empty {
  height: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;

  div {
    width: 150px;
  }
}
</style>
