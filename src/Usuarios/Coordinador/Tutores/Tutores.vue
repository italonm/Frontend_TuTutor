<template>
  <el-container direction="vertical">
    <!-- Titulo-->
    <el-row>
      <el-col :span="8">
        <div class="grid-content">
          <h1 style="text-align: center;">
            <i class="fas fa-users"></i>&nbsp;Tutores
          </h1>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <el-input placeholder="Buscar usuario" v-model="search" clearable>
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
                <v-list-item-title>Registrar tutor</v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item @click="dialogMasivo = true;" dark>
                <v-list-item-title>Registrar masivamente</v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item @click="dialogTutoriasForm = true;" dark>
                <v-list-item-title>Registrar Tutorías</v-list-item-title>
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
      :items="tutores"
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

    <!--Formularios-->
    <tutorForm
      :form="form"
      :dialogForm="dialogForm"
      :action="action"
      v-on:resetDialog="dialogForm=false"
      v-on:resetList="listar()"
    ></tutorForm>
    <tutorMasivoForm
      :dialogMasivo="dialogMasivo"
      v-on:resetDialog="dialogMasivo=false"
      v-on:resetList="listar()"
    ></tutorMasivoForm>
    <masivoTutoriasForm
      :dialogTutoriasForm="dialogTutoriasForm"
      v-on:resetDialog="dialogTutoriasForm=false"
    ></masivoTutoriasForm>
  </el-container>
</template>

<script>
import axios from "axios";
import TutorForm from "./TutorForm";
import TutorMasivoForm from "./MasivoTutorForm";
import MasivoTutoriasForm from "./MasivoTutoriasForm";
export default {
  data() {
    return {
      tutores: [],
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
        program_id: localStorage.getItem("Id_facultad")
      },
      search: "",
      dialogForm: false,
      dialogMasivo: false,
      dialogTutoriasForm: false,
      action: ""
    };
  },

  created() {
    this.listar();
  },

  methods: {
    listar() {
      var Id_facultad = localStorage.getItem("Id_facultad");
      axios
        .get("/coordinator/show_tutors/" + Id_facultad)
        .then(res => {
          this.tutores = res.data.users;
        })
        .catch(error => console.log(error));
    },

    insertar() {
      this.action = "Registrar tutor";
      this.dialogForm = true;
    },

    editar(item) {
      this.action = "Editar tutor";
      this.form = Object.assign({}, item);
      this.dialogForm = true;
    },

    eliminar(item) {
      this.$confirm(
        "Está seguro de eliminar: " + item.person_name + "?",//MODIFICACION DE ERROR PROFE
        "Advertencia",
        {
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
          type: "warning"
        }
      )
        .then(() => {
          axios
            .post("/user/delete_person/", { person_id: item.person_id })
            .then(res => {
              console.log(res);
              this.listar();
            })
            .catch(error => console.log(error));
          this.$message({ type: "success", message: "Registro eliminado" });
        })
        .catch(() => {
          this.$message({ type: "info", message: "Eliminación cancelada" });
        });
    }
  },

  components: {
    tutorForm: TutorForm,
    tutorMasivoForm: TutorMasivoForm,
    masivoTutoriasForm: MasivoTutoriasForm
  }
};
</script>