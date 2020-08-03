<template>
  <div>
    <v-container fluid grid-list-lg>
      <v-layout wrap justify-space-around>
        <v-flex>
          <v-card max-width="790" elevation="0" style="background-color:#F5F0F0;">
            <v-container fluid grid-list-lg>
              <v-layout wrap justify-space-around>
                <v-flex>
                  <v-card class="mx-auto" width="360" height="230" style="border-radius:20px;">
                    <v-card
                      width="400"
                      height="100"
                      elevation="0"
                      style="background-color:#76BEF3;"
                    >
                      <v-card-subtitle
                        class="pb-0"
                        style="font-size:18px;color:white; font-weight:bold;"
                      >Bienvenido {{nombre}}</v-card-subtitle>
                      <v-img height="100" width="165" style="float:right;" src="./imagen2.svg"></v-img>
                    </v-card>

                    <v-avatar
                      size="90"
                      style=";display:block; top:-35px; left:20px; border: 3px solid white;"
                    >
                      <img
                        src="https://www.pixinvent.com/demo/frest-clean-bootstrap-admin-dashboard-template/app-assets/images/portrait/small/avatar-s-13.jpg"
                        alt="John"
                      />
                    </v-avatar>
                    <br />
                  </v-card>
                  <br />
                </v-flex>
                <v-flex>
                  <v-card class="mx-auto" width="380" height="230" style="border-radius:20px;">
                    <v-container fluid grid-list-lg>
                      <v-layout wrap justify-space-around>
                        <v-flex>
                          <v-card :width="100" elevation="0">
                            <v-card-text>
                              <v-btn
                                class="ma-2"
                                outlined
                                color="indigo"
                                @click="showSolicitudes()"
                              >Asignar</v-btn>
                            </v-card-text>
                          </v-card>
                        </v-flex>
                        <v-flex>
                          <v-card :width="180" elevation="0">
                            <apexchart
                              ref="radarSolicitud"
                              type="radialBar"
                              height="220px"
                              :options="chartOptions"
                              :series="series2"
                            ></apexchart>
                          </v-card>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-flex>

                <v-flex>
                  <v-card color="white" class="mx-auto" width="800" style="border-radius:20px;">
                    <v-card-title
                      class="headline"
                      style="color:gray"
                    >Reporte General del Programa {{this.nombreFacultad}}</v-card-title>
                    <v-divider></v-divider>
                    <CRow>
                      <CCol col="12" sm="6" lg="4">
                        <v-list-item two-line>
                          <v-list-item-avatar size="72">
                            <v-btn color="#DD3D63" fab x-large dark @click="showStudents()">
                              <h2>
                                <i class="fas fa-graduation-cap"></i>
                              </h2>
                            </v-btn>
                          </v-list-item-avatar>

                          <v-list-item-content>
                            <v-list-item-title style="font-size:40px">{{datosRecibidos['students']}}</v-list-item-title>
                            <v-list-item-subtitle>ESTUDIANTES</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>

                        <v-divider></v-divider>
                      </CCol>
                      <CCol col="12" sm="6" lg="4">
                        <v-list-item two-line>
                          <v-list-item-avatar size="72">
                            <v-btn color="#F8C64C" fab x-large dark @click="showTutors()">
                              <h2>
                                <i class="fas fa-user-tie"></i>
                              </h2>
                            </v-btn>
                          </v-list-item-avatar>

                          <v-list-item-content>
                            <v-list-item-title style="font-size:40px">{{datosRecibidos['tutors']}}</v-list-item-title>
                            <v-list-item-subtitle>TUTORES</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>

                        <v-divider></v-divider>
                      </CCol>
                      <CCol col="12" sm="6" lg="4">
                        <v-list-item two-line>
                          <v-list-item-avatar size="72">
                            <v-btn color="success" fab x-large dark @click="showTypesTutoring()">
                              <h2>
                                <i class="fas fa-cubes"></i>
                              </h2>
                            </v-btn>
                          </v-list-item-avatar>

                          <v-list-item-content>
                            <v-list-item-title
                              style="font-size:40px"
                            >{{datosRecibidos['tutoring_types']}}</v-list-item-title>
                            <v-list-item-subtitle>TIPOS TUTORIAS</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                      </CCol>
                    </CRow>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
        <v-flex></v-flex>
      </v-layout>
    </v-container>

    <v-container fluid grid-list-xl>
      <v-layout wrap justify-space-around>
        <v-flex>
          <!----------------ESTA PARTE ES EL TABLA DE REPORTES POR TUTORES------------------>
          <reportesTTutores></reportesTTutores>

          <!---------------------------------->
        </v-flex>

        <v-flex>
          <reportesTTipos></reportesTTipos>
          <!---------------------------------->
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import ReportesTTipos from "./ReporteTTutorias";
import ReportesTTutores from "./ReporteTutores";
import alumno from "../../../notificaciones/alumno.png";
import tutor from "../../../notificaciones/tutor.png";
import axios from "axios";
export default {
  data() {
    return {
      ReporteFormalInformal: "",
      ReporteTipoTutoria: "",
      items: [
        {
          avatar: tutor,
          title: "Tutor1Test1, Tutor1",
          subtitle:
            "<span class='font-weight-bold'>Finalizó</span> &mdash; Sesión de Tutoría Trica",
        },
        {
          avatar: tutor,
          title: "Tutor2Test2, Tutor2",
          subtitle:
            "<span class='font-weight-bold'>Inició</span> &mdash; Sesión de Tutoría por Carta",
        },
        {
          avatar: alumno,
          title: "Alumno1Alumno1, Alumno1",
          subtitle:
            "<span class='font-weight-bold'>Egresó</span> &mdash; Tutorías Finalizadas",
        },
      ],
      nombre:
        JSON.parse(localStorage.getItem("Nombre")).split(" ", 1)[0] +
        " " +
        JSON.parse(localStorage.getItem("Apellidos")).split(" ", 1)[0],
      datosRecibidos: "",
      nombreFacultad: localStorage.getItem("Nombre_programa"),

      options: {
        chart: {
          width: 480,
          type: "donut",
        },
        labels: "",
        title: {
          text: "",
        },
      },
      series: "",
      series2: [53],
      chartOptions: {
        chart: {
          type: "radialBar",
          offsetY: -10,
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
              name: {
                fontSize: "14px",
                color: undefined,
                offsetY: 100,
              },
              value: {
                offsetY: 60,
                fontSize: "22px",
                color: undefined,
                formatter: function (val) {
                  return val + "%";
                },
              },
            },
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            shadeIntensity: 0.15,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 65, 91],
          },
        },
        stroke: {
          dashArray: 4,
        },
        labels: ["Tutorias Atendidas"],
      },
    };
  },
  methods: {
    /*ENVIAR FECHA DE INICIO Y FIN DE TUTOR */

    generarReporteTutores() {
      this.enviarDatosReporteTutor["id_program"] = localStorage.getItem(
        "Id_facultad"
      );
      this.enviarDatosReporteTutor["start_date"] = this.startTutor;
      this.enviarDatosReporteTutor["end_date"] = this.endTutor;
      axios
        .post(
          "/coordinator/show_general_information/",
          this.enviarDatosReporteTutor
        )
        .then((res) => {
          this.dataTableTutores = res.data.tutors;
        })
        .catch((error) => console.log(error));
    },

    showStudents() {
      var that = this;
      that.$router.push("/Coordinador/Miembros/Alumnos");
    },
    showTypesTutoring() {
      var that = this;
      that.$router.push("/Coordinador/Tipos de Tutoría");
    },
    showSolicitudes() {
      var that = this;
      that.$router.push("/Coordinador/Solicitudes");
    },
    showTutors() {
      var that = this;
      that.$router.push("/Coordinador/Miembros/Tutores");
    },

    DatosReporteGeneral() {
      localStorage.getItem("Id_facultad");
      axios
        .get(
          "/coordinator/show_general_program_report/" +
            localStorage.getItem("Id_facultad")
        )
        .then((res) => {
          this.datosRecibidos = res.data;

          this.series2[0] = this.datosRecibidos["pcj_requests"] * 100;
          this.$refs.radarSolicitud.updateOptions({
            colors: ["#814AD6"],
          });
        })
        .catch((error) => console.log(error));
    },

    filterTutor: function (tutores) {
      return tutores.filter((tutor) => {
        return (
          tutor.person_full_name
            .toLowerCase()
            .match(this.searchTutores.toLowerCase()) ||
          tutor.person_code.match(this.searchTutores)
        );
      });
    },
  },
  created() {
    this.DatosReporteGeneral();
    this.ReporteGeneralTipoTutoria();
    this.completarDonus();
    this.listarTutores();
    this.listarTipoTutoria();
  },
  components: {
    reportesTTutores: ReportesTTutores,
    reportesTTipos: ReportesTTipos,
  },
};
</script>
<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>