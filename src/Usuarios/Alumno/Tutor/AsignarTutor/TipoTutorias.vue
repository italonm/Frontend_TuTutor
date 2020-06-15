<template>
    <div>
    <div v-show="showProgram">
    <el-row>
       <el-col :span="8">
        <div class="grid-content">
          <el-input placeholder="Buscar Tutor" v-model="search" clearable>
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="12">
        <el-col :span="12">
        <el-card class="box-group" style="overflow:auto">
        <div v-for="tipo in filterTipoTutoria" :key="tipo" class="text item" @click="showMensaje(tipo)">
           <el-card class="box-card"    style="border-style:dashed;" >
              
              <el-row :gutter="12">
                <el-col :span="12">
                   <i class="fas fa-user-tie"></i> 
                    {{tipo.tt_name}}
                  
                </el-col>
                <el-col :span="7" :offset="5">
                  <p></p>
                  <el-button size="mini" type="info"  icon="fas fa-search" @click="solicitarTutor(tipo)"  plain>&nbsp;Buscar tutores</el-button>
                </el-col>
              </el-row>
            </el-card>
        </div>
        </el-card>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-card class="box-information" style="overflow:auto" v-show="showBox">
         <div slot="header" class="clearfix">
          <h4 style="font-weight:bold; color:#3C4B64">Acerca de la Tutoría</h4>
          </div>
            <el-form ref="formulario" :model="form" label-width="100px" size="mini" label-position="left" style="margin-left:20px;">
              <el-form-item label="Nombre:">
                {{tipoTutoriaInfo.tt_name}}
              </el-form-item>
              <el-form-item  label="Descripción:" >
                {{tipoTutoriaInfo.tt_description}}
              </el-form-item>
              <el-form-item  label="Periocidad:" >
                {{tipoTutoriaInfo.tt_periodicity}}
              </el-form-item>
              <el-form-item  label="Obligatoria:" >
                {{tipoTutoriaInfo.tt_isrequired}}
              </el-form-item>
              
            </el-form>
        </el-card>
      </el-col>
    </el-row>
    </div>
    <tutoresxTipoTutoria v-show="!showProgram"
    ></tutoresxTipoTutoria>
    </div>
</template>

<script>
import axios from "axios";
import TutoresxTipoTutoria from "./TutoresxTipoTutoria"
export default {
  data(){
    return{
      tiposTutoria:[],
      
      showProgram:false,
      search:'',
      showBox:false,
      tipoTutoriaInfo:'',
      scheduler:[],
      tutoria:{
        s_id_student:'',
        s_code_tutor:'',
        s_tt:''},
        dialog: false,
    }
  },
  methods:{
    listaTiposTutorias() {
      axios
        .get("/coordinator/show_tutoring_types/")
        .then(res => {
          this.tiposTutoria = res.data.tutoriaData;
        
          console.log(this.tutores);
        })
        .catch(error => console.log(error));
    },
    showMensaje(tipo){
      this.showBox=true;
      this.tipoTutoriaInfo=tipo;
    },
    solicitarTutor(){


    }
  },
  computed:{
    filterTipoTutoria: function(){
      console.log(localStorage.getItem("Id_facultad"))
      return this.tiposTutoria.filter((tipo)=>{
          return (tipo.tt_name.toLowerCase()).match(this.search.toLowerCase()) 
      });
    }
  },
  created(){
    this.listaTiposTutorias();
  },
  components:{
      
    tutoresxTipoTutoria: TutoresxTipoTutoria,
  }
}

</script>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 5px 0;
  }

  .box-card {
    height: 150px;
    border-radius: 20px;
    cursor: pointer;
    border-color:  gray; 
    border-width: 1.5px;
    }
    

  .box-group {
    height: 480px;
  }
  .box-information{
    height: 400px;
  }
</style>