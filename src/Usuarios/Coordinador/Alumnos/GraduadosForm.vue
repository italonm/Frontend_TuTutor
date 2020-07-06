<template>
  <v-dialog v-model="dialogGraduados" persistent max-width="500px">
    <v-card>
      <v-card-title class="cardAdd">
        <h2 class="headline">Registro de alumno graduados</h2>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-row>
              <v-col cols="12" md="12">
                <v-file-input
                  ref="excel"
                  chips
                  accept=".xlsx"
                  show-size
                  label="Adjunte un archivo Excel"
                  v-model="documentExcel"
                  @change="uploadExcel"
                  :rules="nameValidation"
                  required
                ></v-file-input>
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
import axios from "axios";
import { nameRules } from "../../Validation";
var formData = new FormData();
export default {
  props: ["dialogGraduados"],

  data() {
    return {
      documentForm: {
        file: null
      },
      documentExcel: "",
      valid: true,
      lazy: false,
      nameValidation: nameRules
    };
  },

  methods: {
    insertar() {
      console.log(this.documentExcel);
      this.$refs.form.validate();
      if (this.valid) {
        axios
          .post(
            "http://184.73.231.88:7002/api/coordinator/add_graduated_student_excel/",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            }
          )
          .then(res => {
            console.log(res);
            this.$message({
              message: "Registro de alumnos graduados exitoso",
              type: "success"
            });
            this.cancelar();
          })
          .catch(e => {
            console.log(e);
            this.$message.error("Archivo con formato incorrecto");
          });
      } else this.$message.error("Adjunte un archivo excel");
    },

    uploadExcel(e) {
      if (e != null) {
        formData.append("file", this.documentExcel);
        console.log(formData.getAll("file"));
        console.log(formData);
      }
    },

    cancelar() {
      this.$refs.form.reset();
      this.$emit("resetDialog");
    }
  }
};
</script>