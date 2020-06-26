<template>
  <v-dialog v-model="dialog" persistent max-width="750px">
      <v-card>
      <v-card-title class="cardAdd">
        <h2 class="headline">{{ action }}</h2>
      </v-card-title>
      <v-card-text>
        <v-container>
                <v-card-title>
                Asistencia
                </v-card-title>
                <v-data-table
                v-model="resultado.asistencia"
                :footer-props="{'items-per-page-options': [5, 10, 15, -1],
                                'items-per-page-text': 'Registros por página:',
                                'items-per-page-all-text': 'Listar todos'}"
                :headers="headers"
                :items="listaAlumnos"
                :items-per-page="5"
                item-key="codigo"
                show-select
                multi-sort
                class="elevation-1"
                loading-text="Cargando.."
                height="200px"
                fixed-header
                ></v-data-table>
                <v-card-title>
                Comentario de la cita
                </v-card-title>
                <v-container class="grey lighten-5">
                    <v-textarea
                    v-model="resultado.comentario"
                    counter
                    full-width
                    single-line
                    height="90px"
                    ></v-textarea>
                </v-container>

        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="cancelar">Cerrar</v-btn>
        <v-btn color="green" @click="guardar">Guardar</v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script>
import axios from "axios";
export default {
  props: ["resultado","idSesion","listaAlumnos", "dialog", "action"],

  data() {
    return {
      localDialog: this.dialog,
      localCita: this.cita,
      headers: [
        { text: "Nombres", value: "nombre" },
        { text: "Apellidos", value: "apellidos" }
      ],
      valid: true,
      lazy: false,
      datosResultado:{
        idsesion:"",
        resultado:"",
        alumnos:[]
      },
      editarResultado:{
        idsesion:"",
        resultado:""
      }
    };
  },
  methods:{
      guardar() {
        if (this.action == "Crear resultado de la cita") {
          this.insertar();
        } else if (this.action ==  "Editar resultado de la cita") {
          this.editar();
        }
      },
      listar() {
        axios
          .get("/tutor/show_all_students_in_session/"+ this.cita.id_session)
          .then(res => {
            this.listaAlumnos = res.data.data;
          })
          .catch(error => console.log(error));
      },
      cancelar() {
      this.newDialog = false;
      this.$emit("resetDialog", this.newDialog);
      },
      insertar(){
        this.datosResultado.idsesion = this.idSesion;
        this.datosResultado.resultado = this.resultado.comentario;
        this.datosResultado.alumnos = this.resultado.asistencia;
        console.log(this.datosResultado);
        axios
        .post(
          "http://184.73.231.88:7002/api/tutor/register_result_and_assistance/",this.datosResultado)
        .then(res => {
            this.$message({ message: "Registro exitoso.", type: "success" });
            console.log(res);
            this.newDialog = false;
            this.$emit("resetDialog", this.newDialog);
         })
         .catch(error => {
            console.log(error);
            this.$message.error("No se pudo registrar");
          });
      },
      editar(){
        this.editarResultado.idsesion = this.idSesion;
        this.editarResultado.resultado = this.resultado.comentario;
        console.log(this.editarResultado);
        axios
        .post(
          "http://184.73.231.88:7002/api/tutor/edit_result/",this.editarResultado)
        .then(res => {
            this.$message({ message: "Modificación exitoso.", type: "success" });
            console.log(res);
            this.newDialog = false;
            this.$emit("resetDialog", this.newDialog);
         })
         .catch(error => {
            console.log(error);
            this.$message.error("No se pudo editar");
          });
    }
  }
}
</script>