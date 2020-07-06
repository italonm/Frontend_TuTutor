<template>
  <el-container direction="vertical">
    <!-- Titulo-->
    <el-row>
      <el-col :span="8">
        <div class="grid-content">
          <h1 style="text-align: center;">
            <i class="fas fa-users"></i>&nbsp;Alumnos
          </h1>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <el-input placeholder="Buscar alumno" v-model="search" clearable>
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="text-center">
          <v-menu open-on-hover bottom offset-y transition="slide-x-transition">
            <template v-slot:activator="{ on: menu, attrs }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on: tooltip }">
                  <v-btn
                    color="success"
                    dark
                    v-bind="attrs"
                    v-on="{ ...tooltip, ...menu }"
                  >Registrar</v-btn>
                </template>
                <span>Registro desplegable</span>
              </v-tooltip>
            </template>
            <v-list color="success">
              <v-list-item @click="insertar" dark>
                <v-list-item-title>Registrar alumno</v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item @click="dialog2 = true;" dark>
                <v-list-item-title>Registrar masivamente</v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item @click="dialogGraduados = true;" dark>
                <v-list-item-title>Registrar graduados</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
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
      :items="alumnos"
      :search="search"
      :items-per-page="5"
      :sort-by="['code']"
      multi-sort
      class="elevation-3"
      loading-text="Cargando.."
      height="288px"
      fixed-header
    >
      <template v-slot:item.editar="{ item }">
        <el-button type="info" icon="el-icon-edit" circle @click="editar(item)"></el-button>
      </template>
      <template v-slot:item.eliminar="{ item }">
        <el-button type="danger" icon="el-icon-delete" circle @click="eliminar(item)"></el-button>
      </template>
    </v-data-table>

    <!--Formulario-->
    <alumnoForm
      :form="form"
      :dialog="dialog"
      :action="action"
      v-on:resetDialog="dialog=$event"
      v-on:resetList="listar()"
    ></alumnoForm>

    <!---Formulario Masivo-->
    <alumnoMasivoForm :dialog2="dialog2" v-on:resetDialog="dialog2=$event"></alumnoMasivoForm>
    <graduadosForm :dialogGraduados="dialogGraduados" v-on:resetDialog="dialogGraduados=$event"></graduadosForm>
  </el-container>
</template>

<script>
import axios from "axios";
import AlumnoForm from "./AlumnoForm";
import AlumnoMasivoForm from "./MasivoAlumnoForm";
import GraduadosForm from "./GraduadosForm";
export default {
  data() {
    return {
      alumnos: [],
      headers: [
        { text: "Código", value: "person_code" },
        { text: "Nombre", value: "person_full_name" },
        { text: "Teléfono", value: "person_phone_number" },
        { text: "Correo", value: "person_email" },
        { text: "Editar", value: "editar", sortable: false },
        { text: "Eliminar", value: "eliminar", sortable: false }
      ],
      form: {
        person_name: "",
        person_last_name: "",
        person_email: "",
        person_phone_number: "",
        person_code: "",
        person_id: "",
        program_id: localStorage.getItem("Id_facultad"),
        person_scores: null
      },

      search: "",
      dialog: false,
      dialog2: false,
      dialogGraduados: false,
      action: ""
    };
  },

  created() {
    this.listar();
  },

  methods: {
    listar() {
      console.log(localStorage.getItem("Id_facultad"));
      axios
        .get(
          "/coordinator/show_students/" + localStorage.getItem("Id_facultad")
        )
        .then(res => {
          this.alumnos = res.data.users;
        })
        .catch(error => console.log(error));
    },

    insertar() {
      this.action = "Registrar alumno";
      this.dialog = true;
    },

    editar(item) {
      this.action = "Editar alumno";
      this.form = Object.assign({}, item);

      this.dialog = true;
    },

    eliminar(item) {
      this.$confirm(
        "Esta seguro de eliminar: " + item.name + "?",
        "Advertencia",
        {
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
          type: "warning"
        }
      )
        .then(() => {
          //servicio
          console.log(item.person_id);
          console.log(item);
          axios
            .post("/user/delete_person/", { person_id: item.person_id })
            .then(res => {
              console.log(res);
              this.listar();
            })
            .catch(error => console.log(error));
          this.$emit("resetList");
          this.$message({ type: "success", message: "Registro eliminado" });
        })
        .catch(() => {
          this.$message({ type: "info", message: "Eliminación cancelada" });
        });
    }
  },

  components: {
    alumnoForm: AlumnoForm,
    alumnoMasivoForm: AlumnoMasivoForm,
    graduadosForm: GraduadosForm
  }
};
</script>