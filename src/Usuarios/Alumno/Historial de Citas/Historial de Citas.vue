<template>
  <el-container direction="vertical">
    <!-- Titulo-->
    <el-row>
      <el-col :span="12">
        <div class="grid-content">
          <h1 style="text-align: center;">
            <i class="fas fa-history"></i>&nbsp;Historial de sesiones
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
        <div class="grid-content">
        </div>
      </el-col>
    </el-row>

    <!-- Tabla-->
    <v-data-table
      :footer-props="{'items-per-page-options': [5, 10, 15, -1],
                      'items-per-page-text': 'Registros por página:',
                      'items-per-page-all-text': 'Listar todos'}"

      :headers="headers"
      :items="unidades"
      :search="search"
      :items-per-page="5"
      :sort-by="['name']"
      multi-sort
      class="elevation-3"
      loading-text="Cargando.."
      height="288px"
      fixed-header
    > 
    <template v-slot:item.verMas="{ item }">
        <el-button 
        type="info" 
        icon="el-icon-eye" 
        circle 
        @click="verMas(item)"
        ></el-button>
      </template>

    </v-data-table>

    <!--Formulario-->
    <historialForm
      :form="form"
      :dialog="dialog"
      :action="action"
      v-on:resetDialog="dialog=$event"
      v-on:resetList="listar()"
    ></historialForm>

  </el-container>
</template>

<script>
import axios from "axios";
import HistorialForm from "./HistorialDeCitasForm";

export default {
  data() {
    return {
      unidades: [],
      headers: [
        { text: "Fecha", value: "date" },
        { text: "Tutor", value: "tutor" },
        { text: "Sesión formal", value: "isFormal" },
        { text: "Lugar", value: "place" },
        { text: 'Ver detalle', value: "verMas", sortable: false }
      ],
      form: {
        date: "",
        tutor: "",
        place: "",
        isFormal: "",
        reason1: "",
        reason2: "",
      },
      search: "",
      dialog: false,   
    };
  },

  created() {
    this.listar();
  },

  methods: {
    listar() {
       console.log(localStorage.getItem("Id_usuario"));
       axios
      .get("http://184.73.231.88:5000/api/student/show_student_history/" + "54")
      .then(res => {
        console.log(res.data);
        this.unidades = res.data.sessions;
      })
      .catch(error => console.log(error));
    },

    verMas(item) {
      this.action = "Detalle";
      this.form = Object.assign({}, item);
      this.dialog = true;
    },
  },

  components: {
    historialForm: HistorialForm
  }
};
</script>