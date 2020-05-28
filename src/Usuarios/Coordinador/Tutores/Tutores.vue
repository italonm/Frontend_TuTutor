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
  </el-container>
</template>

<script>
import axios from "axios";
import TutorForm from "./TutorForm";

export default {
  data() {
    return {
      tutores: [],
      headers: [
        { text: "Código", value: "code" },
        { text: "Nombre", value: "full_name" },
        { text: "Teléfono", value: "phone_number" },
        { text: "Correo", value: "email" },
        { text: "Editar", value: "editar", sortable: false },
        { text: "Eliminar", value: "eliminar", sortable: false }
      ],
      form: {
        person_name: "",
        person_last_name: "",
        person_email: "",
        person_phone_number: "",
        person_code: "",
        person_id:""
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
        .get("/coordinator/show_tutors/")
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
      this.rellenar(item);
      //this.form = Object.assign({}, item);
      this.dialog = true;
    },
    rellenar(item){
      this.form.person_name=item.name;
      this.form.person_last_name=item.last_name;
      this.form.person_email=item.email;
      this.form.person_phone_number=item.phone_number;
      this.form.person_code=item.code;
      this.form.person_id=item.id;
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
           axios
           .post("/user/delete_person/", {person_id:item.id})
           .then(res => console.log(res))
           .catch(error => console.log(error));
          
          this.$message({ type: "success", message: "Registro eliminado" });
          
        })
        .catch(() => {
          this.$message({ type: "info", message: "Eliminación cancelada" });
        });
    }
  },

  components: {
    tutorForm: TutorForm
  }
};
</script>