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
          <el-input placeholder="Buscar asignación" v-model="search" clearable>
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </el-col>
      <el-col :span="8">
      </el-col>
    </el-row>    
    <div class="containerBody">
       <Elemento v-for="comp in components" :key="comp" :state="comp.state" :name="comp.name" :last_name="comp.last_name" :tutoring_type="comp.tutoring_type" :id_alumno="comp.code" :callMethod="parentMethod"></Elemento>
    </div>    
    <!--Formulario-->
    <plan
      :form="form"
      :dialog="dialog"       
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
        form:{                    
        }         
      }    	
    },  
    mounted: function(){      
      this.listar()
    },
    methods:{     
      parentMethod: function(){
        this.dialog = true
      },
      listar(){           
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
            }            
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
