<template>
  <div>
    <!---Buscador y listado de tutores--->
    <el-row>
      <el-col :span="8">
        <div class="grid-content">
          <el-input placeholder="Buscar Tutor" v-model="search" clearable>
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="30">
      <!-----
      <el-col :xs="20" :sm="12" :md="12" :lg="8">
        <el-card class="box-group" style="overflow:auto">
          
          <div v-for="tutor in filterTutor" :key="tutor.t_id_tutor">
            <el-card class="box-card" style="border-style:dashed;">
              <el-row>
                <el-col :sm="5" :xs="5">
                  <v-img
                    class="white--text align-end"
                    height="50px"
                    width="50px"
                    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                  ></v-img>
                </el-col>
                <el-col :xs="11" :sm="10">{{ tutor.t_fullname}}</el-col>
                <el-col :xs="8" :sm="5">
                  <el-button
                    size="small"
                    type="warning"
                    icon="fas fa-plus"
                    @click="showMensaje(tutor)"
                    plain
                  >&nbsp;Info</el-button>
                </el-col>
              </el-row>
            </el-card>
          </div>
        </el-card>
        <br />
      </el-col>
      ------------>

      <!---------------------ANALIZAR ESTA PARTE----------------->
      <el-col :xs="20" :sm="12" :md="12" :lg="16">
        <el-card class="box-group" style="overflow:auto">
          <v-container fluid grid-list-xl>
            <v-layout wrap justify-space-around>
              <v-flex v-for="tutor in filterTutor" :key="tutor.t_id_tutor">
                <v-card class="mx-auto" width="300" aria-selected="true">
                  <div>
                    <v-avatar size="80" style="margin:auto;display:block;">
                      <img
                        src="https://www.pixinvent.com/demo/frest-clean-bootstrap-admin-dashboard-template/app-assets/images/portrait/small/avatar-s-13.jpg"
                        alt="John"
                      />
                    </v-avatar>
                  </div>

                  <v-card-text style="text-align:center">
                    {{tutor.t_fullname.toUpperCase()}}
                    <v-card-text class="text-align:center">
                      <div>
                        <i class="fa fa-id-card" aria-hidden="true"></i>
                        {{tutor.t_code}}
                      </div>

                      <div>
                        <i class="fa fa-envelope"></i>
                        {{tutor.t_email}}
                      </div>
                    </v-card-text>
                  </v-card-text>
                  <v-divider></v-divider>

                  <v-card-actions class="justify-space-around">
                    <el-button
                      type="success"
                      icon="fas fa-user-plus"
                      @click="solicitarTutor(tutor)"
                      plain
                    >&nbsp;Solicitar</el-button>

                    <v-btn text color="primary" @click="showHorario(tutor)">
                      Horarios
                      <i class="el-icon-arrow-right"></i>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </el-card>
        <br />
      </el-col>
      <!----------------------------------------------------->

      <!------Informacion del tutor------>
      <el-col :xs="20" :sm="12" :md="12" :lg="8">
        <el-card class="box-information" style="overflow:auto; height:480px" v-show="showBox">
          <h5>{{this.tutorInfo.t_fullname}}</h5>
          <v-img
            src="https://www.pixinvent.com/demo/frest-clean-bootstrap-admin-dashboard-template/app-assets/images/portrait/small/avatar-s-13.jpg"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          ></v-img>
          <br />
          <el-timeline>
            <el-timeline-item :color="this.color" :timestamp="this.tutorInfo.t_code">Codigo:</el-timeline-item>
            <el-timeline-item :color="this.color" :timestamp="this.tutorInfo.t_email">Email:</el-timeline-item>
          </el-timeline>

          <el-row>
            <el-col :xs="12" :sm="15" :md="15">
              <el-button
                type="success"
                icon="fas fa-user-plus"
                @click="solicitarTutor(tutorInfo)"
                plain
              >&nbsp;Solicitar</el-button>
            </el-col>

            <el-col :xs="12" :sm="9" :md="9">
              <v-btn text color="primary" @click="showHorario(tutorInfo)">
                Horarios
                <i class="el-icon-arrow-right"></i>
              </v-btn>
            </el-col>
          </el-row>
        </el-card>
        <!---  <br /> --->
      </el-col>
      <!----------------->

      <!------HORARIO DEL TUTOR------>
      <el-col :xs="20" :sm="12" :md="12" :lg="8">
        <el-card class="box-group" style="overflow:auto;" v-show="showBoxHorario">
          <v-app-bar dark color="green">
            <v-toolbar-title>AGENDA</v-toolbar-title>
          </v-app-bar>

          <div v-for="schedul in customCalendar" :key="schedul['fecha']">
            <v-list disabled>
              <!--------->
              <v-subheader
                style="border-bottom: 2px solid orange;color:#D97F20;font-weight:bold;"
              >{{schedul['fecha']}}</v-subheader>

              <v-list-item class="text-left" v-for="hora of schedul['hora']" :key="hora">
                <v-list-item-icon>
                  <v-icon style="color:#20C7D9;">mdi-history</v-icon>
                </v-list-item-icon>
                <v-list-item-content style="font-size: 15px;color:#20C7D9; font-weight:bold;">
                  <v-list-item-subtitle>{{ hora }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <!--------->
            </v-list>
          </div>
        </el-card>
      </el-col>
      <!----------------->
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tutores: [],
      search: "",
      showBox: false,
      showBoxHorario: false,
      tutorInfo: "",
      scheduler: [],
      customCalendar: [],
      tutoria: {
        student_id: "",
        tutor_id: "",
        tutor_code: "",
        tutoring_type_id: "",
      },
      dialog: false,
      color: "#0476D0",
    };
  },
  methods: {
    listarTutores() {
      axios
        .get(
          "/student/show_tutors_in_request_2/" +
            localStorage.getItem("Id_facultad")
        )
        .then((res) => {
          this.tutores = res.data.people;
        })
        .catch((error) => console.log(error));
    },
    showMensaje(tutor) {
      this.showBox = true;
      this.tutorInfo = tutor;
      this.showBoxHorario = false;
    },
    showHorario(tutorInfo) {
      this.showBoxHorario = true;
      this.scheduler = tutorInfo.t_schedule;
      this.generateListCalendar();
    },
    generateListCalendar() {
      var etiqueta;
      this.customCalendar = [];

      for (etiqueta in this.scheduler) {
        var birthday = new Date(etiqueta.replace("-", ","));
        var options = {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        };
        var contenedor = { fecha: "val", hora: [] };
        contenedor["fecha"] = new Intl.DateTimeFormat("es-PE", options).format(
          birthday
        );
        contenedor["hora"] = this.scheduler[etiqueta];
        this.customCalendar.push(contenedor);
      }
    },
    solicitarTutor(tutor) {
      this.tutoria.student_id = localStorage.getItem("Id_usuario");
      this.tutoria.tutor_code = tutor.t_code;
      this.tutoria.tutor_id = tutor.t_id_tutor;
      this.tutoria.tutoring_type_id = localStorage.getItem("Id_Tipo_Tutoria");

      axios
        .post("/student/request_assignment/", this.tutoria)
        .then((res) => {
          console.log(res);
          this.$message({ message: "Registro exitoso.", type: "success" });
        })
        .catch((error) => console.log(error));
    },
  },
  computed: {
    filterTutor: function () {
      return this.tutores.filter((tutor) => {
        return (
          tutor.t_fullname.toLowerCase().match(this.search.toLowerCase()) ||
          tutor.t_code.match(this.search)
        );
      });
    },
  },
  created() {
    this.listarTutores();
  },
  components: {},
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
  border-color: gray;
  border-width: 1.5px;
}

.box-group {
  height: 480px;
}
.box-information {
  height: 400px;
}
</style>