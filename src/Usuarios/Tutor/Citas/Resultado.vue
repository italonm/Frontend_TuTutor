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
                <v-progress-linear
                height="10"
                value="10"
                striped
                color="green"
                ></v-progress-linear>
                <v-data-table
                :footer-props="{'items-per-page-options': [5, 10, 15, -1],
                                'items-per-page-text': 'Registros por página:',
                                'items-per-page-all-text': 'Listar todos'}"
                :headers="headers"
                :items="listaAlumnos"
                :search="search"
                :items-per-page="5"
                :sort-by="['date']"
                item-key="id"
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
        <v-btn color="green" >Guardar</v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script>
import axios from "axios";
export default {
  props: ["listaAlumnos", "dialog", "action"],

  data() {
    return {
      localDialog: this.dialog,
      localCita: this.cita,
      headers: [
        { text: "Nombres", value: "nombre" },
        { text: "Apellidos", value: "apellidos" }
      ],
      search: "",
      valid: true,
      lazy: false,
    };
  },
  methods:{
      listar() {
        axios
          .get("/tutor/show_all_students_in_session/"+ this.cita.id_session)
          .then(res => {
            this.listaAlumnos = res.data.data;
          })
          .catch(error => console.log(error));
      },
      cancelar() {
      console.log(this.newDialog);
      this.newDialog = false;
      this.$emit("resetDialog", this.newDialog);
    },
  }
}
</script>