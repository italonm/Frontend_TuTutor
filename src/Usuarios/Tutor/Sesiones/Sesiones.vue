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
        { text: "Fecha", value: "date" },
        { text: "Alumno",  value:"students" },
        { text: "Motivo", value: "reason1"},
        { text: "Solicitud", value: "is_formal" },                
        { text: "Detalles", value: "detalles", sortable: false },
      ],
      form:{
        facultades:[],
        id_facultades:[],
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
      var sesion
      var alumno      
      var aux = 0                          
      axios
        .get("/tutor/show_student_history_for_tutor/" + localStorage.getItem("Id_usuario"))        
        .then(res => {            
          this.sesiones = res.data.sessions        
          for (sesion in res.data.sessions){                      
            aux = 0
            for (alumno in res.data.sessions[sesion].students){              
              if (alumno != -1)
                aux = aux + 1                         
            }
            if (aux === 1){              
              this.sesiones[sesion].students = res.data.sessions[sesion].students[0].last_name + " " + res.data.sessions[sesion].students[0].name
            }
            if (this.sesiones[sesion].is_formal)
              this.sesiones[sesion].is_formal = "Formal"
            else
              this.sesiones[sesion].is_formal = "Informal"
            
          }
          console.log(this.sesiones)
         /*  console.log(res)                            
          this.sesiones= res.data.sessions; 
          console.log(this.sesiones)    */                         
        })
        .catch(error => console.log(error));
    },
    detalles(item){
        this.action = "Detalles de la sesión"   
        this.form = Object.assign({},item);
        this.dialog = true;
    },
    insertar() {
      var program;
      var aux1 = [];
      var aux2 = [];
      var username = localStorage.getItem("Token")
      username = username.slice(1,username.length-1)
      var password = '';
      var token = new Buffer(username + ':' + password).toString('base64');                  
      this.action = "Registrar nueva sesión";      
      axios
        .get("tutor/show_programs_from_tutor/" + localStorage.getItem("Id_usuario"),
        {headers:{
          'Authorization': `Basic ${token}`
        }})
        .then(res =>{
          for(program in res.data.programs){            
            aux1.push(res.data.programs[program].program_name)
            aux2.push(res.data.programs[program].program_id)
          }
          this.form.facultades = aux1;
          this.form.id_facultades = aux2;               
        })
        .catch(error => {
          console.log(error);
          this.$message.error("No tiene programas registrados");
        });      
      this.dialog = true;
    },
  },
  components:{
      sesionesForm: SesionesForm
  }
};
</script>