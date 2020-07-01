<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <v-card-title class="cardAdd">
        <h2 class="headline">{{action}}</h2>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.person_name"
                  :rules="nameValidation"
                  label="Nombres"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.person_last_name"
                  :rules="nameValidation"
                  label="Apellidos"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.person_email"
                  :rules="emailValidation"
                  label="E-mail"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.person_phone_number"
                  :rules="phoneValidation"
                  label="Teléfono"
                  :counter="9"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.person_code"
                  :rules="codeValidation"
                  label="Código"
                  :counter="8"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
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

    editar() {
      this.$refs.form.validate();
      if (this.valid) {
        axios
          .post("/user/update_person/", this.form)
          .then(res => {
            console.log(res);
            this.$emit("resetList");
            this.$message({
              message: "Modificación exitosa.",
              type: "success"
            });
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