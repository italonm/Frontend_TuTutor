<template>
  <div>
    <el-row>
      <el-col :span="8">
        <div class="grid-content">
          <h1 style="text-align: center;">
            <i class="far fa-calendar-alt"></i>
            &nbsp;{{"Agenda de sesiones"}}
          </h1>
        </div>
      </el-col>
    </el-row>

    <!------CALENDARIO DEL ALUMNO------>
    <el-col :xs="20" :sm="12" :md="12" :lg="15">
      <el-row>
        <v-sheet tile height="54" color="grey lighten-3" class="d-flex">
          <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-select
            v-model="type"
            :items="types"
            dense
            outlined
            hide-details
            class="ma-2"
            label="Vista"
          ></v-select>
          <v-spacer></v-spacer>
          <v-btn icon class="ma-2" @click="$refs.calendar.next()">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-sheet>
      </el-row>

      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="value"
          :weekdays="weekday"
          :type="type"
          :now="now"
          :events="events"
          :event-overlap-mode="mode"
          :event-overlap-threshold="30"
          :event-color="getEventColor"
          @change="getEvents"
          @click:date="viewDay"
          @click:more="viewDay"
        ></v-calendar>
      </v-sheet>
    </el-col>
    <!----------------->

    <!------SESIONES DEL ALUMNO------>
    <el-col :xs="20" :sm="12" :md="12" :lg="7">
      <el-row>
        <el-col :xs="20" :sm="12" :md="12" :lg="15">
          <v-menu
            ref="startMenu"
            v-model="startMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="start"
            transition="scale-transition"
            min-width="290px"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="start"
                class="ml-10"
                label="Ver desde"
                dense
                readonly
                outlined
                hide-details
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="start" no-title reactive scrollable>
              <v-btn text color="primary" @click="startMenu = false">Cancelar</v-btn>
              <v-btn text color="primary" @click="changeDay(startMenu, start)">Aceptar</v-btn>
            </v-date-picker>
          </v-menu>
        </el-col>

        <el-col :xs="20" :sm="12" :md="12" :lg="8">
          <v-btn outlined class="ml-8" color="grey darken-2" @click="setToday">Hoy</v-btn>
        </el-col>
      </el-row>

      <v-card max-width="600" class="ml-10" max-height="600">
        <v-card-title class="cardAdd justify-center">Sesiones</v-card-title>

        <v-list two-line style="max-height:600px">
          <v-list-item v-for="notificacion in notificaciones" :key="notificacion.id">
            <v-list-item-content style="color: gray">
              <v-list-item-title v-text="notificacion.date"></v-list-item-title>
              <v-list-item-title v-text="notificacion.hours"></v-list-item-title>
              <v-list-item-title v-text="notificacion.tutor"></v-list-item-title>
              <v-list-item-subtitle class="text--primary" v-text="notificacion.tutoring_type"></v-list-item-subtitle>
              <div v-if="notificacion.place == ''">
                <a :href="notificacion.link" target="_blank">Enlace de la reunión</a>
              </div>
              <div v-else>
                <v-list-item-subtitle v-text="notificacion.place"></v-list-item-subtitle>
              </div>
            </v-list-item-content>
          </v-list-item>

          <v-divider v-if=" 3 < notificaciones.length" :key="id"></v-divider>
        </v-list>
      </v-card>
    </el-col>
    <!----------------->
  </div>
</template>

<script>
import axios from "axios";
const weekdaysDefault = [1, 2, 3, 4, 5, 6, 0];
var now = new Date();
var diaActual =
  now.getFullYear() +
  "-" +
  (now.getMonth() + 1 < 10 ? "0" : "") +
  (now.getMonth() + 1) +
  "-" +
  (now.getDate() < 10 ? "0" : "") +
  now.getDate();
export default {
  data: () => ({
    notificaciones: [],
    threeLine: true,
    rounded: true,
    start: diaActual,
    now: null,
    startMenu: false,
    fechaSesiones: diaActual,
    type: "month",
    types: ["month", "week", "day", "4day"],
    mode: "stack",
    weekday: weekdaysDefault,
    weekdaysOptions: [
      { text: "Lunes - Domingo", value: weekdaysDefault },
      { text: "Lunes, Miercoles y Viernes", value: [1, 3, 5] },
      { text: "Lunes - Viernes", value: [1, 2, 3, 4, 5] },
    ],
    value: "",
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
  }),
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    changeDay(startMenu, start) {
      this.$refs.startMenu.save(start);
      this.start = start;
      this.fechaSesiones = start;
      this.listarSesiones();
    },

    viewDay({ date }) {
      this.start = date;
      this.fechaSesiones = date;
      this.listarSesiones();
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.start = diaActual;
      this.fechaSesiones = diaActual;
      this.focus = "";
      this.listarSesiones();
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    getEvents() {
      axios
        .get(
          "/student/show_student_history/" + localStorage.getItem("Id_usuario")
        )
        .then((res) => {
          this.events = res.data.sessions;
        })
        .catch((error) => console.log(error));
    },

    listarSesiones() {
      axios
        .post("/student/show_sessions_with_date/", {
          student_id: localStorage.getItem("Id_usuario"),
          date: this.fechaSesiones,
        })
        .then((res) => {
          this.notificaciones = res.data.sessions;
        })
        .catch((error) => console.log(error));
    },

    openURL(url) {
      window.open(url);
    },
  },

  created() {
    this.listarSesiones();
  },
};
</script>

<style lang="scss">
hr {
  margin-top: 0% !important;
  margin-bottom: 0% !important;
}
</style>