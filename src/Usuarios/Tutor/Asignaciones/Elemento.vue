<template>
  <div class="courses-container">
    <div class="course">
      <div class="course-preview">
        <h6
          style="color:#FFFFFF; font-family: 'Muli', sans-serif;font-weight: 500;font-size: .875rem;"
        >Participantes</h6>
        <h4 style="font-family: 'Muli', sans-serif;font-weight: 500;font-size: 1.3125rem;">{{name}}</h4>
        <a style="color:#FFFFFF; font-size:13px;" @click="derivar()">
          Derivar
          <i class="fas fa-chevron-right"></i>
        </a>
      </div>
      <div class="course-info">
        <div class="exit">
          <v-btn icon color="#6B9486" x-small @click="finalizar()">
            <v-icon>fas fa-times</v-icon>
          </v-btn>
        </div>
        <div class="progress-container">
          <v-progress-linear
            :value="(comp.finished_activities/comp.total_activities*100).toString()"
            color="#76998c"
          ></v-progress-linear>
          <span
            class="progress-text"
            style="font-size:12px"
          >{{comp.finished_activities}}/{{comp.total_activities}} Actividades</span>
        </div>
        <h6
          style="font-family: 'Muli', sans-serif;font-weight: 500;font-size: .875rem;"
        >{{comp.state}}</h6>
        <h2
          style="font-family: 'Muli', sans-serif;font-weight: 500;font-size: 26px;"
        >{{comp.tutoring_type}}</h2>
        <button class="btn" v-on:click="verPlan()">Ver Plan</button>
      </div>
    </div>
    <!--Derivar-->
    <derivar
      :dialog="dialog"
      :name="name"
      :unid="comp"
      v-on:resetDialog="dialog=false"
      v-on:reset="reset()"
    ></derivar>
  </div>
</template>
<script>
import axios from "axios";
import { bus } from "../../../main";
import Derivar from "./Derivar.vue";
export default {
  name: "Elemento",
  props: ["comp", "callMethod", "name", "auxData"],
  data() {
    return {
      dialog: false,
      fin: {
        idassig: "",
      },
    };
  },
  methods: {
    verPlan() {
      this.callMethod(this.comp.id);
    },
    derivar() {
      this.dialog = true;
    },
    reset() {
      bus.$emit("verEstado", this.auxData);
    },
    finalizar() {
      var that = this;
      this.$confirm(
        "¿Está seguro de finalizar esta asignación con " +
          this.name +
          "? " +
          "Se eliminarán todas las citas pendientes",
        "Advertencia",
        {
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
          type: "warning",
        }
      )
        .then(() => {
          this.fin.idassig = this.comp.id;
          axios
            .post("/tutor/finish_assignment/", this.fin)
            .then((res) => {
              console.log(res);
              this.$message({
                type: "success",
                message: "Asignación finalizada",
              });
              bus.$emit("verEstado", that.auxData);
              this.newDialog = false;
              this.$emit("resetDialog", this.newDialog);
              this.listar();
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({ type: "info", message: "Finalización cancelada" });
        });
    },
  },
  components: {
    derivar: Derivar,
  },
};
</script>
<style>
@import "./Asignaciones.css";
</style>