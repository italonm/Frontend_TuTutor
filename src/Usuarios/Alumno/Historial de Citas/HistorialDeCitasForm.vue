<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <v-card-title class="cardAdd">
        <h2 class="headline">{{action + " de historial de cita"}}</h2>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                         
              <v-text-field 
              v-model="form.date" 
              label="Fecha" 
              :disabled="true"
              ></v-text-field>
            
              <v-text-field
                v-model="form.tutor"
                label="Tutor"
                :disabled="true"
              ></v-text-field>            

              <v-text-field 
              v-model="form.place"
              label="Lugar"
              :disabled="true"
              ></v-text-field>              
            
              <v-text-field 
              v-model="form.reason1"
              label="Razón 1"
              :disabled="true"
              ></v-text-field>

              <v-text-field 
              v-model="form.reason2"
              label="Razón 2"
              :disabled="true"
              ></v-text-field>

          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green" @click="aceptar">Aceptar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  props: ["form", "dialog", "action"],

  data() {
    return {
      lazy: false,
    };
  },

  methods: {
    
    aceptar() {
      this.$refs.form.reset();
      this.$emit("resetDialog");
    }
  }
};
</script>