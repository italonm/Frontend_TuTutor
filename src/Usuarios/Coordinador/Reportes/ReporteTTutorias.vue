<template>
  <div>
    
    <!----------------ESTA PARTE ES EL TABLA DE REPORTES POR TIPO TUTORIAS------------------>

    <v-card color="white" class="mx-auto" width="1280" style="border-radius:20px;">
      
      <el-row>
        <el-col :lg="5">
          <v-card elevation="0">
            <v-card class="mx-auto" style="border-radius:0" >
              <v-text-field
                style="height:80px;padding:20px"
                placeholder="Search..."
                :flat="true"
                :solo="true"
                v-model="searchTipoTutoria"
              ></v-text-field>
            </v-card>

            <v-card class="box-group" style="overflow:auto;" height="500px">
              <v-card
                class="mx-auto"
                :height="100"
                @click="showReporteXTipoTutoriaGeneral()"
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
                v-for="tipos in filterTipoTutoria(tiposTutorias)"
                :key="tipos.tt_id"
                class="mx-auto"
                :height="100"
                :hover="true"
                style="border-radius:0"
                @click="showReporteXTipoTutoria(tipos)"
              >
                <v-divider></v-divider>

                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{tipos.tt_name}}</v-list-item-title>
                    <v-list-item-subtitle>{{tipos.tt_periodicity}}</v-list-item-subtitle>
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
                <h4>Reportes por Tipo tutoria</h4>
              </v-card-subtitle>
            </v-card>
          </v-flex>
          <v-flex>
            <v-card max-width="790" elevation="0" style="background-color:white;">
              <!--------FECHA INICIO------------------->
              <v-menu
                ref="startMenuTT"
                v-model="startMenuTT"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="startTipoTutoria"
                transition="scale-transition"
                min-width="200px"
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="startTipoTutoria"
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
                <v-date-picker v-model="startTipoTutoria" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="startMenuTT = false">Cancel</v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="registrarFechaInicioTipoTutoria(startMenuTT,startTipoTutoria)"
                  >OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-card>
          </v-flex>
          <!----------------------------------------->

          <!---------FECHA FIN--------------------------------->
          <v-flex>
            <v-card max-width="790" elevation="0" style="background-color:white;">
              <v-menu
                ref="endMenuTT"
                v-model="endMenuTT"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="endTipoTutoria"
                transition="scale-transition"
                min-width="200px"
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="endTipoTutoria"
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
                <v-date-picker v-model="endTipoTutoria" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="endMenuTT = false">Cancel</v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="registrarFechaFinTipoTutoria(endMenuTT,endTipoTutoria)"
                  >OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-card>
          </v-flex>
          <!----------------------------------------->
        </v-layout>
      </v-container>
      </v-card>
          <v-card class="pa-md-4 mx-lg-auto" :height="500" style="overflow:auto;border-radius:0">
            
            <div v-show="mostrarReporte">
              <br>
              
              <el-row>
                <div  ref="contenidoCabecera">  
                <el-col :lg="16">
                  <h5 style="color:#3F6FE6">{{tutorBoxReporteTipoTutoria['nombre']}}</h5>

                  <span style="font-weight:bold">{{tutorBoxReporteTipoTutoria['descripcion']}}</span>
                </el-col>

                <el-col :lg="8">
                  <span>From: Sistema TuTutor</span>
                  <br />
                  <span>Fecha Inicio: {{this.startTipoTutoria}}</span>
                  <br />
                  <span>Fecha Fin: {{this.endTipoTutoria}}</span>
                </el-col>
                </div>
              </el-row>
              <v-data-table
                :headers="headersTableTipoTutoria"
                :items="dataTableTipoTutorias"
                sort-by="calories"
                class="elevation-1"
                v-show="showTable"
              >
                <template v-slot:top>
                  <v-toolbar flat color="white">
                    <v-toolbar-title>Información General Tipo tutorias</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                </template>

              
              </v-data-table>
              
              <br>
              <br>

              


                <!-----------Reporte x Tipo Tutoria--->         
                <div id="chartDonut2" v-show="showTableInasistencia">
                    <apexchart 
                      ref="demoChartDonut2"
                      width="500"
                      type="donut"
                      :options="OptionsDonutInasistenciaXTipo"
                      :series="seriesDonutInasistenciaXTipo"
                    ></apexchart>
                  </div>

              <v-data-table
                :headers="headersTablexTipoTutoria"
                :items="dataTablexTipoTutorias"
                sort-by="calories"
                class="elevation-1"
                v-show="showTableInasistencia"
              >
                <template v-slot:top>
                  <v-toolbar flat color="white">
                    <v-toolbar-title>Alumnos con mayor Inasistencia</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                </template>

              
              </v-data-table>

