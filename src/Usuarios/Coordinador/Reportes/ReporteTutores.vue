 <template>
 <div ref="content">

          <!------------------------------------------------------------------>
      
          <v-card
            class="mx-auto"
            width="1270"
            style="background-color:#F5F0F0;border-radius:20px;"
            elevation="0"
          >
            <el-row>
              <el-col :lg="5">
                <v-card elevation="0">
                  <v-card class="mx-auto" style="border-radius:0">
                    <v-text-field
                      style="height:80px;padding:20px"
                      placeholder="Search..."
                      :flat="true"
                      :solo="true"
                      v-model="searchTutores"
                    ></v-text-field>
                  </v-card>

                  <v-card class="box-group" style="overflow:auto;" height="500px">
                    <v-card
                      class="mx-auto"
                      :height="100"
                      @click="showReporteXTutorGeneral()"
                      style="border-radius:0"
                    >
                      <v-divider></v-divider>
                      <v-list-item one-line>
                        <v-list-item-avatar>
                          <v-avatar color="green">
                            <span class="white--text headline">G</span>
                          </v-avatar>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title>Reporte General</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>

                    <v-card
                      v-for="tutor in filterTutor(tutores)"
                      :key="tutor.person_id"
                      class="mx-auto"
                      :height="100"
                      :hover="true"
                      style="border-radius:0"
                      @click="showReporteXTutor(tutor)"
                    >
                      <v-divider></v-divider>

                      <v-list-item two-line>
                        <v-list-item-avatar>
                          <img src="https://randomuser.me/api/portraits/women/81.jpg" />
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title>{{tutor.person_name}}</v-list-item-title>
                          <v-list-item-subtitle>{{tutor.person_code}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                  </v-card>
                </v-card>
              </el-col>
              <el-col :lg="19">
                <v-card class="mx-auto" :height="80" outlined style="border-radius:0">
                 <v-container fluid grid-list-lg>
              <v-layout wrap justify-space-around>
                <v-flex>
                  <v-card max-width="790" elevation="0">
                    <v-card-subtitle>
                      <h4>Reportes por Tutores</h4>
                    </v-card-subtitle>
                  </v-card>
                </v-flex>
                <v-flex>
                  <v-card max-width="790" elevation="0" style="background-color:white;">
                    <!--------FECHA INICIO------------------->
                    <v-menu
                      ref="startMenu"
                      v-model="startMenu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="startTutor"
                      transition="scale-transition"
                      min-width="200px"
                      offset-y
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="startTutor"
                          class="mt-3"
                          label="Fecha Inicio"
                          dense
                          readonly
                          outlined
                          hide-details
                          v-bind="attrs"
                          v-on="on"
                        
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="startTutor" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="startMenu = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="registrarFechaInicioTutor(startMenu,startTutor)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-card>
                </v-flex>
                <!----------------------------------------->

                <!---------FECHA FIN--------------------------------->
                <v-flex>
                  <v-card max-width="790" elevation="0" style="background-color:white;">
                    <v-menu
                      
                      ref="endMenu"
                      v-model="endMenu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="endTutor"
                      transition="scale-transition"
                      min-width="200px"
                      offset-y
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="endTutor"
                          class="mt-3"
                          label="Fecha Fin"
                          dense
                          readonly
                          outlined
                          hide-details
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="endTutor" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="endMenu = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="registrarFechaFinTutor(endMenu,endTutor)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-card>
                </v-flex>
                <!----------------------------------------->
              </v-layout>
            </v-container>
                </v-card>

                <v-card
                  class="pa-md-4 mx-lg-auto"
                  :height="500"
                  style="overflow:auto;border-radius:0"
                >
              
                  <div v-show="mostrarReporte">
                    <el-row>
                      <el-col :lg="16">
                        <h5 style="color:#3F6FE6">{{tutorBoxReporteTutor['nombre']}}</h5>

                        <span style="font-weight:bold">{{tutorBoxReporteTutor['codigo']}}</span>
                      </el-col>

                      <el-col :lg="8">
                        <span>From: Sistema TuTutor</span>
                        <br />
                        <span>Fecha Inicio: {{this.startTutor}}</span>
                        <br />
                        <span>Fecha Fin: {{this.endTutor}}</span>
                      </el-col>
                    </el-row>
                    <v-data-table 
                      :headers="headersTableTutores"
                      :items="dataTableTutores"
                      sort-by="calories"
                      class="elevation-1"
                      v-show="showTable"
                    >
                      <template v-slot:top>
                        <v-toolbar flat color="white">
                          <v-toolbar-title>Información General Tutores</v-toolbar-title>
                          <v-divider class="mx-4" inset vertical></v-divider>
                          <v-spacer></v-spacer>
                        </v-toolbar>
                      </template>

                      
                    </v-data-table>
                    <br />
                    <br />
                 
                  <div id="chart">
                    <apexchart
                      ref="demoChartArea"
                      type="area"
                      height="350"
                      :options="OptionsAreaTutor"
                      :series="serieAreaTutor"
                    ></apexchart>
                  </div>

                  <br />
                  <br />
                  <div id="bar">
                    <apexchart
                      ref="demoChartBarra"
                      height="350"
                      type="bar"
                      :options="OptionsBarraTutor"
                      :series="SerieBarraTutor"
                    ></apexchart>
                  </div>

                  <br />
                  <br />
<!---
                  <div id="chartDonut">
                    <apexchart
                      ref="demoChartDonut"
                      width="380"
                      type="donut"
                      :options="OptionsDonutTutor"
                      :series="serieDonutTutor"
                    ></apexchart>
                  </div>
----->
                  <br>
                  <br>
<!-------------Reporte Tpo 5 mejores Tutores
                  <div id="chartMix" v-show="showTable">
                    <apexchart
                      ref="demoChartMix"
                      height="350"
                      type="line"
                      :options="OptionsMixTutorAlto"
                      :series="serieMixTutorAlto"
                    ></apexchart>
                  </div>
----------------------->
<!-------------Reporte Tpo 5 peores Tutores
                  <div id="chartMix" v-show="showTable">
                    <apexchart
                      ref="demoChartMix"
                      height="350"
                      type="line"
                      :options="OptionsMixTutorBajo"
                      :series="serieMixTutorBajo"
                    ></apexchart>
                  </div>
                  ------------------------>
<!---------------------->
 <div id="chartMotivosRechazo">
        <apexchart  v-show="!showTable" ref="pieMotivoRechazo" type="pie" width="380" :options="chartOptionsMotivosRechazo" :series="seriesMotivosRechazo"></apexchart>
      </div>
                </div>
                <div v-show="!mostrarReporte">
                      <v-alert
      outlined
      type="warning"
      prominent
      border="left"
    >
      Para mostrar el Reporte es necesario que seleccione  un rango de Fechas.
    </v-alert>
                </div>
                </v-card>
              </el-col>
            </el-row>
          </v-card>

 </div>  
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      /*FECHA INICIO REPORTE TUTOR */
      startMenu: false,
      endMenu: false,
      startTutor: '',
      endTutor: '',
      enviarDatosReporteTutor:{
        id_program:'',
        start_date:'',
        end_date:''
      },
      enviarDatosMotivoRechazo:{
        id_program:'',
        start_date:'',
        end_date:'',
        id_tutor:'',
      },
      enviarDatosReporteFormalInformal:{
        id_program:'',
        start_date:'',
        end_date:'',
        id_tutor:'',
      },
       enviarDatosReporteHorasInstruidas:{
        id_program:'',
        start_date:'',
        end_date:'',
        id_tutor:'',
      },
      
      showTable:false,
      mostrarReporte:false,
      dataTableTutores:[],
      headersTableTutores: [
        {
          text: "Codigo",
          align: "start",
          value: "code"
        },
        { text: "Tutor", value: "name" },
        { text: "% Ses. Formal", value: "pcj_formals" },
        { text: "% Ses. Cancelada", value: "pcj_cancelled" },
        { text: "Total Sesiones", value: "total" },
        { text: "# Asignaciones Cancelada", value: "req_cancelled" }
      ],
/*MIX TUTOR  */

serieMixTutorAlto:
 [{
            name: 'Luis Flores',
            type: 'column',
            data: [71.4, 72, 62.5, 51.5, 62.5, 52.8]
          }, {
            name: 'Cesar Armando',
            type: 'column',
            data: [51.4, 42, 52.5, 41.5, 32.5, 42.8]
          }, {
            name: 'Jose Luis',
            type: 'column',
            data: [41.4, 52, 42.5, 51, 38.5, 42.8]
          }],


          OptionsMixTutorAlto : {
            chart: {
              type: 'bar',
              height: 350,
            },
                    title: {
          text: "Tutores con alto Desempeño Servicio Tutoria",
          align: "left"
        },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '35%',
                endingShape: 'rounded',
                
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            xaxis: {
              categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            },
            yaxis: {
              title: {
                text: 'Desempeño (%)'
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return "%" + val 
                }
              }
            }
          },
          
  

