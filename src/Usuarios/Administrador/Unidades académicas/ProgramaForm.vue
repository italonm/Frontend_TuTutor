<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <v-card-title class="cardAdd">
        <h2 class="headline">Registrar programa</h2>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.program_name"
                  :rules="nameValidation"
                  label="Nombre"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="form.program_id_coordinator"
                  :items="coordinadores"
                  item-text="person_full_name"
                  item-value="person_id"
                  label="Coordinador"
                ></v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="cancelar">Cerrar</v-btn>
        <v-btn color="green" @click="insertar">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { nameRules } from "../../Validation";
import axios from "axios";

export default {
  props: ["faculty_id", "dialog", "formPrograma"],

  data() {
    return {
      valid: true,
      lazy: false,
      nameValidation: nameRules,
      checkbox: false,
      coordinadores: []
    };
  },

  created() {
    axios
      .get("/admin/show_coordinators/")
      .then(res => {
        this.coordinadores = res.data.users;
      })
      .catch(error => console.log(error));
  },
  methods: {
    insertar() {
      this.form.program_id_faculty = this.faculty_id;
      this.$refs.form.validate();
      if (this.valid) {
        axios
          .post("/admin/add_program/", this.form)
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