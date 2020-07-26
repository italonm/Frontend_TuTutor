<template>
  <el-container direction="vertical">
    <!-- Titulo-->
    <el-row>
      <el-col :span="17">
        <div>
          <h3 style="font-weight:bold;">
            Aún no tienes un tutor asignado...
            <el-link type="danger" icon="fas fa-question-circle" @click="showProcesoTutoria()"></el-link>
          </h3>
          <h6>Por más que solicites tutor varias veces, se registrará 1 vez.</h6>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content">
          <el-button
            type="warning"
            @click="showSolicitudes()"
            class="buttonAdd"
            plain
          >&nbsp;Ver mis solicitudes</el-button>
        </div>
      </el-col>
    </el-row>
    <tipoTutorias></tipoTutorias>
    <informacionProceso :dialog="dialog" v-on:resetDialog="dialog=$event"></informacionProceso>
  </el-container>
</template>

<script>
import TipoTutorias from "./TipoTutorias";
import InformacionProceso from "./InformacionProceso";
export default {
  data() {
    return {
      tutores: [],
      showBox: false,
      tutorInfo: "",
      scheduler: [],
      tutoria: {
        s_id_student: "",
        s_code_tutor: "",
        s_tt: ""
      },
      dialog: false,
      dialogSolicitudes: false
    };
  },
  methods: {
    showProcesoTutoria() {
      console.log("mostrar infomr procesos");
      this.dialog = true;
    },
    showSolicitudes() {
      var that = this;
      that.$router.push("/Alumno/Mis Solicitudes");
    }
  },
  computed: {
    filterTutor: function() {
      console.log(localStorage.getItem("Id_facultad"));
      return this.tutores.filter(tutor => {
        return tutor.t_fullname.toLowerCase().match(this.search.toLowerCase());
      });
    }
  },
  created() {},
  components: {
    tipoTutorias: TipoTutorias,
    informacionProceso: InformacionProceso
  }
};
</script>
<style>
.text {
  font-size: 14px;
}

.item {
  padding: 5px 0;
}

.box-card {
  height: 100px;
  border-radius: 20px;
  cursor: pointer;
}
.box-group {
  height: 480px;
}
.box-information {
  height: 400px;
}
</style>