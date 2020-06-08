<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-text>
      <div>Disponibilidad del tutor</div>
      <div class="text--primary">
        Revise su disponibilidad.<br>
        Recuerde modificarlo lo antes posible.
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="deep-purple accent-4"
        @click="editar"
      >
        Editar disponibilidad
      </v-btn>
    </v-card-actions>

    <horasdisponibles
      :dialog="dialog"
      v-on:resetDialog="dialog=$event"
    ></horasdisponibles>

  </v-card>
</template>

<script>

import HorasDisponibles from "./Tutor/Horas disponibles"

export default {
  data() {
    return {
        search: "",
        dialog: false,
        action: ""
    }
  },
  methods: {
      editar() {
        this.action = "Editar disponibilidad";
        this.dialog = true;
      }
  },
  components: {
    horasdisponibles: HorasDisponibles
  }
};
</script>