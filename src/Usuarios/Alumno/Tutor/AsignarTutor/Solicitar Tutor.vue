<template>
  <el-container direction="vertical">
    <!-- Titulo-->
    <div>
      <h3 style="font-weight:bold;">
        Aún no tienes un tutor asignado...

        <el-link type="danger" icon="fas fa-question-circle"></el-link>
      </h3>
      <h6>
        Selecciona el tutor que deseas que se te asigne
      </h6>
    </div>
    <el-row>
      <el-col :span="8">
        <div class="grid-content">
          <el-input placeholder="Buscar Tutor" v-model="search" clearable>
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </el-col>
      <el-col :span="6" offset="10">
        <div class="grid-content">
          <el-button type="warning" @click="insertar()" class="buttonAdd" plain
            >&nbsp;Ver mis solicitudes</el-button
          >
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="12">
      <el-col :span="12">
        <el-card class="box-group" style="overflow:auto">
          <div v-for="tutor in filterTutor" :key="tutor" class="text item">
            <el-card
              class="box-card"
              shadow="hover"
              style="border-style:dotted;  border-width: 2px;"
            >
              <div @click="showMensaje(tutor)">
                <el-row :gutter="12">
                  <el-col :span="12">
                    <i class="fas fa-user-tie"></i>
                    {{ tutor.t_fullname }}
                  </el-col>
                  <el-col :span="7" offset="5">
                    <p></p>
                    <el-button
                      size="mini"
                      type="info"
                      icon="fas fa-search"
                      @click="showHorario(tutor)"
                      plain
                      >&nbsp;Horarios</el-button
                    >
                    <p></p>
                    <el-button
                      size="mini"
                      type="info"
                      icon="fas fa-user-plus"
                      @click="solicitarTutor(tutor)"
                      plain
                      >&nbsp;Solicitar</el-button
                    >
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </div>
        </el-card>
      </el-col>
      <el-col :span="11" offset="1">
        <el-card class="box-information" style="overflow:auto" v-show="showBox">
          <h4>Acerca del tutor</h4>
          <el-form
            ref="formulario"
            :model="form"
            label-width="100px"
            label-position="left"
            style="margin-left:20px"
          >
            <el-form-item label="Código:">
              {{ this.tutorInfo.t_code }}
            </el-form-item>
            <el-form-item label="Nombres:">
              {{ this.tutorInfo.t_fullname }}
            </el-form-item>

            <el-form-item label="Correo:">
              {{ this.tutorInfo.t_email }}
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <horasdisponibles
      :dialog="dialog"
      :eventos="scheduler"
      v-on:resetDialog="dialog = $event"
    ></horasdisponibles>
  </el-container>
</template>

<script>
import axios from "axios";
import HorasDisponibles from "./DisponibilidadTutor";
export default {
  data() {
    return {
      tutores: [],
      search: "",
      showBox: false,
      tutorInfo: "",
      scheduler: [],
      tutoria: {
        s_id_student: "",
        s_code_tutor: "",
        s_tt: "",
      },
      dialog: false,
    };
  },
  methods: {
    listarTutores() {
      console.log(localStorage.getItem("Id_facultad"));
      axios
        .get(
          "/student/show_tutors_in_request/" +
            localStorage.getItem("Id_facultad")
        )
        .then((res) => {
          this.tutores = res.data.people;
        })
        .catch((error) => console.log(error));
    },
    showMensaje(tutor) {
      this.showBox = true;
      console.log(tutor);
      this.tutorInfo = tutor;
    },
    showHorario(tutor) {
      this.scheduler = tutor.t_schedule;
      this.dialog = true;
    },
    solicitarTutor(tutor) {
      this.tutoria.s_id_student = localStorage.getItem("Id_usuario");
      this.tutoria.s_code_tutor = tutor.t_code;
      this.tutoria.s_tt = 1;

      axios
        .post("/student/register_assignment/", this.tutoria)
        .then((res) => {
          console.log(res);
          this.$message({ message: "Registro exitoso.", type: "success" });
        })
        .catch((error) => console.log(error));
    },
  },
  computed: {
    filterTutor: function() {
      console.log(localStorage.getItem("Id_facultad"));
      return this.tutores.filter((tutor) => {
        return tutor.t_fullname.toLowerCase().match(this.search.toLowerCase());
      });
    },
  },
  created() {
    this.listarTutores();
  },
  components: {
    horasdisponibles: HorasDisponibles,
  },
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
  height: 150px;
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
