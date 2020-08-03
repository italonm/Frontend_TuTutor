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
              <v-list-item @click="dialogMasivo = true;" dark>
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
      <template v-slot:item.notas="{ item }">
        <el-button
          v-if="item.person_scores"
          type="success"
          icon="el-icon-download"
          circle
          @click="descargarNotas(item)"
        ></el-button>
      </template>
      <template v-slot:item.eliminar="{ item }">
        <el-button type="danger" icon="el-icon-delete" circle @click="eliminar(item)"></el-button>
      </template>
    </v-data-table>

    <!--Formularios-->
    <alumnoForm
      :form="form"
      :dialogForm="dialogForm"
      :action="action"
      v-on:resetDialog="dialogForm=false"
      v-on:resetList="listar()"
    ></alumnoForm>
    <alumnoMasivoForm
      :dialogMasivo="dialogMasivo"
      v-on:resetDialog="dialogMasivo=false"
      v-on:resetList="listar()"
    ></alumnoMasivoForm>
    <graduadosForm :dialogGraduados="dialogGraduados" v-on:resetDialog="dialogGraduados=false"></graduadosForm>
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
        { text: "Notas", value: "notas", sortable: false },
        { text: "Editar", value: "editar", sortable: false },
        { text: "Eliminar", value: "eliminar", sortable: false },
      ],
      form: {
        person_name: "",
        person_last_name: "",
        person_email: "",
        person_phone_number: "",
        person_code: "",
        person_id: "",
        program_id: localStorage.getItem("Id_facultad"),
        person_scores: null,
      },
      search: "",
      dialogForm: false,
      dialogMasivo: false,
      dialogGraduados: false,
      action: "",
    };
  },

  created() {
    this.listar();
  },

  methods: {
    listar() {
      var Id_facultad = localStorage.getItem("Id_facultad");
      axios
        .get("/coordinator/show_students/" + Id_facultad)
        .then((res) => {
          this.alumnos = res.data.users;
        })
        .catch((error) => console.log(error));
    },

    insertar() {
      this.action = "Registrar alumno";
      this.dialogForm = true;
    },

    editar(item) {
      this.action = "Editar alumno";
      this.form = Object.assign({}, item);
      axios
        .get("/tutor/show_scores_from_student/" + item.person_id, {
          responseType: "blob",
        })
        .then((res) => {
          this.form.person_scores = new File(
            [res.data],
            "notas_" + item.person_code,
            {
              type: "application/pdf",
              lastModified: Date.now(),
            }
          );
          this.dialogForm = true;
        })
        .catch((error) => {
          console.log(error);
          this.dialogForm = true;
        });
    },

    descargarNotas(item) {
      axios
        .get("/tutor/show_scores_from_student/" + item.person_id, {
          responseType: "blob",
        })
        .then((res) => {
          var fileLink = document.createElement("a");
          fileLink.href = window.URL.createObjectURL(new Blob([res.data]));
          fileLink.setAttribute(
            "download",
            "notas_" + item.person_code + ".pdf"
          );
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch((error) => console.log(error));
    },

    eliminar(item) {
      this.$confirm(
        "Está seguro de eliminar: " + item.person_name + "?",
        "Advertencia",
        {
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
          type: "warning",
        }
      )
        .then(() => {
          axios
            .post("/user/delete_person/", { person_id: item.person_id })
            .catch((error) => console.log(error));
          this.listar();
          this.$message({ type: "success", message: "Registro eliminado" });
        })
        .catch(() => {
          this.$message({ type: "info", message: "Eliminación cancelada" });
        });
    },
  },

  components: {
    alumnoForm: AlumnoForm,
    alumnoMasivoForm: AlumnoMasivoForm,
    graduadosForm: GraduadosForm,
  },
};
</script>