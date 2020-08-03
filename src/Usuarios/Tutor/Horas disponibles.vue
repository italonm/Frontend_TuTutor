<template>
  <v-dialog v-model="dialog" persistent max-width="910px" color="color">
    <v-card>
      <v-card-title class="cardAdd justify-center">Horario de disponibilidad</v-card-title>
      <v-layout wrap>
        <v-col sm="12" lg="3" class="mb-4 controls">
          <v-btn fab small absolute left color="primary" @click="$refs.calendar.prev()">
            <v-icon dark>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab small absolute right color="primary" @click="$refs.calendar.next()">
            <v-icon dark>mdi-chevron-right</v-icon>
          </v-btn>
          <br />
          <br />
          <v-select
            v-model="programa"
            :items="facultades"
            label="Selecciona una facultad"
            item-text="program_name"
            item-value="program_id"
            @change="listar()"
          ></v-select>
          <v-text-field
            v-if="type === 'custom-weekly'"
            v-model="minWeeks"
            label="Minimum Weeks"
            type="number"
          ></v-text-field>
          <v-select
            v-if="hasIntervals"
            v-model="intervals"
            :items="intervalsOptions"
            label="Intervalos"
          ></v-select>

          <h6>Agregar disponibilidad:</h6>
          <v-radio-group row v-model="tipoSesion" hide-details>
            <v-radio value="Sesión Presencial" label="Sesión Presencial"></v-radio>
            <v-radio value="Sesión Virtual" label="Sesión Virtual"></v-radio>
          </v-radio-group>

          <v-text-field v-model="ubicacion" label="Lugar/Enlace de la cita"></v-text-field>

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
            <template v-slot:activator="{ on }">
              <v-text-field v-model="start" label="Elegir día" readonly v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="start" no-title scrollable :min="actualidad">
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="startMenu = false">Cancel</v-btn>
              <v-btn color="primary" @click="$refs.startMenu.save(start)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <el-time-select
            placeholder="Hora inicio"
            style="width: 100%;"
            v-model="startTime"
            @change="limpiarCampoHoraFin"
            :picker-options="{
                    start: '06:00',
                    step: '00:30',
                    end: '22:00'
                  }"
          ></el-time-select>
          <br />
          <br />
          <el-time-select
            placeholder="Hora fin"
            v-model="endTime"
            style="width: 100%;"
            :picker-options="{
                    start: '06:00',
                    step: '00:30',
                    end: '22:00',
                    minTime: startTime
                  }"
          ></el-time-select>
          <br />
          <br />
          <v-btn color="success" @click="agregarEvento">Añadir al calendario</v-btn>
        </v-col>

        <v-col sm="12" lg="9" class="pl-4">
          <v-sheet height="580" color="color">
            <v-calendar
              ref="calendar"
              v-model="start"
              :type="type"
              :start="start"
              :min-weeks="minWeeks"
              :max-days="maxDays"
              :now="now"
              :dark="dark"
              :weekdays="weekdays"
              :first-interval="intervals.first"
              :interval-minutes="intervals.minutes"
              :interval-count="intervals.count"
              :interval-height="intervals.height"
              :color="color"
              :events="events"
              :event-color="getEventColor"
              :short-intervals="shortIntervals"
              @click:event="showEvent"
            ></v-calendar>
            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
            >
              <v-card color="grey lighten-4" min-width="300px" flat>
                <v-toolbar :color="selectedEvent.color" dark>
                  <v-spacer></v-spacer>
                  <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="deleteEvent(selectedEvent.id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                  <v-btn icon @click="selectedOpen = false">
                    <v-icon>mdi-close-circle-outline</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-text>
                  Inicio del evento:
                  <span v-html="selectedEvent.start"></span>
                  <br />Fin del evento:
                  <span v-html="selectedEvent.end"></span>
                </v-card-text>
                <v-card-actions></v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-col>
      </v-layout>
      <div
        class="v-card__actions"
        style="
                padding-bottom: 3px;
                padding-top: 3px;"
      >
        <v-spacer></v-spacer>

        <v-btn color="success" @click="repetirSemana">Repetir horario de la semana pasada</v-btn>
        <v-btn color="error" @click="cancelar">Cerrar</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
