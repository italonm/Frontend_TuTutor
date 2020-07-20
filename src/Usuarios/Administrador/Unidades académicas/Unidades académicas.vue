<template>
  <el-container direction="vertical">
    <el-row :gutter="20">
      <!--Unidades académicas-->
      <el-col :md="24" :lg="24">
        <el-row>
          <div class="grid-content">
            <h1 style="text-align: center;">
              <i class="fas fa-university"></i>&nbsp;Unidades Académicas
            </h1>
          </div>
        </el-row>
        <el-row type="flex" :gutter="20" justify="space-around">
          <el-col :span="4">
            <div class="grid-content"></div>
          </el-col>
          <el-col :span="16">
            <el-input placeholder="Buscar unidad académica" v-model="searchUnidad" clearable>
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-col>
          <el-col :span="4">
            <div class="grid-content">
              <el-button type="success" icon="el-icon-plus" circle @click="dialogUnidad = true"></el-button>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-bottom:30px;">
          <!-- Tabla unidades-->
          <el-col>
            <v-data-table
              :footer-props="footerProps"
              :headers="headersUnidades"
              :items="unidades"
              :search="searchUnidad"
              :items-per-page="5"
              multi-sort
              class="elevation-3"
              loading-text="Cargando.."
              height="288px"
              fixed-header
            >
              <template v-slot:item.watch="{ item }">
                <el-button type="info" icon="fas fa-school" circle @click="listarProgramaAux(item)"></el-button>
              </template>
              <template v-slot:item.faculty_required_tutorship="{ item }">
                <i v-if="item.faculty_required_tutorship == true" class="el-icon-check"></i>
                <i v-if="item.faculty_required_tutorship == false" class="el-icon-close"></i>
              </template>
              <template v-slot:item.faculty_unique_faculty="{ item }">
                <i v-if="item.faculty_unique_faculty == true" class="el-icon-check"></i>
                <i v-if="item.faculty_unique_faculty == false" class="el-icon-close"></i>
              </template>
              <template v-slot:item.add="{ item }">
                <el-button
                  v-if="item.faculty_unique_faculty == false"
                  type="success"
                  icon="el-icon-plus"
                  circle
                  @click="insertarPrograma(item)"
                ></el-button>
              </template>
              <template v-slot:item.edit="{ item }">
                <el-button type="info" icon="el-icon-edit" circle @click="editarUnidad(item)"></el-button>
              </template>
            </v-data-table>
          </el-col>
        </el-row>
      </el-col>

      <!--Programas-->
      <el-col :md="24" :lg="24">
        <el-row>
          <div class="grid-content">
            <h1 style="text-align: center;">
              <i class="fas fa-school"></i>
              &nbsp;Programas {{ this.faculty_name }}
            </h1>
          </div>
        </el-row>
        <el-row type="flex" :gutter="20" justify="space-around">
          <el-col :span="4">
            <div class="grid-content"></div>
          </el-col>
          <el-col :span="16">
            <el-input placeholder="Buscar programa" v-model="searchPrograma" clearable>
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-col>
          <el-col :span="4">
            <div class="grid-content"></div>
          </el-col>
        </el-row>
        <el-row>
          <!-- Tabla programas-->
          <el-col :span="24">
            <v-data-table
              :footer-props="footerProps"
              :headers="headersProgramas"
              :items="programas"
              :search="searchPrograma"
              :items-per-page="5"
              multi-sort
              class="elevation-3"
              height="288px"
              fixed-header
            >
              <template slot="no-data">
                <label>Seleccione una unidad académica</label>
              </template>
              <template v-slot:item.edit="{ item }">
                <el-button type="info" icon="el-icon-edit" circle @click="editarPrograma(item)"></el-button>
              </template>
            </v-data-table>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <!--Formularios-->
    <unidadForm
      :dialog="dialogUnidad"
      :coordinadores="coordinadores"
      v-on:resetDialog="dialogUnidad = false"
      v-on:resetList="listarUnidades()"
      v-on:resetCoordinadores="listarCoordinadores()"
    ></unidadForm>

    <programaForm
      :faculty_id="faculty_id"
      :dialog="dialogPrograma"
      :coordinadores="coordinadores"
      v-on:resetDialog="dialogPrograma = false"
      v-on:resetList="listarProgramas()"
      v-on:resetCoordinadores="listarCoordinadores()"
    ></programaForm>

    <unidadEditarForm
      :unidad="unidad"
      :dialog="dialogUnidadEditar"
      v-on:resetDialog="dialogUnidadEditar = false"
      v-on:resetList="listarUnidades()"
    ></unidadEditarForm>

    <programaEditarForm
      :programa="programa"
      :dialog="dialogProgramaEditar"
      v-on:resetDialog="dialogProgramaEditar = false"
      v-on:resetList="listarProgramas()"
    ></programaEditarForm>
  </el-container>
