<template>
  <el-container direction="vertical">
    <!-- Titulo-->
    <el-row>
      <el-col :span="9">
        <div class="grid-content">
          <h1 style="text-align: center;">
            <i class="fas fa-university"></i>&nbsp;Unidades Académicas
          </h1>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <el-input placeholder="Buscar unidad académica" v-model="search" clearable>
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content">
          <el-button
            type="success"
            icon="fas fa-plus-circle"
            @click="insertar()"
            class="buttonAdd"
          >&nbsp;Agregar</el-button>
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
      :items="unidades"
      :search="search"
      :items-per-page="5"
      :sort-by="['faculty_required_tutorship']"
      multi-sort
      class="elevation-3"
      loading-text="Cargando.."
      height="288px"
      fixed-header
    ></v-data-table>

    <!--Formulario-->
    <coordinadorForm
      :form="form"
      :dialog="dialog"
      :action="action"
      v-on:resetDialog="dialog=false"
      v-on:resetList="listar()"
    ></coordinadorForm>
  </el-container>
</template>

<script>
import axios from "axios";
import CoordinadorForm from "./UnidadAcadémicaForm";

export default {
  data() {
    return {
      unidades: [],
      headers: [
        { text: "Nombre", value: "faculty_name" },
        { text: "Tutoría fija", value: "faculty_required_tutorship" },
        { text: "Unidad única", value: "faculty_unique_faculty" }
      ],
      form: {
        person_name: "",
        person_last_name: "",
        person_email: "",
        person_phone_number: "",
        person_code: ""
      },
      search: "",
      dialog: false,
      action: ""
    };
  },

  created() {
    this.listar();
  },

  methods: {
    listar() {
      axios
        .get("/admin/show_faculties/")
        .then(res => {
          this.unidades = res.data.faculties;
        })
        .catch(error => console.log(error));
    },

    insertar() {
      this.action = "Registrar unidad académica";
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
    coordinadorForm: CoordinadorForm
  }
};
</script>