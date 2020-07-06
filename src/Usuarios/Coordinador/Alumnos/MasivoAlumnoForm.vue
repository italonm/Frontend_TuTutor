<template>
  <v-dialog v-model="dialog2" persistent max-width="500px">
    <v-card>
      <v-card-title class="cardAdd">
        <h2 class="headline">Registro Masivo Alumnos</h2>
      </v-card-title>
      <v-card-text>
        <v-container>
          <CCard>
            <CCardHeader>
              <strong>Adjunte un archivo Excel</strong>
            </CCardHeader>
            <CCardBody>
              <div>
                <CCol>
                  <input ref="file" type="file" accept="xlsx" @change="uploadImage" />
                </CCol>
              </div>
            </CCardBody>
          </CCard>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="cancelar">Cerrar</v-btn>
        <v-btn color="green" @click="funcion">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
var formData = new FormData();
export default {
  props: ["dialog2"],

  data() {
    return {
      localDialog: this.dialog2,
      documentExcel: ""
    };
  },

  methods: {
    funcion() {
      console.log(this.documentExcel);
      console.log(localStorage.getItem("Id_facultad"));
      axios
        .post(
          "/coordinator/add_student_excel/" +
            localStorage.getItem("Id_facultad"),
          this.documentExcel
        )
        .then(
          this.$message({
            message: "Subiendo archivo, por favor espere",
            type: "success"
          })
        )
        .catch(e => {
          console.log(e);
        });
      this.$emit("resetDialog");
    },

    cancelar() {
      this.$emit("resetDialog");
    },
    uploadImage(e) {
      if (e != null) {
        const image = e.target.files[0];
        formData.append("file", image);
        this.documentExcel = formData;
        console.log(this.documentExcel);
      }
    }
  }
};
</script>