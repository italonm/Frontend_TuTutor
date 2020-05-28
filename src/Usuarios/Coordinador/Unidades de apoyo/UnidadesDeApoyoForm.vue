<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <v-card-title class="cardAdd">
        <h2 class="headline">{{action + " unidad de apoyo"}}</h2>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-text-field v-model="form.name" :rules="nameValidation" label="Nombre" required></v-text-field>

            <v-text-field
              v-model="form.responsible"
              :rules="nameValidation"
              label="Responsable"
              required
            ></v-text-field>

            <v-text-field
              v-model="form.email"
              :rules="emailValidation"
              label="Correo electrónico"
              required
            ></v-text-field>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.phone_number"
                :rules="phoneValidation"
                label="Teléfono"
                :counter="9"
              ></v-text-field>
            </v-col>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="cancelar">Cancelar</v-btn>
        <v-btn color="green" @click="guardar">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { nameRules, emailRules, phoneRules } from "../../Validation";
import axios from "axios";

export default {
  props: ["form", "dialog", "action"],

  data() {
    return {
      //localDialog: this.dialog,
      //localForm: this.form,
      valid: true,
      lazy: false,
      nameValidation: nameRules,
      emailValidation: emailRules,
      phoneValidation: phoneRules
    };
  },

  methods: {
    guardar() {
      if (this.action == "Registrar una nueva") {
        this.insertar();
      } else if (this.action == "Editar") {
        this.editar();
      }
    },

    insertar() {
      this.$refs.form.validate();
      if (this.valid) {
        axios
          .post(
            "http://184.73.231.88:5000/api/coordinator/add_support_unit/",
            this.form
          )
          .then(res => {
            console.log(res);
            this.$emit("resetList");
            this.$message({ message: "Registro exitoso.", type: "success" });
            this.$emit("resetDialog");
            this.$refs.form.reset();
          })
          .catch(error => {
            console.log(error);
            this.$message.error(
              "Datos duplicados: esta unidad de apoyo ya fue registrada"
            );
          });
      } else this.$message.error("Datos incorrectos");
    },

    editar() {
      //this.newDialog = true;
      this.$refs.form.validate();
      console.log(this.form);
      if (this.valid) {
        axios
          .post(
            "http://184.73.231.88:5000/api/coordinator/update_support_unit/",
            this.form
          )
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
            this.$message.error(
              "Datos duplicados: esta unidad de apoyo ya fue registrada"
            );
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