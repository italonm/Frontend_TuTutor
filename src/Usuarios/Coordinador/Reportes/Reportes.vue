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
                              <v-btn class="ma-2" outlined color="indigo">Asignar</v-btn>
                            </v-card-text>
                          </v-card>
                        </v-flex>
                        <v-flex>
                          <v-card :width="180" elevation="0">
                            <apexchart
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
                            >{{datosRecibidos['Num_Estudiantes']}}</v-list-item-title>
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
                            >{{datosRecibidos['Num_Tutores']}}</v-list-item-title>
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
                            >{{datosRecibidos['Num_TiposTutorias']}}</v-list-item-title>
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
          <v-card
            class="mx-auto"
            width="1270"
            style="background-color:white;border-radius:20px;"
            elevation="0"
          >
            <!-----------------PARTE INICIAL DE LOS REPORTES (REPORTE TUTOR)--------------------->
            <v-container fluid grid-list-lg>
              <v-layout wrap justify-space-around>
                <v-flex>
                  <v-card max-width="790" elevation="0">
                    <v-card-subtitle>
                      <h3>Reportes por Tutores</h3>
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
          <!------------------------------------------------------------------>
          <br />
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
                      style="height:60px"
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
                <v-card class="mx-auto" :height="60" outlined style="border-radius:0">
                  <v-card-actions>
                    <span style="font-size:20px">{{tutorBoxReporteTutor['titulo']}}</span>

                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>fa fa-print</v-icon>
                    </v-btn>
                  </v-card-actions>
                  <v-card-title>{{tutorBoxReporteTutor['titulo']}}</v-card-title>
                </v-card>

                <v-card
                  class="pa-md-4 mx-lg-auto"
                  :height="500"
                  style="overflow:auto;border-radius:0"
                >
                  <v-card-text>
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
                    >
                      <template v-slot:top>
                        <v-toolbar flat color="white">
                          <v-toolbar-title>Información General Tutores</v-toolbar-title>
                          <v-divider class="mx-4" inset vertical></v-divider>
                          <v-spacer></v-spacer>
                        </v-toolbar>
                      </template>

                      <template v-slot:no-data>
                        <v-btn color="primary" @click="initialize">Reset</v-btn>
                      </template>
                    </v-data-table>
                    <br />
                    <br />
                  </v-card-text>
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

                  <div id="chartDonut">
                    <apexchart
                      ref="demoChartDonut"
                      width="380"
                      type="donut"
                      :options="OptionsDonutTutor"
                      :series="serieDonutTutor"
                    ></apexchart>
                  </div>

                  <!----------    
                <v-flex>
          <v-card color="white" class="mx-auto" width="800" height="500" style="border-radius:20px;">
            <v-card-title class="headline" style="color:gray">Horas Tutorias Instruidas</v-card-title>
            <v-divider></v-divider>

            <bar
              :label="datosRecibidos['labels_tiempo']"
              :horasInstruidas="datosRecibidos['horasInstruidas']"
              :horasTotales="datosRecibidos['horasTotales']"
              :color1="'#FEB019'"
              :color2="'#00E396'"
            ></bar>
          </v-card>
        </v-flex>
 <v-flex>
          <v-card color="white" width="800" height="500" style="border-radius:20px;">
            <v-card-title class="headline" style="color:gray">Sesiones Informales vs Formales</v-card-title>
            <v-divider></v-divider>
            <lineeg
              :DataLine1="ReporteFormalInformal['cantidadSesionesFormales']"
              :DataLine2="ReporteFormalInformal['cantidadSesionesInformales']"
              :color1="'#ed0f51'"
              :color2="'#00E396'"
              :labels="ReporteFormalInformal['labels_tiempo']"
            ></lineeg>
            {{ReporteFormalInformal['cantidadSesionesFormales']}}
          
          
           <div id="chart">
        <apexchart type="area" height="350" :options="chartOptions2" :series="series3"></apexchart>
      </div>
          
          </v-card>
        </v-flex>
                  ----------->
                </v-card>
              </el-col>
            </el-row>
          </v-card>

          <!---------------------------------->
        </v-flex>

        <v-flex>
                    <v-card
            class="mx-auto"
            width="1270"
            style="background-color:white;border-radius:20px;"
            elevation="0"
          >
            <!-----------------PARTE INICIAL DE LOS REPORTES (REPORTE TIPO TUTORIA)--------------------->
            <v-container fluid grid-list-lg>
              <v-layout wrap justify-space-around>
                <v-flex>
                  <v-card max-width="790" elevation="0">
                    <v-card-subtitle>
                      <h3>Reportes por Tipo tutoria</h3>
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
                        <v-btn text color="primary" @click="registrarFechaInicioTipoTutoria(startMenuTT,startTipoTutoria)">OK</v-btn>
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
                        <v-btn text color="primary" @click="registrarFechaFinTipoTutoria(endMenuTT,endTipoTutoria)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-card>
                </v-flex>
                <!----------------------------------------->
              </v-layout>
            </v-container>
          </v-card>
          <br>
          <!----------------ESTA PARTE ES EL TABLA DE REPORTES POR TIPO TUTORIAS------------------>

          <v-card color="white" class="mx-auto" width="1280" style="border-radius:20px;">
            <el-row>
              <el-col :lg="5">
                <v-card elevation="0">
                  <v-card class="mx-auto" style="border-radius:0">
                    <v-text-field
                      style="height:60px"
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
                <v-card class="mx-auto" :height="60" outlined style="border-radius:0">
                  <v-card-actions>
                    <span style="font-size:20px">{{tutorBoxReporteTipoTutoria['titulo']}}</span>

                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>fa fa-print</v-icon>
                    </v-btn>
                  </v-card-actions>
                  <v-card-title>{{tutorBoxReporteTipoTutoria['titulo']}}</v-card-title>
                </v-card>

                <v-card
                  class="pa-md-4 mx-lg-auto"
                  :height="500"
                  style="overflow:auto;border-radius:0"
                >
                  <v-card-text>
                    <el-row>
                      <el-col :lg="16">
                        <h5 style="color:#3F6FE6">{{tutorBoxReporteTipoTutoria['nombre']}}</h5>

                        <span style="font-weight:bold">{{tutorBoxReporteTipoTutoria['descripcion']}}</span>
                      </el-col>

                      <el-col :lg="8">
                        <span>From: Sistema TuTutor</span>
                        <br />
                        <span>Fecha Inicio: {{this.startTipoTutoria}}</span>
                        <br />
                        <span>Fecha Fin:  {{this.endTipoTutoria}}</span>
                      </el-col>
                    </el-row>
                    <v-data-table
                      :headers="headersTableTipoTutoria"
                      :items="dataTableTipoTutorias"
                      sort-by="calories"
                      class="elevation-1"
                    >
                      <template v-slot:top>
                        <v-toolbar flat color="white">
                          <v-toolbar-title>Información General Tipo tutorias</v-toolbar-title>
                          <v-divider class="mx-4" inset vertical></v-divider>
                          <v-spacer></v-spacer>
                        </v-toolbar>
                      </template>

                      <template v-slot:no-data>
                        <v-btn color="primary" @click="initialize">Reset</v-btn>
                      </template>
                    </v-data-table>
                  </v-card-text>
                </v-card>
              </el-col>
            </el-row>
          </v-card>

          <!---------------------------------->
        </v-flex>
      </v-layout>
    </v-container>
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
      
      /* MOSTRAR TABLA TUTORES GENERAL */
      dataTableTutores:[],
      
      headersTableTutores: [
        {
          text: "Codigo",
          align: "start",
          value: "code"
        },
        { text: "Tutor", value: "name" },
        { text: "#Sesiones", value: "total" },
        { text: "#Sesiones Informales", value: "informals" },
        { text: "# Tutorias Rechazadas", value: "cancelled" }
      ],
      /*FECHA FIN REPORTE TUTOR */
      
      //////////////////////////////////
      
            /*FECHA INICIO REPORTE TIPO TUTORIA */

       startMenuTT: false,
        endMenuTT: false,
      startTipoTutoria: '',
      endTipoTutoria: '',
      enviarDatosReporteTipoTutoria:{
        id_program:'',
        start_date:'',
        end_date:''
      },
      
      /* MOSTRAR TABLA TIPO TUTORIA GENERAL */
      dataTableTipoTutorias:[],
      
      headersTableTipoTutoria: [
        {
          text: "Nombre",
          align: "start",
          value: "name"
        },
        { text: "Obligatoria?", value: "is_required" },
        { text: "# Alumnos", value: "cant_students" },
        { text: "% Asistencias", value: "assisted_pcj" },
        { text: "# Tutores", value: "total_tutors" }
      ],
      /*FECHA FIN REPORTE TIPO TUTORIA */
      ///////////////////////////////////




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
          categories: [
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct"
          ]
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
        labels: ["Falta Tiempo", "Action", "SciFi", "Drama", "Horror"],
        title: {
          text: "Motivos de Rechazo",
          align: "left"
        }
      },
      serieDonutTutor: [44, 55, 41, 17, 15],
      ///////////////////////////////

     



      /////////////////////////
      serieAreaTutor: [
        {
          name: "Sesiones Formales",
          data: [0, 0, 0, 0, 0, 0, 0]
        },
        {
          name: "Sesiones Informales",
          data: [0, 0, 0, 0, 0, 0, 0]
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
          title: {
            text: "Fecha"
          },
          categories: ""
        },
        title: {
          text: "Sesiones Formales VS Sesiones Informales",
          align: "center"
        }
      },

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
      tutores: "",
      searchTutores: "",
      searchTipoTutoria: "",
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
      datosRecibidos: {
        Num_Estudiantes: "15",
        Num_Tutores: "20",
        Num_TiposTutorias: "14",
        labels_tiempo: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio"
        ],
        horasInstruidas: [78, 75, 80, 81, 76, 85, 70],
        horasTotales: [92, 90, 90, 55, 96, 95, 84]
      },
      nombreFacultad: localStorage.getItem("Nombre_programa"),
      labels: ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"],
      value: [200, 675, 410, 390, 310, 460, 250, 240],
      labelsMeses: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio"
      ],

      InformacionXTutoria: {
        title: "Trika",
        labels_tutoria: [
          "Trika",
          "Carta",
          "Permanente",
          "Tutoria 1",
          "No usado"
        ],
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

      seriesBar: [
        {
          name: "Trika",
          data: [44, 55, 41, 67, 22, 43]
        },
        {
          name: "Carta",
          data: [13, 23, 20, 8, 13, 27]
        },
        {
          name: "Tipo1",
          data: [11, 17, 15, 15, 21, 14]
        },
        {
          name: "No Usado",
          data: [21, 7, 25, 13, 22, 8]
        }
      ]
    };
  },
  methods: {
    /*ENVIAR FECHA DE INICIO Y FIN DE TUTOR */
    registrarFechaFinTutor(endMenu,endTutor){
      console.log(this.endTutor);
      this.$refs.endMenu.save(endTutor);
      console.log(this.endTutor);
      this.generarReporteTutores();
    },
    registrarFechaInicioTutor(startMenu,startTutor){
      console.log(this.startTutor);
      this.$refs.startMenu.save(startTutor);
      console.log(this.startTutor);
    //  this.generarReporteTutores();
    },
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

//////////////////////////////////
  /*ENVIAR FECHA INICIO Y FIN DE TIPO TUTORIA */
    registrarFechaFinTipoTutoria(endMenuTT,endTipoTutoria){
      this.$refs.endMenuTT.save(endTipoTutoria);
      console.log(this.endMenuTT);
      this.generarReporteTipoTutoria();
    },
    registrarFechaInicioTipoTutoria(startMenuTT,startTipoTutoria){
      this.$refs.startMenuTT.save(startTipoTutoria);
      console.log(this.startMenuTT);
      //this.generarReporteTipoTutoria();
      
    },

    generarReporteTipoTutoria(){
      this.enviarDatosReporteTipoTutoria['id_program']=localStorage.getItem("Id_facultad");
      this.enviarDatosReporteTipoTutoria['start_date']=this.startTipoTutoria;
      this.enviarDatosReporteTipoTutoria['end_date']=this.endTipoTutoria;
      console.log(this.enviarDatosReporteTutor)
       axios
        .post("/coordinator/show_tutoring_types_report/", this.enviarDatosReporteTipoTutoria)
        .then(res => {
          this.dataTableTipoTutorias=res.data.tutoring_types;
          console.log(res.data);
          //this.$message({ message: "Registro exitoso.", type: "success" });
        })
        .catch(error => console.log(error));
        
    },

////////////////////////////////////////////////

showReporteXTutorGeneral() {
      this.tutorBoxReporteTutor["titulo"] =
        "Reporte " + "Tutores " + localStorage.getItem("Nombre_programa");
      this.tutorBoxReporteTutor["nombre"] = localStorage.getItem(
        "Nombre_programa"
      );
      this.tutorBoxReporteTutor["codigo"] = "Información Tutores";
      axios
        .get(
          "coordinator/shows_formals_and_informals/" +
            localStorage.getItem("Id_facultad") +
            "/" +
            0
        )
        .then(res => {
          this.ReporteFormalInformal = res.data;
          this.serieAreaTutor[0]["data"] = this.ReporteFormalInformal[
            "cantidadSesionesFormales"
          ];
          this.serieAreaTutor[1]["data"] = this.ReporteFormalInformal[
            "cantidadSesionesInformales"
          ];
          this.OptionsAreaTutor["xaxis"][
            "categories"
          ] = this.ReporteFormalInformal["labels_tiempo"];
          console.log(this.OptionsAreaTutor);
          //(Actualizamos el color)Para que se actualice los graficos
          this.$refs.demoChartArea.updateOptions({
            colors: ["#008FFB", "#00E396"]
          });
        })
        .catch(error => console.log(error));
    },
    showReporteXTutor(tutor) {
      this.tutorBoxReporteTutor["titulo"] =
        "Reporte " + "Tutores " + localStorage.getItem("Nombre_programa");
      this.tutorBoxReporteTutor["nombre"] = tutor.person_full_name;
      this.tutorBoxReporteTutor["codigo"] = tutor.person_code;

      axios
        .get(
          "coordinator/shows_formals_and_informals/" +
            localStorage.getItem("Id_facultad") +
            "/" +
            tutor.person_id
        )
        .then(res => {
          this.ReporteFormalInformal = res.data;
          this.serieAreaTutor[0]["data"] = this.ReporteFormalInformal[
            "cantidadSesionesFormales"
          ];
          this.serieAreaTutor[1]["data"] =
            res.data["cantidadSesionesInformales"];
          this.OptionsAreaTutor["xaxis"][
            "categories"
          ] = this.ReporteFormalInformal["labels_tiempo"];
          console.log(this.OptionsAreaTutor);
          //(Actualizamos el color) Para que se actualice los graficos
          this.$refs.demoChartArea.updateOptions({
            colors: ["#008FFB", "#00E396"]
          });
        })
        .catch(error => console.log(error));
    },

    /*REPORTE POR TIPO TUTORIA*/
    showReporteXTipoTutoriaGeneral() {
      this.tutorBoxReporteTipoTutoria["titulo"] =
        "Reporte " +
        "Tipos tutorias " +
        localStorage.getItem("Nombre_programa");
      this.tutorBoxReporteTipoTutoria["nombre"] = localStorage.getItem(
        "Nombre_programa"
      );
      this.tutorBoxReporteTipoTutoria["descripcion"] =
        "Información Tipo tutorías";
      axios
        .get(
          "coordinator/shows_formals_and_informals/" +
            localStorage.getItem("Id_facultad") +
            "/" +
            0
        )
        .then(res => {
          this.ReporteFormalInformal = res.data;
          this.serieAreaTutor[0]["data"] = this.ReporteFormalInformal[
            "cantidadSesionesFormales"
          ];
          this.serieAreaTutor[1]["data"] = this.ReporteFormalInformal[
            "cantidadSesionesInformales"
          ];
          this.OptionsAreaTutor["xaxis"][
            "categories"
          ] = this.ReporteFormalInformal["labels_tiempo"];
          console.log(this.OptionsAreaTutor);
          //(Actualizamos el color)Para que se actualice los graficos
          this.$refs.demoChartArea.updateOptions({
            colors: ["#008FFB", "#00E396"]
          });
        })
        .catch(error => console.log(error));
    },
    showReporteXTipoTutoria(tipoTutoria) {
      this.tutorBoxReporteTipoTutoria["titulo"] =
        "Reporte " +
        "Tipos tutorias " +
        localStorage.getItem("Nombre_programa");
      this.tutorBoxReporteTipoTutoria["nombre"] = tipoTutoria.tt_name;
      this.tutorBoxReporteTipoTutoria["descripcion"] =
        tipoTutoria.tt_description;
      /*
       axios
        .get(
          "coordinator/shows_formals_and_informals/" +
            localStorage.getItem("Id_facultad") +
            "/" +
            tutor.person_id
        )
        .then(res => {
          this.ReporteFormalInformal = res.data;
          this.serieAreaTutor[0]['data']=this.ReporteFormalInformal['cantidadSesionesFormales'];
          this.serieAreaTutor[1]['data']=res.data['cantidadSesionesInformales'];
          this.OptionsAreaTutor['xaxis']['categories']=this.ReporteFormalInformal['labels_tiempo'];
          console.log(this.OptionsAreaTutor);
          //(Actualizamos el color) Para que se actualice los graficos
          this.$refs.demoChartArea.updateOptions({colors:['#008FFB', '#00E396']});
        })
        .catch(error => console.log(error));
        */
    },

    /////////////////////////////////////////////////////////

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
    listarTutores() {
      axios
        .get("/coordinator/show_tutors/" + localStorage.getItem("Id_facultad"))
        .then(res => {
          this.tutores = res.data.users;
          console.log(this.tutores);
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

          console.log(this.ReporteTipoTutoria);
        })
        .catch(error => console.log(error));
    },

    ReporteGeneralFormalInformal() {
      axios
        .get(
          "coordinator/shows_formals_and_informals/" +
            localStorage.getItem("Id_facultad") +
            "/" +
            0
        )
        .then(res => {
          this.ReporteFormalInformal = res.data;

          console.log(this.ReporteFormalInformal);
        })
        .catch(error => console.log(error));
    },

    showStudents() {
      var that = this;
      that.$router.push("/Coordinador/Miembros/Alumnos");
    },
    showTypesTutoring() {
      var that = this;
      that.$router.push("/Coordinador/Tipos de Tutoría");
    },
    showTutors() {
      var that = this;
      that.$router.push("/Coordinador/Miembros/Tutores");
    },
    completarDonus() {
      this.options["labels"] = this.InformacionXTutoria["labels_tutoria"];
      this.series = this.InformacionXTutoria["horasInstruidas"];
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
    }
  },
  created() {
    //ejecuta por defecto las tutorias Generales en ambos
    this.showReporteXTutorGeneral();
    this.showReporteXTipoTutoriaGeneral();
    ////////////////////////////////////
    this.ReporteGeneralTipoTutoria();
    this.completarDonus();
    this.listarTutores();
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