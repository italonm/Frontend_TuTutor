<template>
  <div>
    <el-row>
      <el-col :span="14">
        <div class="grid-content">
          <h1 style="text-align: center;">
            <i class="fas fa-clipboard-check"></i>
            &nbsp;{{"Cuestionarios pendientes"}}
          </h1>
        </div>
      </el-col>
    </el-row>

    <v-dialog v-model="dialog" persistent max-width="890px">
      <v-card>
        <v-card-text>
          <v-container>
            <embed src="https://form.typeform.com/to/RGn9ztac" width="850" height="560" />
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gray" @click="aceptar">Terminar cuestionario</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card max-width="700" class="mx-auto">
      <v-list two-line style="max-height:600px">
        <div v-if="asignaciones.length > 0">
          <v-list-item v-for="asignacion in asignaciones" :key="asignacion.id">
            <v-list-item-content>
              <v-list-item-title v-text="asignacion.tutor_full_name"></v-list-item-title>
              <v-list-item-title v-text="asignacion.tutoring_type"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-spacer></v-spacer>
              <v-btn color="gray" @click="mostrarCuestionario(asignacion.id)">Responder</v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider v-if="3 < asignaciones.length" :key="id"></v-divider>
        </div>

        <div v-else>
          <v-list-item v-for="predeterminado in predeterminados" :key="predeterminado.texto">
            <v-list-item-content>
              <v-list-item-title v-text="predeterminado.texto"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      asignaciones: [],
      dialog: false,
      asignacion_id: "",
      predeterminados: [{ texto: "No existen encuestas pendientes" }],
    };
  },
  methods: {
    aceptar() {
      this.$confirm(
        "¿Está seguro que desea finalizar la encuesta? Si no ha terminado de responder no podrá volverla a tomar luego.",
        "Advertencia",
        {
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
          type: "warning",
        }
      ).then(() => {
        axios
          .post("/student/fill_poll/", { id: this.asignacion_id })
          .then((res) => {
            console.log(res);
            this.listarCuestionarios();
          })
          .catch((error) => console.log(error));
        this.listarCuestionarios();
        this.dialog = false;
      });
    },

    listarCuestionarios() {
      axios
        .get(
          "/student/show_finished_assignments/" +
            localStorage.getItem("Id_usuario")
        )
        .then((res) => {
          this.asignaciones = res.data.assignments;
        })
        .catch((error) => console.log(error));
    },

    mostrarCuestionario(select_asignacion_id) {
      this.asignacion_id = select_asignacion_id;
      this.dialog = true;
    },
  },

  created() {
    this.listarCuestionarios();
  },
};
</script>