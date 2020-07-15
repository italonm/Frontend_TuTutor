<template>
  <v-dialog v-model="dialog" persistent max-width="700px">
    <v-card>
      <v-card-title class="cardAdd">
        <h2 class="headline">{{ action }}</h2>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <h4>
                  Datos del tipo de tutoría
            </h4>
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

            <br>

            <h4>
                  Detalles del tipo de tutoría
            </h4>

            <v-card
              class="pa-2"
              outlined
              style="border-color: lightgrey;"
              tile
            >
            <v-col>
            <el-container>
              <el-row>
                <h6>¿El tutor es fijo?</h6>
                <label class="c-switch c-switch-pill c-switch-opposite-success">
                  <input type="checkbox" class="c-switch-input" @click="cambiarvalorFijo" />
                  <span class="c-switch-slider" data-checked="true" data-unchecked="false"></span>
                </label>
              </el-row>
            </el-container>
            </v-col>

            <v-col>
            <v-menu
                    v-bind:disabled="!valor_fijo"
                    ref="startMenu"
                    v-model="startMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="start"
                    transition="scale-transition"
                    min-width="290px"
                    offset-y
                >
            <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model="start"
                        label=" Si el tutor es fijo, seleccione una fecha fin para la tutoría"
                        readonly
                        v-on="on"
                    ></v-text-field>
            </template>
            <v-date-picker
                    v-model="start"
                    no-title
                    scrollable
                    :min= "actualidad"
                    >
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        @click="startMenu = false"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                        color="primary"
                        @click="$refs.startMenu.save(start)"
                    >
                        OK
                    </v-btn>
            </v-date-picker>
            </v-menu>
            </v-col>
            </v-card>

            <br>
            
            <v-card
              class="pa-2"
              outlined
              style="border-color: lightgrey;"
              tile
            >
            <v-col>
            <el-container>
              <el-row>
                <h6>¿Es obligatorio?</h6>
                <label class="c-switch c-switch-pill c-switch-opposite-success">
                  <input
                    type="checkbox"
                    class="c-switch-input"
                    color="success"
                    @click="cambiarvalorOblig"
                  />
                  <span class="c-switch-slider" data-checked="true" data-unchecked="false"></span>
                </label>
              </el-row>
            </el-container>
            </v-col>

            <v-col class="form-group">
              <h6>Si la tutoria es obligatoria, selecciona la periodicidad de recordatorios:</h6>
              <select
                v-bind:disabled="!valor_obli"
                v-model="signtipo.tt_periodicity"
                class="form-control"
                id="exampleFormControlSelect1"
              >
                <option value="Diario" selected>Diario</option>
                <option value="Semanal">Semanal</option>
                <option value="Mensual">Mensual</option>
                <option value="Semestral">Semestral</option>
              </select>
            </v-col>
            </v-card>

            <br>

            <v-card
              class="pa-2"
              outlined
              style="border-color: lightgrey;"
              tile
            >
            <v-col>
            <el-container>
              <el-row>
                <h6>¿Se asigna un tutor?</h6>
                <label class="c-switch c-switch-pill c-switch-opposite-success">
                  <input
                    type="checkbox"
                    class="c-switch-input"
                    @click="cambiarvalorAsignar"
                  />
                  <span class="c-switch-slider" data-checked="true" data-unchecked="false"></span>
                </label>
              </el-row>
            </el-container>
            </v-col>
            </v-card>

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
var now     = new Date(); 
var diaActual = now.getFullYear() + "-" + (((now.getMonth()+1) < 10)?"0":"") + (now.getMonth()+1) + "-" + ((now.getDate() < 10)?"0":"") + now.getDate();
export default {
  props: ["signtipo", "dialog", "action"],

  data() {
    return {
      localDialog: this.dialog,
      localTipoTutoria: this.signtipo,
      valid: true,
      lazy: false,
      valor_obli : false,
      valor_asignar: false,
      valor_fijo : false,
      actualidad: diaActual,
      nameValidation: nameRules,
      codeValidation: codeRules,
      cantValidation: cantRules,
      start:null,
      startMenu:false,
      editarTipo: {
        tt_id: "",
        tt_name: "",
        tt_enddate:"",
        tt_description: "",
        tt_isrequired: "",
        tt_periodicity: "Diario",
        tt_assigned: "",
        tt_permanent: "",
        program_id: JSON.parse(localStorage.getItem("Id_facultad"))
      }
    };
  },

  methods: {
    guardar() {
      if (this.action == "Registrar tipo de tutoría") {
        this.insertar();
      } else if (this.action ==  "Editar tipo de tutoría") {
        this.editar();
      }
    },

    insertar() {
      this.$refs.form.validate();
      if (this.valid) {
        this.signtipo.tt_isrequired = this.valor_obli;
        this.signtipo.tt_assigned = this.valor_asignar;
        this.signtipo.tt_permanent = this.valor_fijo;
        if (this.signtipo.tt_permanent){
          this.signtipo.tt_enddate = this.start;
          this.signtipo.tt_permanent = "Si";
        }
        else {
          this.signtipo.tt_permanent = "No";
          this.signtipo.tt_enddate = ""
        }
        if (this.signtipo.tt_isrequired){
          this.signtipo.tt_isrequired = "Si";
        }
        else {
          this.signtipo.tt_permanent = "No";
          this.signtipo.tt_periodicity = "";
        }
        console.log(this.signtipo);
        axios
          .post("/coordinator/add_tutoring_type/", this.signtipo)
          .then(res => {
            console.log(this.$refs.form);
            console.log(res);
            this.$emit("resetList");
            this.$message({ message: "Registro exitoso.", type: "success" });
            this.newDialog = false;
            this.$emit("resetDialog", this.newDialog);            
            this.signtipo.tt_id= "",
            this.signtipo.tt_name= "",
            this.signtipo.tt_description= "",
            this.signtipo.tt_isrequired= false,
            this.signtipo.tt_periodicity= "",
            this.signtipo.tt_assigned= false,
            this.signtipo.tt_permanent= false
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
        this.editarTipo.tt_isrequired = this.valor_obli;
        this.editarTipo.tt_assigned = this.valor_asignar;
        this.editarTipo.tt_permanent = this.valor_fijo;

        if (this.editarTipo.tt_permanent){
          this.editarTipo.tt_enddate = this.start;
          this.editarTipo.tt_permanent = "Si";
        }
        else {
          this.editarTipo.tt_permanent = "No";
          this.editarTipo.tt_enddate = ""
        }
        if (this.editarTipo.tt_isrequired){
          this.editarTipo.tt_isrequired = "Si";
        }
        else {
          this.editarTipo.tt_permanent = "No";
          this.editarTipo.tt_periodicity = "";
        }
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
      if (this.valor_obli == true) {
        this.valor_obli = false;
        this.signtipo.tt_periodicity="";
      }
      else {
        this.signtipo.tt_periodicity="Diario";
        this.valor_obli = true;
      }
    },
    cambiarvalorAsignar() {
      if (this.valor_asignar == true) this.valor_asignar = false;
      else this.valor_asignar = true;
    },
    cambiarvalorFijo() {
      if (this.valor_fijo == true) {
        this.start = null;
        this.valor_fijo = false;
      }
      else {
        this.valor_fijo = true;
        this.start= diaActual;
      }
    }
  }
};
</script>
