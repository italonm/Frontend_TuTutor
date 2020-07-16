<template>
  <el-container direction="vertical">
    <!-- Titulo-->
    <el-row>
      <el-col :span="8">
        <div class="grid-content">
          <h1 style="text-align: center;">
            <i class="fas fa-users"></i>&nbsp;Coordinadores
          </h1>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <el-input placeholder="Buscar coordinador" v-model="search" clearable>
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
                <v-list-item-title>Registrar coordinador</v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item @click="dialogMasivo = true;" dark>
                <v-list-item-title>Registrar masivamente</v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
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
      :items="coordinadores"
      :search="search"
      :items-per-page="5"
      :sort-by="['person_code']"
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
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          @click="eliminar(item)"
          v-if="item.program_name === '-'"
        ></el-button>
      </template>
    </v-data-table>

    <!--Formulario-->
    <coordinadorForm
      :form="form"
      :dialog="dialog"
      :action="action"
      v-on:resetDialog="dialog=false"
      v-on:resetList="listar()"
    ></coordinadorForm>
    <coordinadorMasivoForm
      :dialogMasivo="dialogMasivo"
      v-on:resetDialog="dialogMasivo=false"
      v-on:resetList="listar()"
    ></coordinadorMasivoForm>
  </el-container>
</template>

<script>
import axios from "axios";
import CoordinadorForm from "./CoordinadorForm";
import CoordinadorMasivoForm from "./MasivoCoordinadorForm";
export default {
  data() {
    return {
      coordinadores: [],
      headers: [
        { text: "Código", value: "person_code" },
        { text: "Nombre", value: "person_full_name" },
        { text: "Programa", value: "program_name" },
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
        institution_id: localStorage.getItem("Id_institución")
      },
      search: "",
      dialog: false,
      dialogMasivo: false,
      action: ""
    };
  },

  created() {
    this.listar();
  },

  methods: {
    listar() {
      var Id_institución = localStorage.getItem("Id_institución");
      axios
        .get("/admin/show_coordinators/" + Id_institución)
        .then(res => {
          this.coordinadores = res.data.users;
        })
        .catch(error => console.log(error));
    },

    insertar() {
      this.action = "Registrar coordinador";
      this.dialog = true;
    },

    editar(item) {
      this.action = "Editar coordinador";
      this.form = Object.assign({}, item);
      this.dialog = true;
    },

    eliminar(item) {
      this.$confirm(
        "¿Está seguro de eliminar: " + item.person_name + "?",
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
    coordinadorForm: CoordinadorForm,
    coordinadorMasivoForm: CoordinadorMasivoForm
  }
};
</script>