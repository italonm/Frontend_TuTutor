<template>
  <v-dialog v-model="dialogMasivo" persistent max-width="500px">
    <v-card>
      <v-card-title class="cardAdd">
        <h2 class="headline">Registro de tutores masivo</h2>
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
                  label="Excel de tutores"
                  v-model="documentExcel"
                  :rules="fileValidation"
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
import { excelRules } from "../../Validation";
export default {
  props: ["dialogMasivo"],

  data() {
    return {
      documentExcel: null,
      valid: true,
      lazy: false,
      fileValidation: excelRules
    };
  },

  methods: {
    insertar() {
      var formData = new FormData();
      formData.append("file", this.documentExcel);
      this.$refs.form.validate();
      if (this.valid) {
        var Id_facultad = localStorage.getItem("Id_facultad");
        axios
          .post("/coordinator/add_tutor_excel/" + Id_facultad, formData)
          .then(res => {
            console.log(res);
            this.$emit("resetList");
            this.$message({
              message: "Subiendo archivo, por favor espere",
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

    cancelar() {
      this.$refs.form.reset();
      this.$emit("resetDialog");
    }
  }
};
</script>