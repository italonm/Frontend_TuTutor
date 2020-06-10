<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-card>
      <v-card-title class="cardAdd">
        <h2 class="headline">{{action}}</h2>
      </v-card-title>
      <v-card-text>
        <v-container>            
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-card-title>Asistencia</v-card-title>            
            <v-card-title>
              Resultados de la sesión 
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
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="cancelar">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { nameRules, emailRules, codeRules, phoneRules } from "../../Validation";
import axios from "axios";

export default {
  props: ["form", "dialog", "action"],

  data() {
    return {
      valid: true,
      lazy: false,
      nameValidation: nameRules,
      emailValidation: emailRules,
      codeValidation: codeRules,
      phoneValidation: phoneRules
    };
  },

  methods: {
    guardar() {
      if (this.action == "Registrar coordinador") this.insertar();
      else if (this.action == "Editar coordinador") this.editar();
    },

    insertar() {
      this.$refs.form.validate();
      if (this.valid) {
        axios
          .post("/admin/add_coordinator/", this.form)
          .then(res => {
            console.log(res);
            this.$emit("resetList");
            this.$message({ message: "Registro exitoso.", type: "success" });
            this.$emit("resetDialog");
            this.$refs.form.reset();
          })
          .catch(error => {
            console.log(error);
            this.$message.error("Datos duplicados");
          });
      } else this.$message.error("Datos incorrectos");
    },

    cancelar() {
      this.$refs.form.reset();
      this.$emit("resetDialog");
    }
  }
};
</script>