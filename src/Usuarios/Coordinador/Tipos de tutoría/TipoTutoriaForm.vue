<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <v-card-title class="cardAdd">
        <h2 class="headline">{{action}}</h2>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-col cols="12" md="12">
              <v-text-field
                v-model="signtipo.tt_name"
                :rules="nameValidation"
                label="Nombre"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12   ">
              <v-text-field
                v-model="signtipo.tt_description"
                :rules="nameValidation"
                label="Descripción"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="signtipo.tt_quantity"
                :rules="cantValidation"
                label="Cantidad"
                required
              ></v-text-field>
            </v-col>

            <div class="form-group">
              <h6>Selecciona periodicidad:</h6>
              <select
                v-model="signtipo.tt_periodicity"
                class="form-control"
                id="exampleFormControlSelect1"
              >
                <option value="Semanal" selected>Semanal</option>
                <option value="Mensual">Mensual</option>
                <option value="Semestral">Semestral</option>
                <option value="Anual">Anual</option>
              </select>
            </div>

            <el-container>
              <el-row>
                <h6>¿Es obligatorio?</h6>
                <label class="c-switch c-switch-label c-switch-pill c-switch-opposite-success">
                  <input
                    type="checkbox"
                    class="c-switch-input"
                    checked
                    color="success"
                    @click="cambiarvalorOblig"
                  />
                  <span class="c-switch-slider" data-checked="Si" data-unchecked="No"></span>
                </label>
              </el-row>
            </el-container>

            <el-container>
              <el-row>
                <h6>¿Se asigna un tutor?</h6>
                <label class="c-switch c-switch-label c-switch-pill c-switch-opposite-success">
                  <input
                    type="checkbox"
                    class="c-switch-input"
                    checked
                    @click="cambiarvalorAsignar"
                  />
                  <span class="c-switch-slider" data-checked="Si" data-unchecked="No"></span>
                </label>
              </el-row>
            </el-container>

            <el-container>
              <el-row>
                <h6>¿El tutor es fijo?</h6>
                <label class="c-switch c-switch-label c-switch-pill c-switch-opposite-success">
                  <input type="checkbox" class="c-switch-input" checked @click="cambiarvalorFijo" />
                  <span class="c-switch-slider" data-checked="Si" data-unchecked="No"></span>
                </label>
              </el-row>
            </el-container>
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
import { nameRules, codeRules, cantRules } from "../../Validation";
import axios from "axios";
var valor_obli = "Si";
var valor_asignar = "Si";
var valor_fijo = "Si";
export default {
  props: ["signtipo", "dialog", "action"],

  data() {
    return {
      localDialog: this.dialog,
      localTipoTutoria: this.signtipo,
      valid: true,
      lazy: false,
      nameValidation: nameRules,
      codeValidation: codeRules,
      cantValidation: cantRules,
      editarTipo: {
        tt_id: "",
        tt_name: "",
        tt_description: "",
        tt_isrequired: "",
        tt_quantity: "",
        tt_periodicity: "Semanal",
        tt_assigned: "",
        tt_permanent: ""
      }
    };
  },

  methods: {
    guardar() {
      if (this.action == "Registrar tipo de tutoría") {
        this.insertar();
      } else if (this.action == "Editar tipo de tutoría") {
        this.editar();
      }
    },

    insertar() {
      this.$refs.form.validate();
      if (this.valid) {
        this.signtipo.tt_isrequired = valor_obli;
        this.signtipo.tt_assigned = valor_asignar;
        this.signtipo.tt_permanent = valor_fijo;
        console.log(this.signtipo);
        axios
          .post("/coordinator/add_tutoring_type/", this.signtipo)
          .then(res => {
            console.log(res);
            this.$emit("resetList");
            this.$message({ message: "Registro exitoso.", type: "success" });
            this.newDialog = false;
            this.$emit("resetDialog", this.newDialog);
            this.$refs.form.reset();
          })
          .catch(error => {
            console.log(error);
            this.$message.error("Datos duplicados");
          });
      } else this.$message.error("Datos incorrectos");
    },

    editar() {
      //servicio
      this.editarTipo = Object.assign({}, this.signtipo);
      this.$refs.form.validate();
      if (this.valid) {
        this.editarTipo.tt_isrequired = valor_obli;
        this.editarTipo.tt_assigned = valor_asignar;
        this.editarTipo.tt_permanent = valor_fijo;
        console.log(this.editarTipo);
        axios
          .post("/coordinator/update_tutoring_types/", this.editarTipo)
          .then(res => {
            console.log(res);
            this.$emit("resetList");
            this.$message({
              message: "Modificación exitosa.",
              type: "success"
            });
            this.newDialog = false;
            this.$emit("resetDialog", this.newDialog);
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
      this.newDialog = false;
      this.$emit("resetDialog", this.newDialog);
    },
    cambiarvalorOblig() {
      if (valor_obli == "Si") valor_obli = "No";
      else valor_obli = "Si";
    },
    cambiarvalorAsignar() {
      if (valor_asignar == "Si") valor_asignar = "No";
      else valor_asignar = "Si";
    },
    cambiarvalorFijo() {
      if (valor_fijo == "Si") valor_fijo = "No";
      else valor_fijo = "Si";
    }
  }
};
</script>