<template>
  <div>
    <el-row>
      <el-col :span="14">
        <div class="grid-content">
            <h1 style="text-align: center;">
            <i class="fas fa-clipboard-check"></i>&nbsp;{{"Cuestionarios pendientes"}}
            </h1>
        </div>
      </el-col>
    </el-row>

    <v-dialog v-model="dialog" persistent max-width="890px">
      <v-card>
        <v-card-text>
          <v-container>
              <embed src="https://form.typeform.com/to/RGn9ztac" width="850" height="570"/>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gray" @click="aceptar">Terminar cuestionario</v-btn>
        </v-card-actions>      
        </v-card>
      </v-dialog>

      <v-card max-width="700" class="mx-auto">
        <!-- <v-card-title class="cardAdd justify-center">
            Sesiones futuras
        </v-card-title> -->

        <v-list two-line style="max-height:600px">

          <v-list-item
            v-for="notificacion in notificaciones"
            :key="notificacion.id"
          >
            
            <v-list-item-content>
              <v-list-item-title v-text="notificacion.tutor_full_name"></v-list-item-title>
              <v-list-item-title v-text="notificacion.tutoring_type"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-spacer></v-spacer>
                <v-btn color="gray" @click="mostrarCuestionario">Responder</v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-divider
              v-if="index + 1 < notificaciones.length"
              :key="index"
          ></v-divider>
          
        </v-list>

      </v-card>

  </div>
</template>

<script> 
import axios from 'axios';
//const form_id = "RGn9ztac"
// const response_id = ""
//const PERSONAL_TOKEN = "6Q7Q6NRPQFjNJFTyM2zGmVUtrFJ4kB9tK4Rc1aEvZPcV"
export default {
  data() {
    return {
      notificaciones: [],
      dialog: false,
      respuestas: [],
    }
  },
  methods: { 

    aceptar() {
      this.dialog=false;
      this.listarCuestionarios();
    },

    listarCuestionarios() {
      console.log(localStorage.getItem("Id_usuario")); 
      axios
      .get("http://184.73.231.88:5000/api/student/show_finished_assignments/" + localStorage.getItem("Id_usuario"))
      .then(res => {
          //console.log(res.data);
          this.notificaciones = res.data.assignments; 
          //console.log(this.notificaciones);              
      })
      .catch(error => console.log(error));
    },

    mostrarCuestionario(){
      this.dialog=true;
    },

    /*
    solicitarRespuestaTF(){
      axios
      .get("https://api.typeform.com/forms/" + form_id + "/responses", { headers: { Authorization: 'Bearer ' +  PERSONAL_TOKEN} })
      .then(res => {
          console.log(res.data);
          //this.respuestas = res.data.assignments; 
          //console.log(this.respuestas);              
      })
      .catch(error => console.log(error));
    },
    
    enviarRespuestaBD(){
      axios
      .post("", {"id" : localStorage.getItem("Id_usuario"), "answers" : this.respuestas })
      .then(res => {
          //console.log(localStorage.getItem("Id_usuario")); 
          //console.log(this.respuestas);              
      })
      .catch(error => console.log(error));
    }
  */
  },
  
  created() {
    this.listarCuestionarios();
    //this.solicitarRespuestaTF();
  },
}

</script>