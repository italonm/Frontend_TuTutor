<template>
  <el-container direction="vertical">
    <!-- Titulo-->
    <el-row>
      <el-col :span="8">
        <div class="grid-content">
          <h1 style="text-align: center;">
            <i class="fas fa-envelope-open-text"></i>&nbsp;Solicitudes de asignación
          </h1>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <el-input placeholder="Buscar solicitud" v-model="search" clearable>
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <el-button type="success" @click="aceptarSol()" class="buttonAdd">&nbsp;Aceptar</el-button>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content">
          <el-button type="danger" @click="rechazarSol()" class="buttonAdd">&nbsp;Rechazar</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- Tabla-->
    <v-data-table
      v-model="selected"
      :footer-props="{'items-per-page-options': [5, 10, 15, -1],
                      'items-per-page-text': 'Registros por página:',
                      'items-per-page-all-text': 'Listar todos'}"
      :headers="headers"
      :items="solicitudes"
      :search="search"
      :items-per-page="5"
      :sort-by="['date']"
      item-key="id"
      show-select
      multi-sort
      class="elevation-1"
      loading-text="Cargando.."
      height="288px"
      fixed-header
    ></v-data-table>

    <!-- Confirmación o rechazo-->
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="650">
        <v-card>
          <v-card-title class="headline">
            {{
            "¿Está seguro que desea " + action + " la(s) solicitud(es)?" }}
          </v-card-title>
          <v-card-text>Esta acción no se podrá revertir</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="cancelar">cancelar</v-btn>
            <v-btn color="green darken-1" text @click="guardar">{{ action }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      solicitudes: [],
      selected: [],
      headers: [
        { text: "Fecha", value: "date" },
        { text: "Tipo de tutoría", value: "tipotutoria" },
        { text: "Tutor", value: "tutor" },
        { text: "Alumno", value: "alumno" },
        { text: "Estado", value: "estado" }
      ],
      search: "",
      dialog: false,
      action: ""
    };
  },

  created() {
    axios;
    this.listar();
  },

  methods: {
    
    listar() {      
      console.log(localStorage.getItem("Id_usuario"));
      axios
        .get( "http://184.73.231.88:5000/api/tutor/show_assignment_requests/" + localStorage.getItem("Id_usuario") )
        .then(res => {
          console.log(res.data);
          this.solicitudes = res.data.tableData;
        })
        .catch(error => console.log(error));
    },
    aceptarSol() {
      if (this.selected.length > 0) {
        this.action = "aceptar";
        this.dialog = true;
      } else {
        this.$message({
          message: "Seleccione una solicitud",
          type: "info"
        });
      }
    },

    rechazarSol() {
      if (this.selected.length > 0) {
        this.action = "rechazar";
        this.dialog = true;
      } else {
        this.$message({
          message: "Seleccione una solicitud",
          type: "info"
        });
      }
    },

    guardar() {
      if (this.action == "aceptar") {
        this.aceptar();
      } else if (this.action == "rechazar") {
        this.rechazar();
      }
    },

    cancelar() {
      this.dialog = false;
      this.$emit("resetDialog");
      //this.$refs.dialog.reset();
      this.listar();
    },

    aceptar() {
      console.log(this.selected);
      axios
        .post( "http://184.73.231.88:5000/api/tutor/accept_list_assignment_requests/",
            { obj_list: this.selected } )
        .then(res => {
          console.log(res);
          this.listar();
          this.dialog = false;
          this.$message({
            message: "Aceptación exitosa",
            type: "success"
          });
        });
    },

    rechazar() {
      console.log(this.selected);
      axios
        .post("http://184.73.231.88:5000/api/tutor/reject_list_assignment_requests/",
            { obj_list: this.selected } )
        .then(res => {
          console.log(res);
          this.listar();
          this.dialog = false;
          this.$message({
            message: "Rechazo exitoso",
            type: "success"
          });
        });
    }
  }
};
</script>