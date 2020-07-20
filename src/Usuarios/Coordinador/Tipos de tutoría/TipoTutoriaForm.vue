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
                :rules="descriptionValidation"
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
                <h6>¿El tutor es fijo?</h6>
              <v-switch v-model="fijado" @change="cambio_fijado(fijado)"></v-switch>
            </v-col>

            <v-col>
              
            <h6>Si el tutor es fijo, seleccione una fecha fin para la tutoría:</h6>
            <v-menu
                    v-bind:disabled="!fijado"
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
                        v-model="signtipo.tt_end_date"
                        label="Fecha fin para la tutoría"
                        readonly
                        v-on="on"
                    ></v-text-field>
            </template>
            <v-date-picker
                    v-model="signtipo.tt_end_date"
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
                        @click="$refs.startMenu.save(signtipo.tt_end_date)"
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
            <h6>¿Es obligatorio?</h6>
            <v-switch v-model="obligado" @change="cambio_obligado(obligado)"></v-switch>
            </v-col>

            <v-col class="form-group">
              <h6>Si la tutoria es obligatoria, coloque la cantidad de días para enviar recordatorios:</h6>
              <v-container>
                <v-text-field v-bind:disabled="!obligado" v-model="signtipo.tt_periodicity" type="number" label="Número de días" min="1" @click:append-outer="increment" @click:prepend="decrement"></v-text-field>
              </v-container>
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
                <h6>¿Se asigna un tutor?</h6>
                <v-switch v-model="asignado" ></v-switch>
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
import { nameRules, codeRules, cantRules,descriptionRules } from "../../Validation";
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
      obligado : false,
      asignado: false,
      fijado : false,
      actualidad: diaActual,
      nameValidation: nameRules,
      codeValidation: codeRules,
      cantValidation: cantRules,
      descriptionValidation: descriptionRules,
      start:null,
      startMenu:false,
      editarTipo: {
        tt_id: "",
        tt_name: "",
        tt_end_date:"",
        tt_description: "",
        tt_quantity:0,
        tt_isrequired: "",
        tt_periodicity:0,
        tt_assigned: "",
        tt_permanent: "",
        program_id: JSON.parse(localStorage.getItem("Id_facultad"))
      }
    };
  },

  methods: {
    increment () {
      this.signtipo.tt_periodicity = parseInt(this.signtipo.tt_periodicity,10) + 1
    },
    decrement () {
      this.signtipo.tt_periodicity = parseInt(this.signtipo.tt_periodicity,10) - 1
    },
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
          this.signtipo.tt_isrequired = this.obligado;
          this.signtipo.tt_assigned = this.asignado;
          this.signtipo.tt_permanent = this.fijado;
          this.signtipo.tt_quantity=0;
          if (this.signtipo.tt_permanent){
            this.signtipo.tt_permanent = "Si";
          }
          else {
            this.signtipo.tt_permanent = "No";
            this.signtipo.tt_end_date = ""
          }
          if (this.signtipo.tt_isrequired){
            this.signtipo.tt_isrequired = "Si";
          }
          else {
            this.signtipo.tt_isrequired = "No";
            this.signtipo.tt_periodicity = 0;
          }
          if  (this.signtipo.tt_assigned){
            this.signtipo.tt_assigned = "Si"
          }
          else{
            this.signtipo.tt_assigned = "No"
          }
          axios
            .post("http://184.73.231.88:7002/api/coordinator/add_tutoring_type/", this.signtipo)
            .then(res => {
              console.log(res);
              this.$emit("resetList");
              this.$message({ message: "Registro exitoso.", type: "success" });
              this.newDialog = false;
              this.$emit("resetDialog", this.newDialog);            
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
        this.editarTipo.tt_isrequired = this.obligado;
        this.editarTipo.tt_assigned = this.asignado;
        this.editarTipo.tt_permanent = this.fijado;
        this.editarTipo.tt_quantity=0;

        if (this.editarTipo.tt_permanent){
          this.editarTipo.tt_permanent = "Si";
        }
        else {
          this.editarTipo.tt_permanent = "No";
          this.editarTipo.tt_end_date = ""
        }
        if (this.editarTipo.tt_isrequired){
          this.editarTipo.tt_isrequired = "Si";
        }
        else {
          this.editarTipo.tt_isrequired = "No";
          this.signtipo.tt_periodicity = 0;
        }
        if (this.editarTipo.tt_assigned){
          this.editarTipo.tt_assigned = "Si"
        }
        else{
          this.editarTipo.tt_assigned = "No"
        }
        axios
          .post("http://184.73.231.88:7002/api/coordinator/update_tutoring_types/", this.editarTipo)
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
    cambio_fijado(fijado){
      if (fijado){
        if(this.signtipo.tt_end_date=="" || this.signtipo.tt_end_date==undefined ){
          this.signtipo.tt_end_date = diaActual;
        }
      }
    },
    cambio_obligado(obligado){
      if(obligado){
        if(this.signtipo.tt_periodicity=="" || this.signtipo.tt_periodicity==undefined)
        this.signtipo.tt_periodicity = 1;
      }

    }
  }
};
</script>
