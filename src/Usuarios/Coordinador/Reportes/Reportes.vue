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
                              <v-btn class="ma-2" outlined color="indigo" @click="showSolicitudes()">Asignar</v-btn>
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
                            <v-list-item-title
                              style="font-size:40px"
                            >{{datosRecibidos['students']}}</v-list-item-title>
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
                            <v-list-item-title
                              style="font-size:40px"
                            >{{datosRecibidos['tutors']}}</v-list-item-title>
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
        <v-flex>
          <v-card max-width="350" class="mx-auto" elevation="0" style="background-color:#F5F0F0;">
            <v-container fluid grid-list-lg>
              <v-layout wrap justify-space-around>
                <v-flex>
                  <!----------
                  <v-card class="mx-auto" max-width="380" height="460" style="border-radius:20px;">
                    <el-row :gutter="20">
                      <el-col :span="16">
                        <v-card-subtitle
                          class="grid-content bg-purple"
                          style="font-size:18px;color:black; font-weight:bold;margin-left:15px"
                        >Notificaciones</v-card-subtitle>
                      </el-col>

                      <el-col :span="8">
                        <div class="grid-content bg-purple">
                          <el-dropdown>
                            <h4 class="el-dropdown-link" style="margin:15px;size:20px ">
                              <i class="el-icon-more"></i>
                            </h4>
                            <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item icon="el-icon-check">Leidos</el-dropdown-item>
                              <el-dropdown-item icon="el-icon-circle-check">No Leidos</el-dropdown-item>
                            </el-dropdown-menu>
                          </el-dropdown>
                        </div>
                      </el-col>
                    </el-row>
                    <v-list>
                      <v-list-item v-for="item in items" :key="item.avatar">
                        <v-list-item-avatar>
                          <img :src="item.avatar" />
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title v-html="item.title"></v-list-item-title>
                          <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>

                  ----------->


                  <v-card height="460px">
        <v-card-title class="blue white--text">
          <span class="headline">Notificaciones</span>

          <v-spacer></v-spacer>

          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="clickear()">
                <v-list-item-title> Leidos</v-list-item-title>
              
              </v-list-item >
              <v-list-item  @click="clickear()">
                <v-list-item-title>No Leidos</v-list-item-title>
              
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-title>

         <v-list>
                      <v-list-item v-for="item in items" :key="item.avatar">
                        <v-list-item-avatar>
                          <img :src="item.avatar" />
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title v-html="item.title"></v-list-item-title>
                          <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
      </v-card>



                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
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
import ReportesTTipos from "./ReporteTTutorias"
import ReportesTTutores from "./ReporteTutores"
import axios from "axios";
export default {
  data() {
    return {

      ReporteFormalInformal: "",
      ReporteTipoTutoria: "",
      items: [
        {
          avatar: "https://picsum.photos/250/300?image=660",
          title: "Meeting @ Noon",
          subtitle:
            "<span class='font-weight-bold'>Spike Lee</span> &mdash; I'll be in your neighborhood"
        },
        {
          avatar: "https://picsum.photos/250/300?image=821",
          title: 'Summer BBQ <span class="grey--text text--lighten-1"></span>',
          subtitle:
            "<span class='font-weight-bold'>to Operations support</span> &mdash; Wish I could come."
        },
        {
          avatar: "https://picsum.photos/250/300?image=783",
          title: "Yes yes",
          subtitle:
            "<span class='font-weight-bold'>Bella</span> &mdash; Do you have Paris recommendations"
        }
      ],
      nombre:
        JSON.parse(localStorage.getItem("Nombre")).split(" ", 1)[0] +
        " " +
        JSON.parse(localStorage.getItem("Apellidos")).split(" ", 1)[0],
      datosRecibidos:'',
      nombreFacultad: localStorage.getItem("Nombre_programa"),

      options: {
        chart: {
          width: 480,
          type: "donut"
        },
        labels: "",
        title: {
          text: ""
        }
      },
      series: "",
      series2: [53],
      chartOptions: {
        chart: {
          type: "radialBar",
          offsetY: -10
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
              name: {
                fontSize: "14px",
                color: undefined,
                offsetY: 100
              },
              value: {
                offsetY: 60,
                fontSize: "22px",
                color: undefined,
                formatter: function(val) {
                  return val + "%";
                }
              }
            }
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            shadeIntensity: 0.15,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 65, 91]
          }
        },
        stroke: {
          dashArray: 4
        },
        labels: ["Tutorias Atendidas"]
      },

    };
  },
  methods: {
    /*ENVIAR FECHA DE INICIO Y FIN DE TUTOR */

    generarReporteTutores(){
      this.enviarDatosReporteTutor['id_program']=localStorage.getItem("Id_facultad");
      this.enviarDatosReporteTutor['start_date']=this.startTutor;
      this.enviarDatosReporteTutor['end_date']=this.endTutor;
      console.log(this.enviarDatosReporteTutor)
       axios
        .post("/coordinator/show_general_information/", this.enviarDatosReporteTutor)
        .then(res => {
          this.dataTableTutores=res.data.tutors;
          console.log(this.dataTableTutores);
          //this.$message({ message: "Registro exitoso.", type: "success" });
        })
        .catch(error => console.log(error));
      
    }, 


    /////////////////////////////////////////////////////////   
    showStudents() {
      var that = this;
      that.$router.push("/Coordinador/Miembros/Alumnos");
    },
    showTypesTutoring() {
      var that = this;
      that.$router.push("/Coordinador/Tipos de Tutoría");
    },
    showSolicitudes(){
      var that = this;
      that.$router.push("/Coordinador/Solicitudes");
      
    },
    showTutors() {
      var that = this;
      that.$router.push("/Coordinador/Miembros/Tutores");
    },
      
      
    DatosReporteGeneral(){

    
      localStorage.getItem("Id_facultad");
     axios
        .get("/coordinator/show_general_program_report/"+ localStorage.getItem("Id_facultad"))
        .then(res => {
         
          console.log(res.data);
          this.datosRecibidos=res.data;
   console.log("imfornmacion de los DATOS REPORTE FENERAL");
            console.log(this.series2)
        
          this.series2[0]=this.datosRecibidos['pcj_requests']*100;
          this.$refs.radarSolicitud.updateOptions({
            colors: ["#814AD6"]
          });
          console.log(this.series2)
        })
        .catch(error => console.log(error));

  },


    filterTutor: function(tutores) {
      console.log(localStorage.getItem("Id_facultad"));
      return tutores.filter(tutor => {
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
    //ejecuta por defecto las tutorias Generales en ambos

    ////////////////////////////////////
    this.DatosReporteGeneral();
    this.ReporteGeneralTipoTutoria();
    
    this.completarDonus();
    this.listarTutores();
    this.listarTipoTutoria();
  },
  components: {
  reportesTTutores:ReportesTTutores,
  reportesTTipos:ReportesTTipos,

  }
};
</script>
<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>