<template>
  <el-container direction="vertical">
    <!-- Titulo-->
    <el-row>
      <el-col :span="2">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <h1 style="text-align: center;">
            <i class="fas fa-users"></i>&nbsp;Sesiones 
            <h6>Histórico de Sesiones</h6>            
          </h1>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <el-input placeholder="Buscar usuario" v-model="search" clearable>
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content"></div>
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
      :items="sesiones"
      :search="search"
      :items-per-page="5"
      :sort-by="['person_code']"
      multi-sort
      class="elevation-3"
      loading-text="Cargando.."
      height="288px"
      fixed-header
    >
    <template v-slot:item.detalles="{ item }">
        <el-button type="info" icon="el-icon-edit" circle @click="detalles(item)"></el-button>
    </template>
    </v-data-table>
    <br>
    <el-col :span="1">
        <div class="grid-content">
          <el-button
            type="success"
            icon="fas fa-user-plus"
            @click="insertar()"
            class="buttonAdd"
          >&nbsp;Registar Sesión</el-button>
        </div>
    </el-col>
    <!--Formulario-->
    <sesionesForm
      :form="form"
      :dialog="dialog"
      :action="action"
      v-on:resetDialog="dialog=false"
      v-on:resetList="listar()"
    ></sesionesForm>
  </el-container>
</template>

<script>
import axios from "axios";
import SesionesForm from "./SesionesForm"

export default {
  data() {
    return {
      sesiones: [],
      headers: [
        { text: "Fecha", value: "person_code" },
        { text: "Alumno", value: "person_full_name" },
        { text: "Hora", value: "person_rol" },
        { text: "Solicitud", value: "person_phone_number" },                
        { text: "Detalles", value: "detalles", sortable: false },
      ],
      form:{

      },
      search: "",
      dialog: false,
      action: ""
    };
  },

  created() {
    this.listar();
  },

  methods: {
    listar() {
      axios
        .get("/admin/show_users/")
        .then(res => {
          this.sesiones = res.data.users;
        })
        .catch(error => console.log(error));
    },
    detalles(item){
        this.action = "Detalles de la sesión"        
        this.form = Object.assign({},item);
        this.dialog = true;
    },
    insertar() {
      this.action = "Registrar nueva sesión";
      this.dialog = true;
    },
  },
  components:{
      sesionesForm: SesionesForm
  }
};
</script>