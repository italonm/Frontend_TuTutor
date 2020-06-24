<template>
  <el-container direction="vertical">
    <!-- Titulo-->
    <el-row>
      <el-col :span="8">
        <div class="grid-content">
          <h1 style="text-align: center;">
            <i class="fa fa-calendar"></i>&nbsp;Asignaciones
          </h1>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <el-input placeholder="Buscar asignación"  clearable>
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </el-col>
      <el-col :span="8">
      </el-col>
    </el-row>    
    <div class="containerBody">
       <Elemento v-for="(comp, idx) in components" :key="idx" :state="comp.state" :name="comp.name" :last_name="comp.last_name" :tutoring_type="comp.tutoring_type" :id_alumno="comp.code" :callMethod="parentMethod" :id_assignment="comp.id_assignment"></Elemento>
    </div>    
    <!--Formulario-->
    <plan
      :form="form"
      :dialog="dialog"  
      :id_assignment="id_assign" 
      :todos="todos"
      v-on:resetDialog="dialog=false"
      v-on:resetList="listar()"
    ></plan>
  </el-container>
</template>

<script>
import Elemento from "./Elemento.vue"
import axios from "axios"
import Plan from "./PlanAcción.vue"

  export default {
    data(){
      return{
        components:[],             
        dialog: false,
        id_assign:1,
        form:{                    
        },         
        todos:[]
      }    	
    },     
    created(){
      this.listar();
    },
    methods:{     
      parentMethod: function(id){        
        this.id_assign = id
        var iter
        this.todos=[]
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
              aux.id = res.data.activities[iter].id
              aux.text = res.data.activities[iter].activity
              if (res.data.activities[iter].state === "Terminado"){
                aux.completed = true
              }
              this.todos.push(aux)
            }            
        })
        this.dialog = true
      },      
      listar(){         
        this.components=[];  
        var comp        
        axios.get("/tutor/show_assignments/" + localStorage.getItem("Id_usuario"))
        .then(response=>{
          console.log(response)
          for(comp in response.data.assignments)
          {
            var aux = {
              name:"",
              tutoring_type:"",
              last_name:"",
              state:"",
              code:"",
              id_assignment:1,
            }          
            aux.id_assignment = response.data.assignments[comp].id
            aux.name = response.data.assignments[comp].participants[0].name
            aux.code = response.data.assignments[comp].participants[0].code
            aux.last_name = response.data.assignments[comp].participants[0].last_name
            aux.state = response.data.assignments[comp].state
            aux.tutoring_type = response.data.assignments[comp].tutoring_type                                    
            this.components.push(aux)   
          }  
          console.log(this.components)                          
        })
      }
    },
    components:{
      Elemento,
      plan:Plan    	
    }
  }
</script>
<style>
  @import "./Asignaciones.css";
</style>
