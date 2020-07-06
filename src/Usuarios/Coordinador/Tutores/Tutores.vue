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
              <v-list-item @click="dialog2 = true;" dark>
                <v-list-item-title>Registrar masivamente</v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item @click="dialogGraduados = true;" dark>
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

    <!--Formulario-->
    <tutorForm
      :form="form"
      :dialog="dialog"
      :action="action"
      v-on:resetDialog="dialog=$event"
      v-on:resetList="listar()"
    ></tutorForm>

    <!---Formulario Masivo-->
    <tutorMasivoForm :dialog2="dialog2" v-on:resetDialog="dialog2=$event"></tutorMasivoForm>
  </el-container>
</template>

<script>
import axios from "axios";
import TutorForm from "./TutorForm";
import TutorMasivoForm from "./MasivoTutorForm";
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
      dialog: false,
      dialog2: false,
      action: ""
    };
  },

  created() {
    this.listar();
  },

  methods: {
    listar() {
      axios
        .get("/coordinator/show_tutors/" + localStorage.getItem("Id_facultad"))
        .then(res => {
          this.tutores = res.data.users;
        })
        .catch(error => console.log(error));
    },

    insertar() {
      this.action = "Registrar tutor";
      this.dialog = true;
    },

    editar(item) {
      this.action = "Editar tutor";
      this.form = Object.assign({}, item);
      this.dialog = true;
    },

    agregarMasivamente() {
      console.log("this is the masivamente");
      this.dialog2 = true;
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
          console.log(item.person_id);
          console.log(item);
          //servicio
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
    tutorForm: TutorForm,
    tutorMasivoForm: TutorMasivoForm
  }
};
</script>