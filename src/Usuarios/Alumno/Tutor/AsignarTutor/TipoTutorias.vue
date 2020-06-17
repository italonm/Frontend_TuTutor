<template>
  <div>
    <div v-show="showProgram">
      <el-row>
        <el-col :span="8">
          <div class="grid-content">
            <el-input placeholder="Buscar Tutoria" v-model="search" clearable>
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
        </el-col>
      </el-row>

      <!-----------
        <el-card class="box-group" style="overflow:auto">
        
      ------------->
      <v-container fluid grid-list-xl>
        <v-layout wrap justify-space-around>
          <v-flex v-for="tipo in filterTipoTutoria" :key="tipo.tt_name">
            <v-card class="mx-auto" max-width="300">
              <v-img
                class="white--text align-end"
                height="100px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
                <v-card-title>{{tipo.tt_name}}</v-card-title>
              </v-img>
              <v-card-subtitle class="pb-0">
                DESCRIPCIÓN:
                
              </v-card-subtitle>
              <v-card-text class="text--primary">
                <div>{{ tipo.tt_description }}</div>
                <div>{{ tipo.tt_isrequired }} es tutoria obligatoria</div>
                <div>Duración {{tipo.tt_periodicity}}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn color="green" text @click="solicitarTutor(tipo)">
                  <i class="el-icon-search"></i>Buscar tutores
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>


        <!------
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


        --------->
    </div>
    <tutoresxTipoTutoria v-show="!showProgram"></tutoresxTipoTutoria>
  </div>
</template>

<script>
import axios from "axios";
import TutoresxTipoTutoria from "./TutoresxTipoTutoria";
export default {
  data() {
    return {
      tiposTutoria: [],

      showProgram: true,
      search: "",
      showBox: false,
      tipoTutoriaInfo: "",
      scheduler: [],
      tutoria: {
        s_id_student: "",
        s_code_tutor: "",
        s_tt: ""
      },
      dialog: false
    };
  },
  methods: {
    listaTiposTutorias() {
      axios
        .get("/coordinator/show_tutoring_types/")
        .then(res => {
          this.tiposTutoria = res.data.tutoriaData;

          console.log(this.tiposTutoria);
        })
        .catch(error => console.log(error));
    },
    showMensaje(tipo) {
      this.showBox = true;
      this.tipoTutoriaInfo = tipo;
    },
    solicitarTutor(tipo) {
      console.log("mostrar tipo tutoria");
      localStorage.setItem("Id_Tipo_Tutoria", tipo.tt_id);
      this.showProgram = false;
    }
  },
  computed: {
    filterTipoTutoria: function() {
      console.log(localStorage.getItem("Id_facultad"));
      return this.tiposTutoria.filter(tipo => {
        return tipo.tt_name.toLowerCase().match(this.search.toLowerCase());
      });
    }
  },
  created() {
    this.listaTiposTutorias();
  },
  components: {
    tutoresxTipoTutoria: TutoresxTipoTutoria
  }
};
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
  border-color: gray;
  border-width: 1.5px;
}

.box-group {
  height: 480px;
}
.box-information {
  height: 400px;
}
</style>