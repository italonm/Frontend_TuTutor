<template>
  <v-container class="grey lighten-5">
    <v-row align="center" justify="center">
      <v-img
        src="https://i.ibb.co/0hpkmC3/logo-Tu-Tutur.png"
        contain
        aspect-ratio="1"
        height="125"
        class="grey lighten-2"
        max-width="400"
        max-height="400"
      >
     </v-img>
    </v-row>
    <br><br>
    <div class="font-weight-black subtitle-2 text-center">
    <h4>¡Bienvenido! </h4>
    <div id="nombreUsuario" style="font-size:20px; font-weight:500; color:#000000"></div>
    </div>
    <br><br>
    <v-row no-gutters>
      <v-col>
        <v-card
          class="mx-auto"
          max-width="344"
          >
            <v-card-text>
            <p class="font-weight-black subtitle-2 text-center">Notificaciones</p>
            <div class="text--primary">
              Aqui se mostrarán las notificaciones<br>
            </div>
            </v-card-text>
            <v-card-actions>
            <v-btn
              text
              color="deep-purple accent-4"
            >
              Ver notificaciones
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col order="1">
        <v-card
          class="mx-auto"
          max-width="344"
          >
            <v-card-text>
                <p class="font-weight-black subtitle-2 text-center">Citas programadas</p>
              <div class="text--primary">
                Aqui se mostrarán las citas programadas<br>
              </div>
            </v-card-text>
            <v-card-actions>
            <v-btn
              text
              color="deep-purple accent-4"
            >
              Ver citas programadas
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col order="2">
        <v-card
          class="mx-auto"
          max-width="344"
        >
          <v-card-text>
            <p class="font-weight-black subtitle-2 text-center">Disponibilidad del tutor</p>
            <div class="text--primary">
              Edite su disponibilidad para realizar tutorías. Recuerde modificarlo lo antes posible.
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import HorasDisponibles from "../Horas disponibles"

export default {
  data() {
    return {
        search: "",
        dialog: false,
        action: ""
    }
  },
  mounted() {
    document.getElementById("nombreUsuario").innerHTML = 
    JSON.parse(localStorage.getItem("Nombre")) + " " +
      JSON.parse(localStorage.getItem("Apellidos"));  
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