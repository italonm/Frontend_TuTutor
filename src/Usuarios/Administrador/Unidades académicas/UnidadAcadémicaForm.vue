<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <v-card-title class="cardAdd">
        <h2 class="headline">Registrar unidad académica</h2>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formFaculty.faculty_name"
                  :rules="nameValidation"
                  label="Nombre"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="formFaculty.faculty_id_coordinator"
                  :items="coordinadores"
                  :rules="[v => !!v || 'Seleccione un coordinador']"
                  item-text="person_full_name"
                  item-value="person_id"
                  label="Coordinador"
                  required
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-checkbox
                  v-model="formFaculty.faculty_unique_faculty"
                  label="Unidad única"
                  required
                ></v-checkbox>
              </v-col>

              <v-col cols="12" md="6">
                <v-checkbox
                  v-model="formFaculty.faculty_required_tutorship"
                  label="Tutoría fija"
                  required
                ></v-checkbox>
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
  props: ["dialog", "coordinadores"],

  data() {
    return {
      valid: true,
      lazy: false,
      nameValidation: nameRules,
      formFaculty: {
        faculty_name: "",
        faculty_unique_faculty: false,
        faculty_required_tutorship: false,
        faculty_id_coordinator: "",
        institution_id: localStorage.getItem("Id_institución")
      }
    };
  },

  methods: {
    insertar() {
      this.$refs.form.validate();
      if (this.valid) {
        axios
          .post("/admin/add_faculty/", this.formFaculty)
          .then(res => {
            console.log(res);
            this.$message({ message: "Registro exitoso.", type: "success" });
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
      this.formFaculty.faculty_unique_faculty = false;
      this.formFaculty.faculty_required_tutorship = false;
    },
    cancelar() {
      this.reset();
      this.$emit("resetCoordinadores");
      this.$emit("resetList");
      this.$emit("resetDialog");
    }
  }
};
</script>