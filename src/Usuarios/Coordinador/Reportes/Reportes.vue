<template>
  <v-container fluid grid-list-xl>
    <v-layout wrap justify-space-around>
      <v-flex>
        <v-card class="mt-4 mx-auto" width="350" @click="showReporteTipoTutoria()">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="#DD3D63"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline :labels="labels" :value="value" color="white" line-width="2" padding="16"></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">Reporte Semestral</div>
            <div class="subheading" style="color:#DD3D63; font-weight: bold;">POR TIPO TUTORIA</div>
            <v-divider class="my-2"></v-divider>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex>
        <v-card class="mt-4 mx-auto" width="350" @click="showReporteTutores()">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="#F8C64C"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline :labels="labels" :value="value" color="white" line-width="2" padding="16"></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">Reporte Semestral</div>
            <div class="subheading" style="color:#F8C64C; font-weight: bold;">POR TUTORES</div>
            <v-divider class="my-2"></v-divider>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex>
        <v-card class="mt-4 mx-auto" width="350" @click="showJaja()">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="#37B6FF"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline :labels="labels" :value="value" color="white" line-width="2" padding="16"></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">Reporte Semestral</div>
            <div
              class="subheading"
              style="color:#37B6FF; font-weight: bold;"
            >Encuestas Realizadas</div>
            <v-divider class="my-2"></v-divider>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex>
        <!------
        <v-card class="mt-4 mx-auto" width="800">
          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">Resumen General de los Datos de {{this.nombreFacultad}}</div>
            <v-divider class="my-2"></v-divider>
            <div class="subheading " style="color:#37B6FF; font-weight: bold;">Last Campaign Performance</div>
            <v-divider class="my-2"></v-divider>
          </v-card-text>
        </v-card>
        ----->
        <v-card color="white" width="1150">
          <v-card-title
            class="headline"
            style="color:gray"
          >Reporte General del Programa {{this.nombreFacultad}}</v-card-title>
          <v-divider></v-divider>
          <CRow>
            <CCol col="12" sm="6" lg="4">
              <CWidgetIcon :header="datosRecibidos['Num_Estudiantes']" text="Estudiantes" style="border:none;">
                <v-btn
                  color="#DD3D63"
                  fab
                  x-large
                  dark
                  style="pointer-events: none;cursor: not-allowed;"
                >
                  <h2>
                    <i class="fas fa-graduation-cap"></i>
                  </h2>
                </v-btn>
              </CWidgetIcon>
              <v-divider></v-divider>
            </CCol>
            <CCol col="12" sm="6" lg="4">
              <CWidgetIcon :header="datosRecibidos['Num_Tutores']" text="Tutores" style="border:none;">
                <v-btn
                  color="#F8C64C"
                  fab
                  x-large
                  dark
                  style="pointer-events: none;cursor: not-allowed;"
                >
                  <h2>
                    <i class="fas fa-user-tie"></i>
                  </h2>
                </v-btn>
              </CWidgetIcon>
              <v-divider></v-divider>
            </CCol>
            <CCol col="12" sm="6" lg="4">
              <CWidgetIcon :header="datosRecibidos['Num_TiposTutorias']" text="Tipos Tutorias" style="border:none; ">
                <v-btn
                  color="success"
                  fab
                  x-large
                  dark
                  style="pointer-events: none;cursor: not-allowed;"
                >
                  <h2>
                    <i class="fas fa-cubes"></i>
                  </h2>
                </v-btn>
              </CWidgetIcon>
              <v-divider></v-divider>
            </CCol>
          </CRow>
        </v-card>
      </v-flex>



      <v-flex>
        <v-card color="white" width="600">
          <v-card-title class="headline" style="color:gray">Horas Tutorias Instruidas</v-card-title>
          <v-divider></v-divider>

            <bar :label="datosRecibidos['labels_tiempo']" :horasInstruidas="datosRecibidos['horasInstruidas']" :horasTotales="datosRecibidos['horasTotales']" 
             :color1="'#FEB019'" :color2="'#00E396'"></bar>
        </v-card>
      </v-flex>

      <v-flex>
        <v-card color="white" width="500" >
          <v-card-title class="headline" style="color:gray">Tutorías más solicitadas</v-card-title>
          <v-divider></v-divider>

          <apexchart width="500" type="donut" :options="options" :series="series"></apexchart>
    
        </v-card>
      </v-flex>
      <v-flex>
        <v-card color="white" width="1150">
          <v-card-title class="headline" style="color:gray">Sesiones Informales vs Formales</v-card-title>
          <v-divider></v-divider>
            <lineeg :DataLine1="datosSesionesLine['horasSesionesFormales']" :DataLine2="datosSesionesLine['horasSesionesInformales']" :color1="'#ed0f51'" :color2="'#00E396'" :labels="labelsMeses"></lineeg>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import lineeg from "./Chartjs/Line";
import bar from "./Chartjs/Bar";
export default {
  data() {
    return{
    datosRecibidos:{'Num_Estudiantes':15,'Num_Tutores':20,'Num_TiposTutorias':14,
    'labels_tiempo':['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
    'horasInstruidas':[78, 75, 80, 81, 76, 85, 70],
    'horasTotales':[92, 90, 90, 55, 96, 95, 84]
    },
    datosSesionesLine:{
      'labels_tiempo':['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio'],
      'horasSesionesFormales':[65, 59, 80, 81, 56, 55, 40],
      'horasSesionesInformales':[50, 45, 23, 80, 58, 5, 21]
    },

    nombreFacultad: localStorage.getItem("Nombre_programa"),
    labels: ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"],
    value: [200, 675, 410, 390, 310, 460, 250, 240],
    labelsMeses:['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
  
    InformacionXTutoria: {
        title:'Trika',
        labels_tutoria: ["Trika", "Carta", "Permanente","Tutoria 1","No usado"],
        horasInstruidas: [65, 59, 80, 81, 56]
      },
    options: {chart: {
              width: 480,
              type: 'donut',
            },
        labels: "",
        title: {
          text: ""
        }
        },
        series: "",
  }},
  methods:{
    showReporteTipoTutoria(){
      var that = this;
      that.$router.push("/Coordinador/Reportes Tipo Tutorias");
    },
    showReporteTutores(){
      var that = this;
      that.$router.push("/Coordinador/Reportes Tutores");
    },
    completarDonus() {
      this.options["labels"] = this.InformacionXTutoria["labels_tutoria"];
      this.series = this.InformacionXTutoria["horasInstruidas"];
    },
  
  },
  created() {
      this.completarDonus();
    },
  components: {
    lineeg,
    bar,
  }
};
</script>
<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>