const weekdaysDefault = [1, 2, 3, 4, 5, 6, 0];
const intervalsDefault = {
  first: 6,
  minutes: 60,
  count: 18,
  height: 40,
};
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
  props: ["dialog"],
  data: () => ({
    facultades: [],
    programa: null,
    dark: false,
    startMenu: false,
    startMenuTime: false,
    endMenuTime: false,
    shortIntervals: false,
    start: diaActual,
    actualidad: diaActual,
    startTime: "",
    endTime: "",
    endMenu: false,
    nowMenu: false,
    tipoSesion: "Sesión Presencial",
    minWeeks: 1,
    now: null,
    type: "week",
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    ubicacion: "",
    weekdays: weekdaysDefault,
    weekdaysOptions: [
      { text: "Lunes - Domingo", value: weekdaysDefault },
      { text: "Lunes, Miercoles y Viernes", value: [1, 3, 5] },
      { text: "Lunes - Viernes", value: [1, 2, 3, 4, 5] },
    ],
    intervals: intervalsDefault,
    intervalsOptions: [
      { text: "Cada hora", value: intervalsDefault },
      {
        text: "Cada 30 minutos",
        value: { first: 0, minutes: 30, count: 48, height: 30 },
      },
      {
        text: "Cada 15 minutos",
        value: { first: 0, minutes: 15, count: 95, height: 60 },
      },
    ],
    maxDays: 7,
    color: "blue",
    events: [],
    tutor: {
      tutor_id: JSON.parse(localStorage.getItem("Id_usuario")),
      program_id: "",
    },
    schedule: {
      tutor_id: JSON.parse(localStorage.getItem("Id_usuario")),
      events: [],
      program_id: "",
      place: "",
      is_presencial: true,
    },
    eventosAgregados: [],
    borrarEvento: {
      schedule_id: "",
    },
  }),
  computed: {
    hasIntervals() {
      return (
        this.type in
        {
          week: 1,
          day: 1,
          "4day": 1,
          "custom-daily": 1,
        }
      );
    },
    hasEnd() {
      return (
        this.type in
        {
          "custom-weekly": 1,
          "custom-daily": 1,
        }
      );
    },
  },
  created() {
    var username = localStorage.getItem("Token");
    username = username.slice(1, username.length - 1);
    var password = "";
    var token = new Buffer(username + ":" + password).toString("base64");
    axios
      .get(
        "tutor/show_programs_from_tutor/" + localStorage.getItem("Id_usuario"),
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      )
      .then((res) => {
        this.facultades = res.data.programs;
        this.programa = this.facultades[0].program_id;
        this.listar();
      })
      .catch((error) => {
        console.log(error);
        this.$message.error("No tiene programas registrados");
      });
  },
  methods: {
    limpiarCampoHoraFin() {
      this.endTime = "";
    },
    listar() {
      axios
        .get(
          "/tutor/show_schedule/" +
            JSON.parse(localStorage.getItem("Id_usuario")) +
            "/" +
            this.programa
        )
        .then((res) => {
          this.events = res.data.schedules;
        })
        .catch((error) => console.log(error));
    },
    getEventColor(event) {
      return event.color;
    },
    cancelar() {
      this.startTime = "";
      this.endTime = "";
      this.newDialog = false;
      this.$emit("resetDialog", this.newDialog);
      this.listar();
    },
    agregarEvento() {
      if (this.ubicacion != "") {
        var dt = new Date(this.start);
        dt.setDate(dt.getDate() + 1);
        var diaSemana = dt.getDay();
        var nombreDia = "";
        if (diaSemana == 0) nombreDia = "Domingo";
        else if (diaSemana == 1) nombreDia = "Lunes";
        else if (diaSemana == 2) nombreDia = "Martes";
        else if (diaSemana == 3) nombreDia = "Miercoles";
        else if (diaSemana == 4) nombreDia = "Jueves";
        else if (diaSemana == 5) nombreDia = "Viernes";
        else nombreDia = "Sabado";

        this.eventosAgregados.push({
          id: null,
          name: nombreDia,
          start: this.start + " " + this.startTime,
          end: this.start + " " + this.endTime,
          color: "green",
        });
        this.schedule.program_id = this.programa;
        this.schedule.events = this.eventosAgregados;
        if (this.tipoSesion === "Sesión Presencial")
          this.schedule.is_presencial = true;
        else if (this.tipoSesion === "Sesión Virtual")
          this.schedule.is_presencial = false;
        this.schedule.place = this.ubicacion;
        axios
          .post("/tutor/add_schedule/", this.schedule)
          .then((res) => {
            console.log(res);
            this.$message({
              message: "Registro de evento exitoso.",
              type: "success",
            });
            this.listar();
          })
          .catch((error) => {
            console.log(error);
            this.$message.error("Error al registrar evento");
          });
        this.eventosAgregados = [];
      } else {
        this.$message.error("Falta agregar un lugar o enlace para la cita.");
      }
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    deleteEvent(selectedEventID) {
      this.borrarEvento.schedule_id = selectedEventID;
      axios
        .post("/tutor/delete_schedule/", this.borrarEvento)
        .then((res) => {
          console.log(res);
          this.$message({ message: "Eliminación exitosa.", type: "success" });
          this.selectedOpen = false;
          this.listar();
        })
        .catch((error) => {
          console.log(error);
          this.$message.error("No se pudo eliminar");
        });
    },
    repetirSemana() {
      this.tutor.program_id = this.programa;
      axios
        .post("/tutor/repeat_schedule/", this.tutor)
        .then((res) => {
          console.log(res);
          this.$message({
            message: "Registro de eventos exitoso.",
            type: "success",
          });
          this.listar();
        })
        .catch((error) => {
          console.log(error);
          this.$message.error("Error al repetir los eventos");
        });
    },
  },
};
</script>