</template>

<script>
import axios from "axios";
import UnidadForm from "./UnidadAcadémicaForm";
import UnidadEditarForm from "./UnidadAcadémicaEditarForm";
import ProgramaForm from "./ProgramaForm";
import ProgramaEditarForm from "./ProgramaEditarForm";

export default {
  data() {
    return {
      //Unidades
      unidades: [],
      headersUnidades: [
        { text: "Nombre", value: "faculty_name" },
        {
          text: "Tutoría fija",
          value: "faculty_required_tutorship",
          sortable: false
        },
        {
          text: "Unidad única",
          value: "faculty_unique_faculty",
          sortable: false
        },
        { text: "Programas", value: "watch", sortable: false },
        { text: "Agregar", value: "add", sortable: false },
        { text: "Editar", value: "edit", sortable: false }
      ],

      //Programas
      programas: [],
      headersProgramas: [
        { text: "Nombre", value: "program_name" },
        { text: "Coordinador", value: "coordinator_full_name" },
        { text: "Contacto", value: "coordinator_email" },
        { text: "Editar", value: "edit", sortable: false }
      ],

      searchUnidad: "",
      searchPrograma: "",
      dialogUnidad: false,
      dialogPrograma: false,
      dialogUnidadEditar: false,
      dialogProgramaEditar: false,
      faculty_id: 1,
      faculty_name: "",
      coordinadores: [],
      unidad: {
        idfaculty: "",
        namefaculty: ""
      },
      programa: {
        idprogram: "",
        nameprogram: ""
      },
      footerProps: {
        "items-per-page-options": [5, 10, 15, -1],
        "items-per-page-text": "Registros por página:",
        "items-per-page-all-text": "Listar todos"
      }
    };
  },

  created() {
    this.listarUnidades();
    this.listarCoordinadores();
  },

  methods: {
    listarUnidades() {
      var Id_institución = localStorage.getItem("Id_institución");
      axios
        .get("/admin/show_faculties/" + Id_institución)
        .then(res => {
          this.unidades = res.data.faculties;
        })
        .catch(error => console.log(error));
    },

    listarProgramaAux(item) {
      this.faculty_id = item.faculty_id;
      this.faculty_name = item.faculty_name;
      this.listarProgramas();
    },

    listarProgramas() {
      axios
        .get("/admin/show_programs/" + this.faculty_id)
        .then(res => {
          this.programas = res.data.programs;
          console.log(this.programas);
        })
        .catch(error => console.log(error));
    },

    listarCoordinadores() {
      var Id_institución = localStorage.getItem("Id_institución");
      axios
        .get("/admin/show_coordinators_available/" + Id_institución)
        .then(res => {
          this.coordinadores = res.data.users;
        })
        .catch(error => console.log(error));
    },

    insertarPrograma(item) {
      this.faculty_id = item.faculty_id;
      this.dialogPrograma = true;
    },

    editarUnidad(item) {
      this.unidad.idfaculty = item.faculty_id;
      this.unidad.namefaculty = item.faculty_name;
      this.dialogUnidadEditar = true;
    },

    editarPrograma(item) {
      this.programa.idprogram = item.program_id;
      this.programa.nameprogram = item.program_name;
      this.dialogProgramaEditar = true;
    }
  },

  components: {
    unidadForm: UnidadForm,
    programaForm: ProgramaForm,
    unidadEditarForm: UnidadEditarForm,
    programaEditarForm: ProgramaEditarForm
  }
};
</script>