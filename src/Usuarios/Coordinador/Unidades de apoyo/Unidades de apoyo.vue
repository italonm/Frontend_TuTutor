<template>
  <el-container direction="vertical">
    <!-- Titulo-->
    <el-row>
      <el-col :span="8">
        <div class="grid-content">
          <h1 style="text-align: center;">
            <i class="fas fa-hands-helping"></i>&nbsp;Unidades de apoyo
          </h1>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <el-input placeholder="Buscar unidad de apoyo" v-model="search" clearable>
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <el-button type="success" @click="insertar()" class="buttonAdd">&nbsp;Agregar nueva unidad</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- Tabla-->
    <v-data-table
      :footer-props="{'items-per-page-options': [5, 10, 15, -1],
                      'items-per-page-text': 'Registros por página:',
                      'items-per-page-all-text': 'Listar todos'}"
      :headers="headers"
      :items="unidades"
      :search="search"
      :items-per-page="5"
      :sort-by="['name']"
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
    <unidadForm
      :form="form"
      :dialog="dialog"
      :action="action"
      v-on:resetDialog="dialog=$event"
      v-on:resetList="listar()"
    ></unidadForm>
  </el-container>
</template>

<script>
import axios from "axios";
import UnidadesForm from "./UnidadesDeApoyoForm";

export default {
  data() {
    return {
      unidades: [],
      headers: [
        { text: "Nombre", value: "name" },
        { text: "Representante", value: "responsible" },
        { text: "Correo electrónico", value: "email" },
        { text: "Número telefónico", value: "phone_number" },
        { text: " ", value: "editar", sortable: false },
        { text: " ", value: "eliminar", sortable: false },
      ],
      form: {
        id: "",
        name: "",
        email: "",
        phone_number: "",
        responsible: "",
        institution_id: localStorage.getItem("Id_institución"),
      },
      search: "",
      dialog: false,
      action: "",
    };
  },

  created() {
    this.listar();
  },

  methods: {
    listar() {
      var Id_institución = localStorage.getItem("Id_institución");
      axios
        .get("/coordinator/show_support_units/" + Id_institución)
        .then((res) => {
          this.unidades = res.data.users;
        })
        .catch((error) => console.log(error));
    },

    insertar() {
      this.action = "Registrar una nueva";
      this.dialog = true;
    },

    editar(item) {
      this.action = "Editar";
      this.form = Object.assign({}, item);
      this.dialog = true;
    },

    eliminar(item) {
      this.$confirm(
        "¿Está seguro de eliminar: " + item.name + "?",
        "Advertencia",
        {
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
          type: "warning",
        }
      )
        .then(() => {
          console.log(item);
          axios
            .post("/coordinator/delete_support_unit/", item)
            .then(() => {              
              this.listar();
            })
            .catch((error) => console.log(error));
          this.$emit("resetList");
          this.$message({ type: "success", message: "Registro eliminado" });
        })
        .catch(() => {
          this.$message({ type: "info", message: "Eliminación cancelada" });
        });
    },
  },

  components: {
    unidadForm: UnidadesForm,
  },
};
</script>