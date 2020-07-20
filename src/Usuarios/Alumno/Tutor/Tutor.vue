<template>
  <el-container direction="vertical">
    <!-- Titulo-->
    <el-row>
      <el-col :xs="24" :sm="9">
        <div class="grid-content">
          <h1 style="text-align: center;">
            <i class="fas fa-chalkboard-teacher"></i>&nbsp;Mis tutorías
          </h1>
        </div>
      </el-col>
      <el-col :xs="12" :sm="8">
        <div class="grid-content">
          <el-input placeholder="Buscar tutoría" v-model="search" clearable>
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </el-col>
      <el-col :xs="12" :sm="7">
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
              src="https://thumbs.dreamstime.com/z/estudio-de-ayuda-de-los-estudiantes-del-profesor-17047874.jpg"
            >
              <v-card-title
                style="color:black;text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;"
              >{{ tutoria.t_tutoringtype}}</v-card-title>
            </v-img>
            <v-card-subtitle class="pb-0">{{ tutoria.t_fullname }}</v-card-subtitle>
            <v-card-text class="text--primary">
              <div>{{ tutoria.t_email }}</div>
              <div>{{tutoria.t_description}}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="green" text @click="agendar(tutoria)">
                <i class="fas fa-calendar-times"></i>Agendar cita
              </v-btn>
              <v-btn color="#212DA8" text @click="verTutoria(tutoria)">Ver tutoría</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <!--Formulario-->
    <sesionForm
      :dialog="dialog"
      :idtutoria="idtutoria"
      :idtutor="idtutor"
      :events="events"
      v-on:closeDialog="dialog = false"
    ></sesionForm>
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
      idtutoria: "",
      idtutor: "",
      events: []
    };
  },

  created() {
    this.listar();
  },

  methods: {
    listar() {
      var Id_usuario = localStorage.getItem("Id_usuario");
      axios
        .get(
          "http://184.73.231.88:7002/api/student/show_tutoring_list/" +
            Id_usuario
        )
        .then(res => {
          this.tutorias = res.data.tutor;
        })
        .catch(error => console.log(error));
    },

    solicitar() {
      var that = this;
      that.$router.push("/Alumno/Solicitar Tutor");
    },

    agendar(tutoria) {
      this.idtutoria = tutoria.t_id_assignment;
      this.idtutor = tutoria.t_code;
      this.dialog = true;
      axios
        .get("/student/show_calendar/" + tutoria.t_code)
        .then(res => {
          this.events = res.data.events;
        })
        .catch(error => console.log(error));
    },

    verTutoria(tutoria) {
      var that = this;
      that.$router.push("/Alumno/Sesiones");
      localStorage.setItem("Id_tutoria", tutoria.t_id_assignment);
      localStorage.setItem("Id_tutor", tutoria.t_code);
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
