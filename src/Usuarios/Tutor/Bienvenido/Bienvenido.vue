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
              Consulte las últimas sesiones asignadas a su horario<br>
            </div>
            </v-card-text>
            <v-card-actions>
            <v-badge
            :content="notificaciones"
            :value="notificaciones"
            color="green"
            overlap      >
              <v-btn
                text
                color="deep-purple accent-4"
                @click="mostrarNotificaciones"                
                >Ver notificaciones
              </v-btn>
            </v-badge>
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

        </v-card>
      </v-col>
    </v-row>

    <horasdisponibles
      :dialog="dialog"
      v-on:resetDialog="dialog=$event"
    ></horasdisponibles>

    <verNotificaciones
      :dialog="dialogN"
      v-on:resetDialog="dialogN=$event"
    ></verNotificaciones>

  </v-container>
</template>

<script>

import HorasDisponibles from "../Horas disponibles";
import VerNotificaciones from "../VerNotificaciones";
import axios from 'axios';

export default {
  data() {
    return {
        search: "",
        dialog: false,
        dialogN: false,
        action: "",
        notificaciones: 0,
        show: false,
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
      },

      mostrarNotificaciones(){
        this.action = "Ver notificaciones";
        this.dialogN = true;
        console.log(this.dialogN);
        this.actualizarContador();
      },

      actualizarContador(){
        console.log(localStorage.getItem("Id_usuario"));
        axios
        .get("http://184.73.231.88:5000/api/tutor/show_counter/" + "97")
        .then(res => {
          console.log(res.data);
          this.notificaciones = res.data.contador;
        })
        .catch(error => console.log(error));
      }

  },
  components: {
    horasdisponibles: HorasDisponibles,
    verNotificaciones: VerNotificaciones,
  },

  created() {
    this.actualizarContador();
  },

};
</script>