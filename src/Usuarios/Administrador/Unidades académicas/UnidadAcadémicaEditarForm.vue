<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <v-card-title class="cardAdd">
        <h2 class="headline">Editar unidad académica</h2>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="unidad.namefaculty"
                  :rules="nameValidation"
                  label="Nombre"
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
        <v-btn color="green" @click="editar">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { nameRules } from "../../Validation";
import axios from "axios";

export default {
  props: ["dialog", "unidad"],

  data() {
    return {
      valid: true,
      lazy: false,
      nameValidation: nameRules,
      coordinadores: [],
      formFaculty: {
        faculty_name: "",
        faculty_id: ""
      }
    };
  },

  methods: {
    editar() {
      console.log(this.unidad);
      this.$refs.form.validate();
      if (this.valid) {
        axios
          .post(
            "http://184.73.231.88:7002/api/admin/edit_faculty/",
            this.unidad
          )
          .then(res => {
            console.log(res);
            this.$message({
              message: "Modificación exitosa.",
              type: "success"
            });
            this.cancelar();
          })
          .catch(error => {
            console.log(error);
            this.$message.error("Datos duplicados");
          });
      } else this.$message.error("Datos incorrectos");
    },

    reset() {
      this.$refs.form.reset();
    },
    cancelar() {
      this.reset();
      this.$emit("resetList");
      this.$emit("resetDialog");
    }
  }
};
</script>