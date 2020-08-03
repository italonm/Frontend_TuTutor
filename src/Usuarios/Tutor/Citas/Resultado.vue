<template>
  <v-dialog v-model="dialog" persistent max-width="750px">
    <v-card>
      <v-card-title class="cardAdd">
        <h2 class="headline">{{ action }}</h2>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-card-title>
            <h5>Asistencia</h5>
          </v-card-title>
          <v-data-table
            v-model="resultado.asistencia"
            :footer-props="{'items-per-page-options': [2, 4, 6, -1],
                                'items-per-page-text': 'Registros por página:',
                                'items-per-page-all-text': 'Listar todos'}"
            :headers="headers"
            :items="listaAlumnos"
            :items-per-page="2"
            item-key="codigo"
            show-select
            multi-sort
            class="elevation-1"
            loading-text="Cargando.."
            height="145px"
            fixed-header
            hide-default-footer
          ></v-data-table>
          <br />
          <v-col>
            <h5>Motivos de la cita</h5>
            <h6>Seleccione los temas propósitos de la cita.</h6>
          </v-col>
          <v-col>
            <v-select
              v-model="motivos"
              :items="items"
              label="Motivo de la sesión (Máx. 2 motivos)"
              multiple
              small-chips
              clearable
              return-object
            ></v-select>
          </v-col>
          <v-card-title>
            <h5>Comentario de la cita</h5>
          </v-card-title>
          <v-col>
            <v-container class="grey lighten-5">
              <v-textarea
                v-model="resultado.comentario"
                counter
                full-width
                single-line
                height="50px"
              ></v-textarea>
            </v-container>
          </v-col>
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
  props: [
    "listaDerivados",
    "resultado",
    "idSesion",
    "listaAlumnos",
    "dialog",
    "action",
  ],

  data() {
    return {
      localDialog: this.dialog,
      localCita: this.cita,
      headers: [
        { text: "Código", value: "codigo" },
        { text: "Nombres", value: "nombre" },
        { text: "Apellidos", value: "apellidos" },
      ],
      items: [
        "Académico",
        "Académico-administrativo",
        "Vocacional",
        "Personal",
        "Familiar",
        "Individual",
        "Ecónomico",
        "Psicológico",
      ],
      valid: true,
      lazy: false,
      motivos: [],
      datosResultado: {
        idsesion: "",
        resultado: "",
        alumnos: [],
        idderivacion: 0,
        reason1: "",
        reason2: "",
      },
      editarResultado: {
        idsesion: "",
        resultado: "",
      },
    };
  },
  methods: {
    guardar() {
      if (this.action == "Crear resultado de la cita") {
        this.insertar();
      } else if (this.action == "Editar resultado de la cita") {
        this.editar();
      }
    },
    listar() {
      axios
        .get("/tutor/show_all_students_in_session/" + this.cita.id_session)
        .then((res) => {
          this.listaAlumnos = res.data.data;
        })
        .catch((error) => console.log(error));
    },
    cancelar() {
      this.newDialog = false;
      this.$emit("resetDialog", this.newDialog);
    },
    insertar() {
      if (Object.keys(this.resultado.asistencia).length != 0) {
        this.datosResultado.reason1 = this.motivos[0];
        if (this.motivos[1] == undefined) {
          this.datosResultado.reason2 = "";
        } else {
          this.datosResultado.reason2 = this.motivos[1];
        }
        if (this.datosResultado.reason1 != undefined) {
          this.datosResultado.idsesion = this.idSesion;
          this.datosResultado.resultado = this.resultado.comentario;
          this.datosResultado.alumnos = this.resultado.asistencia;
          axios
            .post("/tutor/register_result_and_assistance/", this.datosResultado)
            .then((res) => {
              this.$emit("resetList");
              this.$message({ message: "Registro exitoso.", type: "success" });
              console.log(res);
              this.newDialog = false;
              this.$emit("resetDialog", this.newDialog);
            })
            .catch((error) => {
              console.log(error);
              this.$message.error("Error al momento de registrar el resultado");
            });
        } else
          this.$message.error(
            "No hay motivos seleccionados. Selecciona al menos un motivo"
          );
      } else this.$message.error("No ha registrado asistencia");
    },
    editar() {
      this.editarResultado.idsesion = this.idSesion;
      this.editarResultado.resultado = this.resultado.comentario;
      axios
        .post("/api/tutor/edit_result/", this.editarResultado)
        .then((res) => {
          this.$message({ message: "Modificación exitoso.", type: "success" });
          console.log(res);
          this.newDialog = false;
          this.$emit("resetDialog", this.newDialog);
        })
        .catch((error) => {
          console.log(error);
          this.$message.error("No se pudo editar");
        });
    },
  },
};
</script>