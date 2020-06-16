<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-card>
      <v-card-title>
        <h4>¿Por qué solicitar Tutoría?</h4>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col class="mx-auto">
              <v-card>
                <v-img
                  class="white--text align-end"
                  height="200px"
                  src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
                ></v-img>
              </v-card>
              <v-card-subtitle class="pb-0">Solicita una tutoria motivo1</v-card-subtitle>
            </v-col>
            <v-col class="mx-auto">
              <v-card>
                <v-img
                  class="white--text align-end"
                  height="200px"
                  src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                ></v-img>
              </v-card>
              <v-card-subtitle class="pb-0">Solicita una tutoria motivo2</v-card-subtitle>
            </v-col>
            <v-col class="mx-auto">
              <v-card>
                <v-img
                  class="white--text align-end"
                  height="200px"
                  src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
                ></v-img>
              </v-card>
              <v-card-subtitle class="pb-0">Solicita una tutoria motivo3</v-card-subtitle>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="cancelar">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialog"],

  data() {
    return {
      localDialog: this.dialog,
      localForm: this.form,
      valid: true,
      lazy: false
    };
  },

  methods: {
    funcion() {},

    insertar() {},
    cancelar() {
      this.$emit("resetDialog");
    }
  }
};
</script>