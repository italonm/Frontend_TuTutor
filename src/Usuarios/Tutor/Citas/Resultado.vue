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
                height="200px"
                fixed-header
                ></v-data-table>
                <v-card-title>
                Comentario de la cita
                </v-card-title>
                <v-container class="grey lighten-5">
                    <v-textarea
                    v-model="title"
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

export default {
  props: ["listaCitas", "dialog", "action"],

  data() {
    return {
      localDialog: this.dialog,
      localListaCitas: this.listaCitas,
      valid: true,
      lazy: false,
    };
  },
  methods:{
      cancelar() {
          console.log(this.newDialog);
      this.newDialog = false;
      this.$emit("resetDialog", this.newDialog);
    },
  }
}
</script>