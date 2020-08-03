<template>
  <v-dialog v-model="dialogTutoriasForm" persistent max-width="500px">
    <v-card>
      <v-card-title class="cardAdd">
        <h2 class="headline">Registro de tutorías masivo</h2>
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
                  label="Tutorías"
                  v-model="documentExcel"
                  :rules="fileValidation"
                  required
                ></v-file-input>
              </v-col>
              <v-col cols="12" md="12">
                <v-select
                  v-model="tipo"
                  :items="tipotutorias"
                  :rules="[v => !!v || 'Seleccione un tipo de tutoría']"
                  item-text="tt_name"
                  item-value="tt_id"
                  label="Tipo de tutoría"
                  required
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
import axios from "axios";
import { excelRules } from "../../Validation";
export default {
  props: ["dialogTutoriasForm"],

  data() {
    return {
      documentExcel: null,
      tipo: "",
      tipotutorias: [],
      valid: true,
      lazy: false,
      fileValidation: excelRules,
    };
  },

  created() {
    this.listarTipos();
  },

  methods: {
    listarTipos() {
      var Id_facultad = localStorage.getItem("Id_facultad");
      axios
        .get("/coordinator/show_tutoring_types/" + Id_facultad)
        .then((res) => {
          this.tipotutorias = res.data.tutoriaData;
        })
        .catch((error) => console.log(error));
    },

    insertar() {
      var formData = new FormData();
      formData.append("file", this.documentExcel);
      this.$refs.form.validate();
      if (this.valid) {
        var Id_facultad = localStorage.getItem("Id_facultad");
        axios
          .post(
            "/coordinator/add_tutors_to_student/" +
              Id_facultad +
              "/" +
              this.tipo,
            formData
          )
          .then((res) => {
            console.log(res);
            this.$emit("resetList");
            this.$message({
              message: "Subiendo archivo, por favor espere",
              type: "success",
            });
            this.cancelar();
          })
          .catch((e) => {
            console.log(e);
            this.$message.error("Archivo con formato incorrecto");
          });
      } else this.$message.error("Adjunte un archivo excel");
    },

    cancelar() {
      this.$refs.form.reset();
      this.$emit("resetDialog");
    },
  },
};
</script>