///Tutores con bajo desempeño
serieMixTutorBajo:
 [{
            name: 'Eder Ruben',
            type: 'column',
            data: [31.4, 32, 32.5, 31.5, 22.5, 12.8]
          }, {
            name: 'Gilbertox',
            type: 'column',
            data: [21.4, 22, 27.5, 29.5, 28.5, 15.8]
          }, {
            name: 'Jose Luis',
            type: 'column',
            data: [25.4, 26, 28.5, 30, 26.5, 11.8]
          }],


          OptionsMixTutorBajo : {
            chart: {
              type: 'bar',
              height: 350,
            },
                    title: {
          text: "Tutores con bajo Desempeño Servicio Tutoria",
          align: "left"
        },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '35%',
                endingShape: 'rounded'
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            xaxis: {
              categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            },
            yaxis: {
              title: {
                text: 'Desempeño (%)'
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return "%" + val 
                }
              }
            }
          },
          
    


///////////////
/*BARRA TUTOR*/
      SerieBarraTutor: [
        {
          name: "Horas Disponibles",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        },
        {
          name: "Horas Instruidas",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        }
      ],
      OptionsBarraTutor: {
        chart: {
          type: "bar"
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          categories:""
        },
        yaxis: {
          title: {
            text: "Horas "
          }
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val + " horas";
            }
          }
        },
        title: {
          text: "Horas Disponibles VS Horas Instruidas",
          align: "center"
        }
      },
      //////////////////////////

      /*DONUT TUTOR */
      OptionsDonutTutor: {
        labels:[],
        title: {
          text: "Motivos de Rechazo",
          align: "left"
        }
      },
      serieDonutTutor:[],
      ///////////////////////////////


