<template>
  <el-container direction="vertical">
    <!-- Titulo-->
    <el-row>
      <el-col :span="8">
        <div class="grid-content">
          <h1 style="text-align: center;">
            <i class="fas fa-book"></i>&nbsp;Tipos de tutorías
          </h1>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <el-input placeholder="Buscar tipo de tutorías" v-model="search" clearable>
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <el-button
            type="success"
            icon="fas fa-user-plus"
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
      :items="tipotutorias"
      :search="search"
      :items-per-page="5"
      :sort-by="['code']"
      multi-sort
      class="elevation-3"
      loading-text="Cargando.."
      height="300px"
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
    <tipotutoriaForm
      :signtipo="signtipo"
      :dialog="dialog"
      :action="action"
      :switches="switches"
      v-on:resetDialog="dialog=$event"
      v-on:resetList="listar()"
    ></tipotutoriaForm>
  </el-container>
</template>

<script>
import axios from "axios";
import TipoTutoriaForm from "./TipoTutoriaForm";

export default {
  data() {
    return {
      headers: [
        { text: "Nombre", value: "tt_name" },
        { text: "Descripción", value: "tt_description" },
        { text: "¿Tutor Fijo?", value: "tt_permanent" },
        { text: "Fecha Fin de la tutoría", value: "tt_end_date" },
        { text: "¿Tutoria Obligatoria?", value: "tt_isrequired" },
        {
          text: "Periodicidad de recordatorios (dias) ",
          value: "tt_periodicity",
        },
        { text: "¿Tutor Asignado?", value: "tt_assigned" },
        { text: "Editar", value: "editar", sortable: false },
        { text: "Eliminar", value: "eliminar", sortable: false },
      ],
      tipotutorias: [],
      signtipo: {
        tt_name: "",
        tt_description: "",
        tt_isrequired: "",
        tt_end_date: "",
        tt_quantity: 0,
        tt_periodicity: 0,
        tt_assigned: "",
        tt_permanent: "",
        program_id: JSON.parse(localStorage.getItem("Id_facultad")),
      },
      switches: {
        obligado: false,
        asignado: false,
        fijado: false,
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
      axios
        .get(
          "/coordinator/show_tutoring_types/" +
            localStorage.getItem("Id_facultad")
        )
        .then((res) => {
          this.tipotutorias = res.data.tutoriaData;
        })
        .catch((error) => console.log(error));
    },

    insertar() {
      this.action = "Registrar tipo de tutoría";
      this.dialog = true;
    },

    editar(item) {
      this.action = "Editar tipo de tutoría";
      this.signtipo = Object.assign({}, item);
      this.switches.obligado = this.signtipo.tt_isrequired == "Si";
      this.switches.asignado = this.signtipo.tt_assigned == "Si";
      this.switches.fijado = this.signtipo.tt_permanent == "Si";
      this.dialog = true;
    },

    eliminar(item) {
      this.$confirm(
        "¿Esta seguro de eliminar el tipo de tutoría " + item.tt_name + "?",
        "Advertencia",
        {
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
          type: "warning",
        }
      )
        .then(() => {
          axios
            .post("/coordinator/delete_tutoring_types/", item)
            .then((res) => {
              console.log(res);
              this.$message({
                type: "success",
                message: "Tipo de tutoría eliminado",
              });
              this.newDialog = false;
              this.$emit("resetDialog", this.newDialog);
              this.listar();
            })
            .catch((error) => console.log(error));
        })
        .catch(() => {
          this.$message({ type: "info", message: "Eliminación cancelada" });
        });
    },
  },

  components: {
    tipotutoriaForm: TipoTutoriaForm,
  },
};
</script>