<template>
  <el-container direction="vertical">
    <!-- Titulo-->
    <el-row>
      <el-col :span="12">
        <div class="grid-content">
          <h1 style="text-align: left; font-family: 'Basic', sans-serif;font-weight:600;">
            Alumnos
            <h6 class="text-muted mb-3">Alumnos Asignados</h6>            
          </h1>     
          <div class="searchBox">                          
            <el-input placeholder="Buscar alumno" v-model="search" clearable>
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>   
          </div>            
        </div>        
      </el-col>      
      
      <el-col :span="12">
        <div class="grid-content">
          <h1 style="text-align: left; font-family: 'Basic', sans-serif;font-weight:600;">
            Tutorías
            <h6 class="text-muted mb-3">Tutorías con {{namae}}</h6>            
          </h1>                            
        </div>
      </el-col>
    </el-row>  

    <el-row>
      <el-col :span="12">
        <alumnos v-for="(alumno, idx) in alumnos" :key="idx" :alumno="alumno" ></alumnos>  
      </el-col>
      <el-col :span="12">
        <div class="containerBody">
          <h3 class="mt-10" v-if="show">Seleccione un alumno</h3>
          <asignaciones v-else v-for="(comp, ind) in asignaciones" :key="ind" :comp="comp" :name="namae" :callMethod="parentMethod"></asignaciones>
        </div>
      </el-col>
    </el-row>    
        
    <!--Formulario-->
    <plan
      :form="form"
      :dialog="dialog"  
      :id_assignment="id_assign" 
      :todos="todos"
      :auxTodos="auxTodos"
      v-on:resetDialog="dialog=false"
      v-on:resetList="listar()"
      v-on:rerender="rerender()"
    ></plan>
  </el-container> 
</template>

<script>
import axios from "axios"
import Plan from "./PlanAcción.vue"
import { bus } from "../../../main"
import Alumnos from "./Alumnos.vue"
import Asignaciones from "./Elemento.vue"

  export default {
    data(){
      return{
        components:[],
        namae:"",                     
        dialog: false,
        id_assign:1,
        show: true,
        form:{                    
        },         
        todos:[],
        auxTodos:[],
        alumnos:[],
      }    	
    },     
    computed:{
      asignaciones(){        
        return this.components
      }
    },
    created(){
      bus.$on("updateAssign",data=>{
        console.log(data)
        this.listar()
      }) 
      bus.$on("verDetalle", data=>{        
        this.namae = data.name + " " + data.last_name                        
        this.listarAsignaciones(data)        
        this.show = false                     
      })
      this.listar();      
    },    
    methods:{     
      listarAsignaciones(data){
        axios
        .get("/tutor/show_assignments_from_student/" + localStorage.getItem("Id_usuario") + "/" + data.id)
        .then(response=>{
          this.components = response.data.assignments
        })
      },
      parentMethod: function(id){        
        this.id_assign = id
        var iter
        this.todos=[]
        this.auxTodos=[]
        axios
        .get("/tutor/show_activities/"+id)
        .then(res=>{            
            for(iter in res.data.activities){
              var aux={
                id:1,
                text:"",
                completed:false,
                editing:false
              }
              var aux2={
                id:1,
                name:"",
                state:false,                
                is_cancelled:false
              }
              aux.id = res.data.activities[iter].id
              aux2.id = aux.id
              aux.text = res.data.activities[iter].activity
              aux2.name = aux.text
              if (res.data.activities[iter].state === "Terminado"){
                aux.completed = true
                aux2.state = true
              }
              this.todos.push(aux)
              this.auxTodos.push(aux2)
            }                        
        })           
        this.dialog = true
      },              
      listar(){         
        this.alumnos=[];                
        console.log(localStorage.getItem("Id_usuario"))
        axios.get("/tutor/show_students_from_tutor/" + localStorage.getItem("Id_usuario"))
        .then(response=>{       
          this.alumnos = response.data.students                                                                               
        })
      }
    },
    components:{    
      asignaciones:Asignaciones,  
      plan:Plan,
      alumnos:Alumnos      
    }
  }
</script>
<style>
  @import "./Asignaciones.css";
</style>
