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
    <template #item.full_name="{ item }">{{ item.students.name }} {{ item.students.last_name }}</template>

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
      :option="option"
      :facultades="facultades"
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
        { text: "Alumno",  value:"full_name" },
        { text: "Programa",  value:"students.program_name" },
        { text: "Motivo principal", value: "reason1"},
        { text: "Motivo secundario", value: "reason2"},
        { text: "Asistencia", value: "students.assistance"},
        { text: "Tipo de Solicitud", value: "is_formal" },                
        { text: "Resultado", value: "detalles", sortable: false },
      ],
      facultades:[],
      form:{
        resultado:"",
        id:null,
        last_modified:""
      },
      search: "",
      dialog: false,
      action: "",
      option: true
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
      //TOKEN CODING
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
          this.facultades = res.data.programs               
        })
        .catch(error => {
          console.log(error);
          this.$message.error("No tiene programas registrados");
        });                         
      axios
        .get("http://184.73.231.88:7002/api/tutor/show_student_history_for_tutor/" + localStorage.getItem("Id_usuario"))        
        .then(res => {                         
          this.sesiones = res.data.sessions        
          for (sesion in res.data.sessions){                      
            aux = 0
            for (alumno in res.data.sessions[sesion].students){              
              if (alumno != -1)
                aux = aux + 1                         
            }
            if (aux === 1){              
                this.sesiones[sesion].students = res.data.sessions[sesion].students[0]
            }
            if(this.sesiones[sesion].students.assistance==1)            
              this.sesiones[sesion].students.assistance = "Asistió"
            else
              this.sesiones[sesion].students.assistance = "No asistió"

            if (this.sesiones[sesion].is_formal)
              this.sesiones[sesion].is_formal = "Formal"
            else
              this.sesiones[sesion].is_formal = "Informal"   

            if (this.sesiones[sesion].reason1 == "" || this.sesiones[sesion].reason1 == null)
              this.sesiones[sesion].reason1 = "No hay motivo"

            if (this.sesiones[sesion].reason2 == "" || this.sesiones[sesion].reason2 == null)
              this.sesiones[sesion].reason2 = "No hay motivo"
      
          }          
        })
        .catch(error => console.log(error));
    },
    detalles(item){                
        this.action = "Detalles de la sesión"        
        this.option = false        
        this.form.resultado = item.result       
        this.form.last_modified = item.last_modified
        this.form.id = item.id         
        this.dialog = true;
    },
    insertar() {  
      this.option = true;
      this.action = "Registrar nueva sesión";              
      this.dialog = true;
    },
  },
  components:{
      sesionesForm: SesionesForm
  }
};
</script>