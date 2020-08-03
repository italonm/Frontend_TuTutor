<template>
  <v-dialog v-model="dialog" persistent max-width="700px">
    <v-card class="derivacion">
      <v-card-title class="cardAdd">
        <h2 class="headline">Derivar Asignación</h2>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-select
              class="unity"
              full-width
              v-model="apoyo"
              :items="unidades"
              :rules="[v => !!v || 'Seleccione una unidad de apoyo']"
              required
              hide-selected
              item-text="name"
              item-value="id"
              label="Selecione una unidad de apoyo"
              clearable
              return-object
            ></v-select>
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
import axios from "axios";
export default {
  props: ["dialog", "name", "unid"],
  data() {
    return {
      valid: true,
      lazy: false,
      unidades: [],
      apoyo: [],
      derivado: {
        idassig: "",
        idunidad: "",
      },
    };
  },
  created() {
    this.listarUnidades();
  },
  methods: {
    listarUnidades() {
      var that = this;
      axios
        .get(
          "/coordinator/show_support_units/" +
            localStorage.getItem("Id_institución")
        )
        .then((res) => {
          that.unidades = res.data.users;
        })
        .catch((e) => console.log(e));
    },
    cancelar() {
      this.$emit("resetDialog");
    },
    guardar() {
      this.$refs.form.validate();
      if (this.valid && this.apoyo.id !== undefined) {
        var that = this;
        this.$confirm(
          "¿Está seguro de derivar esta asignación con " +
            this.name +
            "? " +
            "Se eliminarán todas las citas pendientes",
          "Advertencia",
          {
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            type: "warning",
          }
        )
          .then(() => {
            this.derivado.idassig = this.unid.id;
            this.derivado.idunidad = this.apoyo.id;
            axios
              .post("/tutor/derive_assignment/", that.derivado)
              .then(() => {
                this.$message({
                  type: "success",
                  message: "Se ha derivado exitosamente",
                });
                that.apoyo = [];
                this.$emit("reset");
                this.$emit("resetDialog");
              })
              .catch((e) => console.log(e));
          })
          .catch(() => {});
      } else this.$message.error("Seleccione una unidad");
    },
  },
};
</script>
<style scoped>
.derivacion {
  align-items: center;
}
.selectUnidad {
  position: relative;
  left: 15%;
  width: 500px;
}
</style>