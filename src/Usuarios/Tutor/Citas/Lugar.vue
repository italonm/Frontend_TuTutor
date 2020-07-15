<template>
  <v-dialog v-model="dialogLugar" persistent max-width="700px">
      <v-card>
      <v-card-title class="cardAdd">
        <h2 class="headline">{{ "Editar lugar de la sesión" }}</h2>
      </v-card-title>
      <v-card-text>
        <v-container>
                <v-col>
                <v-card-title>
                  <h5>
                  Tipo de sesión
                  </h5>
                </v-card-title>
                    <v-radio-group row v-model="tipoSesion" hide-details>
                        <v-col>
                        <v-radio value="Sesión Presencial" label="Sesión Presencial"></v-radio>
                        </v-col>
                        <v-col>
                        <v-radio value="Sesión Virtual" label="Sesión Virtual"></v-radio>
                        </v-col>
                    </v-radio-group>
                </v-col>

                <v-col>
                <v-card-title>
                  <h5>
                  Lugar o enlace de la sesión
                  </h5>
                </v-card-title>
                <v-container class="grey lighten-5">
                    <v-text-field
                        v-model="ubicacion"
                    ></v-text-field>
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
  props: ["idSesion", "dialogLugar"],
  data() {
    return {
      localDialog: this.dialogLugar,
      localCita: this.cita,
      ubicacion:"",
      valid: true,
      lazy: false,
      tipoSesion: "Sesión Presencial",
      editarLugar:{
        idSesion:"",
        esPresencial:true,
        lugar:""
      }
    }
  },
  methods:{
    guardar(){
      this.editarLugar.idSesion = this.idSesion;
      if (this.tipoSesion === "Sesión Presencial")
        this.editarLugar.esPresencial = true; 
      else if (this.tipoSesion === "Sesión Virtual")
        this.editarLugar.esPresencial = false;
      this.editarLugar.lugar = this.ubicacion;
      axios
        .post(
          "http://184.73.231.88:5000/api/tutor/edit_place_from_session/",this.editarLugar)
        .then(res => {
            this.$emit("resetList");
            this.$message({ message: "Modificación exitosa", type: "success" });
            console.log(res); 
            this.ubicacion="";
            this.tipoSesion= "Sesión Presencial";
            this.newDialog = false;
            this.$emit("resetDialog", this.newDialog);
         })
         .catch(error => {
            console.log(error);
            this.$message.error("No se pudo editar el lugar");
          });

    },
    cancelar() {
      this.newDialog = false;
      this.$emit("resetDialog", this.newDialog);
      }
    }
}
</script>
