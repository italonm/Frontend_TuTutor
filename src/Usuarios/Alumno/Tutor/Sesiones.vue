<template>
  <el-container direction="vertical">
    <!-- Titulo-->
    <el-row :gutter="20">
      <!--Sesiones-->
      <el-col :xs="24" :md="12">
        <div class="grid-content">
          <h1 style="text-align: center;">
            <i class="far fa-clock"></i>&nbsp;Sesiones
          </h1>
          <h6
            v-if="sessions.length==0"
            style="text-align: center;"
          >&nbsp;Agenda una sesión y comienza una nueva aventura</h6>
          <h6 v-if="sessions.length==0" style="text-align: center;">&nbsp;(Sesiones pendientes)</h6>
          <v-timeline>
            <v-timeline-item v-for="(session, i) in sessions" :key="i" :color="colors[i]" small>
              <template v-slot:opposite>
                <span
                  :class="`headline font-weight-bold ${colors[i]}--text`"
                  v-text="getDayOfWeek(session.fecha)"
                ></span>
              </template>
              <v-card :color="colors[i]" class="elevation-4">
                <v-card-title class="title" style="color:white">{{session.fecha}}</v-card-title>
                <v-card-text class="white text--primary">
                  <v-list class="transparent">
                    <v-list-item
                      v-for="(cita, y) in session.citas"
                      :key="y"
                      style="padding:0px !important"
                    >
                      <v-list-item-title>
                        <i v-if="cita.asistencia == 1" class="fas fa-check"></i>
                        <i v-else class="fas fa-times"></i>
                        {{ cita.lugar }}
                      </v-list-item-title>

                      <!-- <v-list-item-subtitle class="text-right">{{ "hora" }}</v-list-item-subtitle> -->
                    </v-list-item>
                  </v-list>
                  <!-- <div v-if="cita.asistencia == 1">
                    <i class="fas fa-check">&nbsp;Asistió</i>
                  </div>
                  <div v-else>
                    <i class="fas fa-times">&nbsp;No asistió</i>
                  </div>-->
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </div>
      </el-col>
      <!--Plan de acción-->
      <el-col :xs="24" :md="12">
        <h1 style="text-align: center;">
          <i class="fas fa-tasks"></i>&nbsp;Plan de acción
        </h1>
        <h6 v-if="plan.length==0" style="text-align: center;">&nbsp;Prepárate para la emoción</h6>
        <h6 v-if="plan.length==0" style="text-align: center;">&nbsp;(Actividades pendientes)</h6>
        <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
          <v-col v-for="(activity, i) in plan.slice(0, count)" :key="i" cols="12" :span="24">
            <v-card
              :color="activity.estado_plan == 'Realizado' ? 'green' : 'red'"
              dark
              height="100"
              class="elevation-4"
            >
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="headline" v-text="activity.estado_plan"></v-card-title>
                  <v-card-subtitle v-text="activity.actividad_plan"></v-card-subtitle>
                </div>

                <v-avatar class="ma-3" size="76" tile>
                  <v-img
                    src="data:image/png;base64,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"
                    v-if="activity.estado_plan == 'Realizado'"
                  ></v-img>
                  <v-img
                    src="https://i.pinimg.com/originals/ed/cd/5c/edcd5c5a0bea110ae3841aca631852ae.jpg"
                    v-else
                  ></v-img>
                </v-avatar>
              </div>
            </v-card>
          </v-col>
        </ul>
        <p v-if="loading">Loading...</p>
        <p v-if="noMore">No more</p>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      sessions: [],
      inset: false,
      colors: ["cyan", "green", "pink", "amber", "orange", "red"],
      plan: [],
      tutoria: {
        s_id_alumno: localStorage.getItem("Id_usuario"),
        s_code_tutor: localStorage.getItem("Id_tutoria")
      },
      loading: false,
      count: 1
    };
  },

  created() {
    this.listar();
  },

  methods: {
    listar() {
      console.log(this.tutoria);
      axios
        .post(
          "http://184.73.231.88:7002/api/student/show_sesion_with_actionplan_student/",
          this.tutoria
        )
        .then(res => {
          this.sessions = res.data[0].sesiones.reverse();
          this.plan = res.data[0].plan_de_accion;
          // this.total = res.data[0].plan_de_accion.length;
          console.log(this.tutoria);
          console.log(res.data[0].plan_de_accion);
        })
        .catch(error => console.log(error));
    },
    getDayOfWeek(date) {
      const dayOfWeek = new Date(date).getDay();
      return isNaN(dayOfWeek)
        ? null
        : [
            "Domingo",
            "Lunes",
            "Martes",
            "Miercoles",
            "Jueves",
            "Viernes",
            "Domingo"
          ][dayOfWeek];
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        this.count += 1;
        this.loading = false;
      }, 1000);
    }
  },

  computed: {
    noMore() {
      return this.count >= 20;
    },
    disabled() {
      return this.loading || this.noMore;
    }
  }
};
</script>