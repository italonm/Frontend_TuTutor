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
      <!-----
      <v-container fluid grid-list-xl>
        <v-layout wrap justify-space-around>
          <v-flex v-for="tipo in filterTipoTutoria" :key="tipo.name">
            <v-card class="mx-auto" max-width="300">
              <v-img
                class="white--text align-end"
                height="100px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
                <v-card-title>{{tipo.name}}</v-card-title>
              </v-img>
              <v-card-subtitle class="pb-0">DESCRIPCIÓN:</v-card-subtitle>
              <v-card-text class="text--primary">
                <div>{{ tipo.description }}</div>
                <div>{{ tipo.is_required }} es tutoria obligatoria</div>
                <div>Duración {{tipo.periodicity}}</div>
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
      --------->

      <!---------------------ANALIZAR ESTA PARTE----------------->
      <v-container fluid grid-list-xl>
        <v-layout wrap justify-space-around>
          <v-flex v-for="tipo in filterTipoTutoria" :key="tipo.name">
            <v-hover>
              <template v-slot:default="{ hover }">
                <v-card class="mx-auto" max-width="344">
                  <v-img src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"></v-img>

                  <v-card-text>
                    <h2 class="title primary--text">{{tipo.name}}</h2>
                    <H6>DESCRIPCION:</H6>
                    {{ tipo.description }}
                  </v-card-text>
                  <v-divider></v-divider>

                  <v-card-actions class="justify-space-around">
                    <el-tag v-show="tipo.is_required==='Si'" style="border-radius:15px;">Obligatoria</el-tag>
                    <el-tag v-show="tipo.is_required==='No'" style="border-radius:15px;">Opcional</el-tag>
                    <el-tag style="border-radius:15px;">{{tipo.periodicity}}</el-tag>
                  </v-card-actions>

                  <v-fade-transition>
                    <v-overlay v-if="hover" absolute color="#036358">
                      <v-btn @click="solicitarTutor(tipo)">
                        <i class="el-icon-search"></i>Buscar tutores
                      </v-btn>
                    </v-overlay>
                  </v-fade-transition>
                </v-card>
              </template>
            </v-hover>
          </v-flex>
        </v-layout>
      </v-container>
      <!----------------------------------------------------->
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
        s_tt: "",
      },
      dialog: false,
    };
  },
  methods: {
    listaTiposTutorias() {
      axios
        .get(
          "/student/show_tutoring_types/" + localStorage.getItem("Id_usuario")
        )
        .then((res) => {
          this.tiposTutoria = res.data.tutoring_types;
        })
        .catch((error) => console.log(error));
    },
    showMensaje(tipo) {
      this.showBox = true;
      this.tipoTutoriaInfo = tipo;
    },
    solicitarTutor(tipo) {
      localStorage.setItem("Id_Tipo_Tutoria", tipo.id);
      this.showProgram = false;
    },
  },
  computed: {
    filterTipoTutoria: function () {
      return this.tiposTutoria.filter((tipo) => {
        return tipo.name.toLowerCase().match(this.search.toLowerCase());
      });
    },
  },
  created() {
    this.listaTiposTutorias();
  },
  components: {
    tutoresxTipoTutoria: TutoresxTipoTutoria,
  },
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