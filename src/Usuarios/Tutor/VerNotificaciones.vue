<template>
<v-dialog v-model="dialog" persistent max-width="700px" max-height="500" color="color">
      
      <v-card max-width="700" class="mx-auto" >
        <v-card-title class="cardAdd justify-center">
            Notificaciones
        </v-card-title>

        <v-list :three-line="threeLine">
        <v-list-item-group 
            style="pointer-events:none"
            color = "blue"
            v-model="selected"
            multiple
            active-class="blue--text"
        >
            <template v-for="(notificacion, index) in noleidas">
            <v-list-item :key="notificacion.id">
                <v-list-item-content style="color: blue">
                    <v-list-item-title v-text="notificacion.asunto"></v-list-item-title>
                    <v-list-item-subtitle class="text--primary" v-text="notificacion.fecha"></v-list-item-subtitle>
                    <v-list-item-subtitle v-text="notificacion.lugar"></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                    <h5 color="blue" >
                    {{"Sin leer"}}
                    </h5>                    
                </v-list-item-action>

            </v-list-item>

            <v-divider
                v-if="index + 1 < noleidas.length"
                :key="index"
            ></v-divider>
            </template>
        </v-list-item-group> 
        </v-list>

        <v-list :three-line="threeLine">
        <v-list-item-group 
            style="pointer-events:none"
            multiple
        >
            <template v-for="(notificacion, index) in leidas">
            <v-list-item :key="notificacion.id">              

              <v-list-item-content style="color: gray">
                  <v-list-item-title v-text="notificacion.asunto"></v-list-item-title>
                  <v-list-item-subtitle class="text--primary" v-text="notificacion.fecha"></v-list-item-subtitle>
                  <v-list-item-subtitle v-text="notificacion.lugar"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>                  
                  <h5 color="grey" >
                  {{"Leído"}}
                  </h5>
              </v-list-item-action>
            </v-list-item>

            <v-divider
                v-if="index + 1 < leidas.length"
                :key="index"
            ></v-divider>

            </template>
        </v-list-item-group>
        </v-list>    

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" @click="aceptar">Aceptar</v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
  props: ["dialog"],

  data() {
    return {

      selected: [],
      notificacion: 0,
      noleidas: [],
      leidas: [],
      notificaciones: [],
      lazy: false,
      disabled: false,
      dense: false,
      twoLine: false,
      threeLine: true,
      shaped: false,
      flat: false,
      subheader: false,
      inactive: false,
      subGroup: false,
      nav: true,
      avatar: false,
      rounded: true,
    };
  },

  methods: {
   listar() { 
       axios
      .get("http://184.73.231.88:5000/api/tutor/show_notifications/" + localStorage.getItem("Id_usuario"))
      .then(res => {
        console.log(res.data);
        this.notificaciones = res.data.notificaciones;
        console.log(this.noleidas);
        this.noleidas = res.data.notificaciones.filter(notificacion => notificacion.estado == "No leido");
        this.leidas = res.data.notificaciones.filter(notificacion => notificacion.estado == "Leido");
        this.selected = [];
        for (var i = 0; i < this.noleidas.length; i++) {
          this.selected.push(i);
        }
        console.log(this.selected);
      })
      .catch(error => console.log(error));
    },
    aceptar() {
      this.newDialog = false;
      this.$emit("resetDialog", this.newDialog);
      this.listar();
      },
  },

  created() {
    this.listar();
  },
};

</script>

<style lang="scss">
hr{
  margin-top: 0% !important;
  margin-bottom: 0% !important;
}
</style>