<div id="chartDonut">
                    <apexchart 
                     v-show="showTable"
                      ref="demoChartDonut"
                      :height="300"
                      type="donut"
                      :options="OptionsDonutTutor"
                      :series="serieDonutTutor"
                    ></apexchart>
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
<script src="bower_components/jspdf/dist/jspdf.min.js"></script>
<script src="bower_components/jspdf-autotable/jspdf.plugin.autotable.js"></script>
<script>

import axios from "axios";
export default {
  data() {
    return {
//PRUEBA HARDCODEADA

      OptionsDonutInasistenciaXTipo: {
        labels: ["Inasistencia Total","Inasistencia Tipo Especifico"],
        title: {
          text: "% Inasistencias",
          align: "center"
        }
      },
      seriesDonutInasistenciaXTipo: [140,30],

      headersTablexTipoTutoria: [
        {
          text: "Alumno",
          align: "start",
          value: "student_name"
        },
        { text: "Tutor", value: "tutor_name" },
        { text: "Inasistencias", value: "value" },
      ],
       dataTablexTipoTutorias: [],




/////////////////////////////////////



      /*DONUT TUTOR */
      OptionsDonutTutor: {
        labels: [],
        title: {
          text: "Sesiones X Tipos Tutoría",
          align: "left"
        }
      },
      serieDonutTutor: [],
      ///////////////////////////////




      /*FECHA INICIO REPORTE TUTOR */
      mostrarReporte:false,
      startMenu: false,
      endMenu: false,
      startTutor: "",
      endTutor: "",
      enviarDatosReporteTutor: {
        id_program: "",
        start_date: "",
        end_date: ""
      },
      showTable:false,

    lineaDonusTT:[],

      showTableInasistencia:false,
      /*FECHA INICIO REPORTE TIPO TUTORIA */

      startMenuTT: false,
      endMenuTT: false,
      startTipoTutoria: "",
      endTipoTutoria: "",
      enviarDatosReporteTipoTutoria: {
        id_program: "",
        start_date: "",
        end_date: ""
      },

      /* MOSTRAR TABLA TIPO TUTORIA GENERAL */
      dataTableTipoTutorias: [],

      headersTableTipoTutoria: [
        {
          title:'Nombre',
          dataKey:'name',
          text: "Nombre",
          align: "start",
          value: "name"
        },
        {  title:'Obligatoria?',
          dataKey:'is_required',
          text: "Obligatoria?", value: "is_required" },
        { 
           title:'Obligatoria?',
          dataKey:'cant_students',
          text: "# Alumnos", value: "cant_students" },
        {  title:'% Asistencias',
          dataKey:'assisted_pcj',
          text: "% Asistencias", value: "assisted_pcj" },
        {  title:'# Tutores',
          dataKey:'total_tutors',
          text: "# Tutores", value: "total_tutors" }
      ],
      /*FECHA FIN REPORTE TIPO TUTORIA */
      ///////////////////////////////////

      tutorBoxReporteTutor: {
        titulo: "Reporte General",
        nombre: "",
        codigo: ""
      },
      tutorBoxReporteTipoTutoria: {
        titulo: "Reporte General",
        nombre: "",
        description: ""
      },
      tiposTutorias: "",
      searchTipoTutoria: "",
      ReporteTipoTutoria: "",

      nombre:
        JSON.parse(localStorage.getItem("Nombre")).split(" ", 1)[0] +
        " " +
        JSON.parse(localStorage.getItem("Apellidos")).split(" ", 1)[0],

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
      series2: [67]
    };
  },
  methods: {
//PARTE DE LA CARDS LATERAL IZQUIERDO
    /*ENVIAR FECHA DE INICIO Y FIN DE TIPO TUTORIA */
    registrarFechaFinTipoTutoria(endMenuTT, endTipoTutoria) {
      this.$refs.endMenuTT.save(endTipoTutoria);
      console.log(this.endMenuTT);


      //SIEMPRE QUE SE DEFINA LAS FECHAS MOSTRARA UN REPORTE GENERAL
      this.showReporteXTipoTutoriaGeneral();
    },
    registrarFechaInicioTipoTutoria(startMenuTT, startTipoTutoria) {
      this.$refs.startMenuTT.save(startTipoTutoria);
      console.log(this.startMenuTT);


      //SIEMPRE QUE SE DEFINA LAS FECHAS MOSTRARA UN REPORTE GENERAL
      this.showReporteXTipoTutoriaGeneral();
    },
    listarTipoTutoria() {
      axios
        .get(
          "/coordinator/show_tutoring_types/" +
            localStorage.getItem("Id_facultad")
        )
        .then(res => {
          this.tiposTutorias = res.data.tutoriaData;
          console.log(this.tiposTutorias);
        })
        .catch(error => console.log(error));
    },

    filterTipoTutoria: function(tiposTutorias) {
      console.log(localStorage.getItem("Id_facultad"));
      return tiposTutorias.filter(tipos => {
        return (
          tipos.tt_name
            .toLowerCase()
            .match(this.searchTipoTutoria.toLowerCase()) ||
          tipos.tt_periodicity
            .toLowerCase()
            .match(this.searchTipoTutoria.toLowerCase())
        );
      });
    },

    cabeceraReporte(nombre,codigo){
    this.tutorBoxReporteTipoTutoria["titulo"] =
        "Reporte " +  "Tipos tutorias " + localStorage.getItem("Nombre_programa");
      this.tutorBoxReporteTipoTutoria["nombre"] = nombre
      this.tutorBoxReporteTipoTutoria["descripcion"] =codigo;

    },

  /////////////////////////////////////

/*TIPO DE REPORTE POR TIPO TUTORIA O GENERAL */
    showReporteXTipoTutoriaGeneral() {
      console.log("mostrar TTTTTTTTIPO TUTORIA");
      console.log(this.startTipoTutoria);
      console.log(this.endTipoTutoria);
      this.generarReportetablaTipoTutoria();
      this.showTableInasistencia=false;
      if (this.startTipoTutoria && this.endTipoTutoria){
        this.mostrarReporte=true;
        this.showTable=true;
        this.cabeceraReporte(localStorage.getItem("Nombre_programa"), "Información Tipo Tutoría");
        this.ReporteGeneralTipoTutoria();
      }
    },
    
    showReporteXTipoTutoria(tipoTutoria) {
      this.showTableInasistencia=true;
      this.showTable=false;
      this.cabeceraReporte(tipoTutoria.tt_name,tipoTutoria.tt_description);
      this.generarReportetablaXTipoTutoria(tipoTutoria);
    },

////////////////////////////////////////////////
/*TIPOS DE REPORTE EN EL CARDS */
  generarReportetablaTipoTutoria(){
     this.enviarDatosReporteTipoTutoria["id_program"] = localStorage.getItem(
        "Id_facultad"
      );
      this.enviarDatosReporteTipoTutoria["start_date"] = this.startTipoTutoria;
      this.enviarDatosReporteTipoTutoria["end_date"] = this.endTipoTutoria;
      console.log(this.enviarDatosReporteTutor);
      axios
        .post(
          "/coordinator/show_tutoring_types_report/",
          this.enviarDatosReporteTipoTutoria
        )
        .then(res => {
          this.dataTableTipoTutorias = res.data.tutoring_types;
          console.log(res.data);
        })
        .catch(error => console.log(error));
    },
  generarReportetablaXTipoTutoria(tutor){
     this.enviarDatosReporteTipoTutoria["id_program"] = localStorage.getItem(
        "Id_facultad"
      );
      this.enviarDatosReporteTipoTutoria["start_date"] = this.startTipoTutoria;
      this.enviarDatosReporteTipoTutoria["end_date"] = this.endTipoTutoria;
      console.log("mostrar dknfasddlj")
      console.log(this.enviarDatosReporteTipoTutoria);
      axios
        .post(
          "/coordinator/show_absences_report/",
          this.enviarDatosReporteTipoTutoria
        )
        .then(res => {
          console.log("mostrar ABSENETSSSSSSSSSSSSSSREPOTTS")
          console.log(res.data);
          
        })
        .catch(error => console.log(error));
    },

    
    ReporteGeneralTipoTutoria() {
      axios
        .get(
          "coordinator/show_reports_from_tutoring_type/" +
            localStorage.getItem("Id_facultad")
        )
        .then(res => {
          this.ReporteTipoTutoria = res.data.tutoring_types;
          console.log("mostrar reporte tutoria")
          console.log(this.ReporteTipoTutoria);
          this.serieDonutTutor=[];
          this.lineaDonusTT=[];
          for(var tipo of this.ReporteTipoTutoria){
            console.log(tipo.name);
            this.lineaDonusTT.push(tipo.name);
            this.serieDonutTutor.push(tipo.counter);
          }
          console.log(this.OptionsDonutTutor);
          this.$refs.demoChartDonut.updateOptions({
            colors:["#0086FF", "#00EC93","#FFB000", "#FF1752","#814AD6", "#A2DE21","#24C1B8", "#F947FD","#A59045", "#152396"]
            ,labels:this.lineaDonusTT
          })
          
        })
        .catch(error => console.log(error));

    },
    imprimirDocumento(){
      const doc = new jsPDF('p','pt');

      doc.fromHTML(this.$refs.contenidoCabecera,15,15,);
      doc.autoTable(this.headersTableTipoTutoria,this.dataTableTipoTutorias,{
       
      });
      doc.save("sample.pdf");
    },
  imprimir(){
    window.print();
  }
  },
  created() {
    //ejecuta por defecto las tutorias Generales en ambos
    this.showReporteXTipoTutoriaGeneral();

    this.listarTipoTutoria();
  },
  components: {}
};
</script>
<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>