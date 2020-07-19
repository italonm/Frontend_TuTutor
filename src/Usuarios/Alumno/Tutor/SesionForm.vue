<template>
  <v-dialog v-model="dialog" persistent max-width="870px" color="color">
    <v-card>
      <v-card-title class="cardAdd justify-center">Registro de sesión</v-card-title>
      <v-container>
        <v-row justify="space-between">
          <v-col sm="8" lg="8" class="pl-4">
            <v-sheet height="400" color="blue">
              <v-calendar
                ref="calendar"
                v-model="start"
                type="week"
                :start="start"
                min-weeks:1
                max-days:3
                :events="events"
                :event-color="getEventColor"
                :weekdays="weekdays"
                first-interval="14"
                interval-minutes="30"
                interval-count="24"
                interval-height="40"
                color="blue"
              ></v-calendar>
            </v-sheet>
          </v-col>

          <v-col sm="4" lg="4" class="pl-4">
            <v-row class="flex-column ma-0 fill-height" justify="center">
              <v-col class="px-0">
                <v-btn fab small absolute left color="primary" @click="$refs.calendar.prev()">
                  <v-icon dark>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn fab small absolute right color="primary" @click="$refs.calendar.next()">
                  <v-icon dark>mdi-chevron-right</v-icon>
                </v-btn>
                <div class="text">
                  <h4 center absolute>Horario</h4>
                </div>
              </v-col>

              <v-col class="px-0">
                <div class="text">
                  <el-date-picker
                    v-model="cita.s_date"
                    type="date"
                    placeholder="Seleccione un día"
                    value-format="yyyy-MM-dd"
                    @change="updateDays"
                  ></el-date-picker>
                </div>
              </v-col>

              <v-col class="px-0">
                <div class="text">
                  <el-select
                    v-model="cita.s_hour"
                    placeholder="Seleccione una hora"
                    style="width:220px !important"
                  >
                    <i slot="prefix" class="el-input__icon el-icon-time"></i>
                    <el-option v-for="item in freeOptions" :key="item" :label="item" :value="item"></el-option>
                  </el-select>
                </div>
              </v-col>

              <v-col class="px-0">
                <v-btn absolute left color="success" @click="citar">Citar</v-btn>&nbsp;
                <v-btn absolute right color="error" @click="cancelar">Cerrar</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

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
  props: ["dialog", "idtutoria", "idtutor", "events"],
  data() {
    return {
      start: diaActual,
      freeOptions: "",
      weekdays: [1, 2, 3, 4, 5, 6],
      cita: {
        s_date: "",
        s_hour: "",
        s_id_assignment: "",
        s_id_student: localStorage.getItem("Id_usuario"),
        s_code_tutor: ""
      }
    };
  },
  methods: {
    getEventColor(event) {
      return event.color;
    },

    citar() {
      this.cita.s_id_assignment = this.idtutoria;
      this.cita.s_code_tutor = this.idtutor;
      this.$confirm("¿Desea reservar una cita?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancelar",
        type: "info"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "Cita reservada"
          });
          this.citarServicio();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Cita no solicitada"
          });
        });
    },

    citarServicio() {
      axios
        .post(
          "http://184.73.231.88:7002/api/student/register_appointment/",
          this.cita
        )
        .then(res => {
          console.log(res);
          this.cita.s_date = "";
          this.cita.s_hour = "";
          this.$emit("closeDialog");
        })
        .catch(error => {
          console.log(error);
        });
    },

    updateDays() {
      axios
        .post("/student/show_free_hours/", {
          s_date: this.cita.s_date,
          s_code_tutor: this.idtutor
        })
        .then(res => {
          this.freeOptions = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    cancelar() {
      this.cita.s_date = "";
      this.cita.s_hour = "";
      this.$emit("closeDialog");
      this.listar();
    }
  }
};
</script>>

<style lang="scss">
.v-calendar .v-event-timed-container {
  margin-right: 0px !important ;
}
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}

.my-event.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}
.text {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>