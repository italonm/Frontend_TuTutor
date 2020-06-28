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
          <alumnos v-for="(alumno, idx) in alumnos" :key="idx" :alumno="alumno" ></alumnos>      
        </div>        
      </el-col>      
      
      <el-col :span="12">
        <div class="grid-content">
          <h1 style="text-align: left; font-family: 'Basic', sans-serif;font-weight:600;">
            Tutorías
            <h6 class="text-muted mb-3">Tutorías con {{namae}}</h6>            
          </h1>          
          <Elemento v-if="show" :components="components" :callMethod="parentMethod" ></Elemento>        
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
import Elemento from "./Elemento.vue"
import axios from "axios"
import Plan from "./PlanAcción.vue"
import { bus } from "../../../main"
import Alumnos from "./Alumnos.vue"

  export default {
    data(){
      return{
        components:[],
        namae:"",                     
        dialog: false,
        id_assign:1,
        show: false,
        form:{                    
        },         
        todos:[],
        auxTodos:[],
        alumnos:[],        
      }    	
    },     
    created(){
      bus.$on("updateAssign",data=>{
        console.log(data)
        this.listar()
      }) 
      bus.$on("verDetalle", data=>{        
        this.namae = data.participants[0].name + " " + data.participants[0].last_name                        
        this.components = data        
        this.show = true
      })
      this.listar();      
    },
    watch:{
      asignAlumnos: function(){
        console.log("AUXILIO")                
      }
    },
    methods:{     
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
        this.components=[];                 
        axios.get("/tutor/show_assignments/" + localStorage.getItem("Id_usuario"))
        .then(response=>{                                                                                   
          this.alumnos = response.data.assignments
        })
      }
    },
    components:{
      Elemento,
      plan:Plan,
      alumnos:Alumnos      
    }
  }
</script>
<style>
  @import "./Asignaciones.css";
</style>