/*  MOTIVOS DE RECHAZO */
seriesMotivosRechazo: '',
          chartOptionsMotivosRechazo: {
            chart: {
              width: 380,
              type: 'pie',
            },
            labels: '',
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          },


////////////////////

      serieAreaTutor: [
        {
          name: "Sesiones Formales Finalizadas",
          data: ''
        },
        {
          name: "Sesiones Formales Progreso",
          data: ''
        },
                {
          name: "Sesiones Informales",
          data: ''
        },
        {
          name: "Sesiones Derivadas",
          data: ''
        }
      ],
      OptionsAreaTutor: {
        chart: {
          height: 350,
          type: "area"
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth"
        },
        yaxis: {
          title: {
            text: "# Sesiones"
          }
        },
        xaxis: {
           type: 'category',
          title: {
            text: "Fecha"
          },
          categories:[]
        },
        title: {
          text: "Distribución x tipos de Sesiones",
          align: "center"
        }
      },

      tutorBoxReporteTutor: {
        titulo: "Reporte General",
        nombre: "",
        codigo: ""
      },
      tutores: "",
      searchTutores: "",
      ReporteFormalInformal: "",
      nombre:
        JSON.parse(localStorage.getItem("Nombre")).split(" ", 1)[0] +
        " " +
        JSON.parse(localStorage.getItem("Apellidos")).split(" ", 1)[0],
      nombreFacultad: localStorage.getItem("Nombre_programa"),
  

      InformacionXTutoria: {
        title: "Trika",
        horasInstruidas: [65, 59, 80, 81, 56]
      },

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
      series2: [67],
      
    };
  },
  methods: {
  //PARTE DE LA CARDS LATERAL IZQUIERDO
    /*ENVIAR FECHA DE INICIO Y FIN DE TUTOR */
    registrarFechaFinTutor(endMenu,endTutor){
      console.log(this.endTutor);
      this.$refs.endMenu.save(endTutor);
      console.log(this.endTutor);
  
      //SIEMPRE QUE SE DEFINA LAS FECHAS MOSTRARA UN REPORTE GENERAL
      this.showReporteXTutorGeneral();
    },
    registrarFechaInicioTutor(startMenu,startTutor){
      console.log(this.startTutor);
      this.$refs.startMenu.save(startTutor);
      console.log(this.startTutor);
    
    
    //SIEMPRE QUE SE DEFINA LAS FECHAS MOSTRARA UN REPORTE GENERAL
      this.showReporteXTutorGeneral();
    },
    listarTutores() {
      axios
        .get("/coordinator/show_tutors/" + localStorage.getItem("Id_facultad"))
        .then(res => {
          this.tutores = res.data.users;
          console.log(this.tutores);
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
    cabeceraReporte(nombre,codigo){
      this.tutorBoxReporteTutor["titulo"] =
        "Reporte " + "Tutores " + localStorage.getItem("Nombre_programa");
      this.tutorBoxReporteTutor["nombre"] = nombre;
      this.tutorBoxReporteTutor["codigo"] = codigo;
    },
    /////////////////////////////////////

/*TIPO DE REPORTE POR TUTOR O GENERAL */

    showReporteXTutorGeneral() {
      //Si se escogen las fechas mostrar reporte general
      this.generarReportetablaTutores();
      if (this.startTutor && this.endTutor){
          this.mostrarReporte=true;
          this.cabeceraReporte(localStorage.getItem("Nombre_programa"), "Información Tutores");
          
          this.showTable=true;
        
          this.ReporteGeneralFormalInformal(0);
          this.ReporteGeneralHorasInstruidasTotales(0);

        }
     },
    showReporteXTutor(tutor) {
      this.showTable=false;
      this.cabeceraReporte(tutor.person_full_name, tutor.person_code);
      this.ReporteGeneralFormalInformal(tutor.person_id);
      this.ReporteGeneralHorasInstruidasTotales(tutor.person_id);
      this.reporteMotivosDeRechazo(tutor);
    },

////////////////////////////////////////////////
/*TIPOS DE REPORTE EN EL CARDS */
  //Datos del #tutores, #alumnos, # tipo tutoria


 generarReportetablaTutores(){
      this.enviarDatosReporteTutor['id_program']=localStorage.getItem("Id_facultad");
      this.enviarDatosReporteTutor['start_date']=this.startTutor;

       axios
        .post("/coordinator/show_general_information/", this.enviarDatosReporteTutor)
        .then(res => {
          this.dataTableTutores=res.data.tutors;
    
        })
        .catch(error => console.log(error));
    }, 

ReporteGeneralFormalInformal(TutorOGeneral) {
  this.enviarDatosReporteFormalInformal['id_program']=localStorage.getItem("Id_facultad");
  this.enviarDatosReporteFormalInformal['start_date']=this.startTutor;
  this.enviarDatosReporteFormalInformal['end_date']=this.endTutor;
  this.enviarDatosReporteFormalInformal['id_tutor']=TutorOGeneral;
   axios
        .post(
          "coordinator/shows_formals_and_informals/"
        ,this.enviarDatosReporteFormalInformal)
        .then(res => {
          this.ReporteFormalInformal = res.data;
          
          this.serieAreaTutor[0]["data"] = this.ReporteFormalInformal[
            "cantidadSesionesFormalesTerminadas"
          ];
          
          this.serieAreaTutor[1]["data"] = this.ReporteFormalInformal[
            "cantidadSesionesFormalesEnProceso"
          ];

          this.serieAreaTutor[2]["data"] = this.ReporteFormalInformal[
            "cantidadSesionesInformales"
          ];
          this.serieAreaTutor[3]["data"] = this.ReporteFormalInformal[
            "cantidadSesionesFormalesDerivadas"
          ];
          
          this.$refs.demoChartArea.updateOptions({
            xaxis:{categories:res.data["labels_tiempo"]}
          });
          //(Actualizamos el color)Para que se actualice los graficos
          this.$refs.demoChartArea.updateOptions({
            colors: ["#008FFB", "#00E396","#FFB000", "#FF1752"], xaxis:{categories:this.ReporteFormalInformal["labels_tiempo"]}
          });

        })
        .catch(error => console.log(error));
    },


ReporteGeneralHorasInstruidasTotales(TutorOGeneral){
  //enviarDatosReporteHorasInstruidas
  this.enviarDatosReporteHorasInstruidas['id_program']=localStorage.getItem("Id_facultad");
  this.enviarDatosReporteHorasInstruidas['start_date']=this.startTutor;
  this.enviarDatosReporteHorasInstruidas['end_date']=this.endTutor;
  this.enviarDatosReporteHorasInstruidas['id_tutor']=TutorOGeneral;
 
 
 // this.enviarDatosReporteFormalInformal['id_tutor']=TutorOGeneral;

  axios
        .post(
          "coordinator/show_report_hours/",this.enviarDatosReporteHorasInstruidas
        )
        .then(res => {
          this.SerieBarraTutor[0]['data'] = res.data['horasTotales'];
          this.SerieBarraTutor[1]["data"] = res.data['horasInstruidas'];

          //this.OptionsBarraTutor["xaxis"]["categories"] = res.data["labels_tiempo"];
        
          //(Actualizamos el color)Para que se actualice los graficos
          this.$refs.demoChartBarra.updateOptions({
            colors: ["#008FFB", "#00E396"],xaxis:{categories:res.data["labels_tiempo"]}
          });
        })
        .catch(error => console.log(error));
},

  reporteMotivosDeRechazo(Tutor){
     this.enviarDatosMotivoRechazo['id_program']=localStorage.getItem("Id_facultad");
      this.enviarDatosMotivoRechazo['start_date']=this.startTutor;
      this.enviarDatosMotivoRechazo['end_date']=this.endTutor;
      this.enviarDatosMotivoRechazo['id_tutor']=Tutor.person_id;
       console.log("mostrar motivos rechazo");
     axios
        .post(
          "coordinator/show_reason_rejection_report/",this.enviarDatosMotivoRechazo)
        .then(res => {
          console.log("mostrar motivos rechazoOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
          console.log(res.data);
         
          //this.chartOptionsMotivosRechazo['labels']=(Object.keys(res.data));
          this.seriesMotivosRechazo=(Object.values(res.data));
          console.log(this.chartOptionsMotivosRechazo);
          console.log(this.seriesMotivosRechazo);
          console.log(res.data);
          this.$refs.pieMotivoRechazo.updateOptions({
            labels:Object.keys(res.data)
          });

        })
        .catch(error => console.log(error));
        console.log(this.enviarDatosMotivoRechazo);
  },
/*IMPRIMIR REPORTE TUTOR*/
imprimirReporteTutor(){

 
},


////////////////////////////////////
  },
  created() {
    //ejecuta por defecto las tutorias Generales en ambos
   this.showReporteXTutorGeneral();
    this.listarTutores();
  },
  components: {
  }
};
</script>
<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
