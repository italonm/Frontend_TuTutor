<template>
  <el-container direction="vertical">
    <!-- Titulo-->
    <el-row>
      <el-col :span="8">
        <div class="grid-content">
          <h1 style="text-align: center;">
            <i class="fa fa-calendar"></i>&nbsp;Citas programadas
          </h1>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <el-input placeholder="Buscar cita" v-model="search" clearable>
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </el-col>
      <el-col :span="8">
      </el-col>
    </el-row>

    <!-- Tabla-->
    <v-data-table
      :footer-props="{
        'items-per-page-options': [5, 10, 15, -1],
        'items-per-page-text': 'Registros por página:',
        'items-per-page-all-text': 'Listar todos',
      }"
      :headers="headers"
      :items="listaCitas"
      :search="search"
      :items-per-page="5"
      :sort-by="['code']"
      multi-sort
      class="elevation-3"
      loading-text="Cargando.."
      height="288px"
      fixed-header
    >
      <template v-slot:item.editar="{ item }">
        <el-button type="info" icon="el-icon-edit" circle @click="editar(item)"></el-button>
      </template>
      <template v-slot:item.eliminar="{ item }">
        <el-button type="danger" icon="el-icon-close" circle @click="eliminar(item)"></el-button>
      </template>
    </v-data-table>

    <!--Formulario-->
    <resultadoForm
      :listaAlumnos="listaAlumnos"
      :dialog="dialog"
      :action="action"
      v-on:resetDialog="dialog=$event"
      v-on:resetList="listar()"
    ></resultadoForm>
  </el-container>
</template>

<script>
import axios from "axios";
import resultado from "./Resultado"
export default {
  data() {
    return {
        headers: [
        { text: "Fecha", value: "fecha" },
        { text: "Hora Inicio", value: "horaIni" },
        { text: "Hora Fin", value: "horaFin" },
        { text: "Ubicacion", value: "ubicacion" },
        { text: "Cantidad de alumnos", value: "cant_students" },
      //  { text: "Tiempo restante", value: "tt_isrequired" },
        { text: "Registrar / Editar resultado", value: "editar", sortable: false },
        { text: "Cancelar cita", value: "eliminar", sortable: false }
        ],
        listaCitas:[],
        listaAlumnos:[],
        search: "",
        dialog: false,
        action: ""
    }
  },
  created() {
    console.log(JSON.parse(localStorage.getItem("Id_usuario")));
    this.listar();
  },
  methods: {
    listar() {
      axios
        .get("/tutor/show_sessions_tutor/"+ JSON.parse(localStorage.getItem("Id_usuario")))
        .then(res => {
          this.listaCitas = res.data.data 
          console.log(this.listaCitas);
        })
        .catch(error => console.log(error));
    },
    editar(item) {
      axios
          .get("/tutor/show_all_students_in_session/"+ item.id_session)
          .then(res => {
            this.listaAlumnos = res.data.data;
          })
      .catch(error => console.log(error));
      this.action = "Editar resultado de la cita";
      this.dialog = true;
    }
  },
  components: {
    resultadoForm: resultado
  }
}
</script>