<template>
  <v-dialog v-model="dialog" persistent max-width="700px">
    <v-card>
      <v-card-title class="cardAdd">
        <h2 class="headline">{{action}}</h2>
      </v-card-title>
      <v-card-text>
        <v-container>            
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <h5>Selecciona tu facultad</h5> 
            <v-chip-group
              column
              active-class="primary--text"
            >     
              <v-chip filter v-for="facultad in form.facultades" :key="facultad"
                class="ma-2"
                color="primary"
                outlined    
                @click="cargarAlumnos(facultad)"
              >
                <v-avatar left>
                  <v-icon>mdi-account-circle</v-icon>
                </v-avatar>
                {{facultad}}
              </v-chip>
            </v-chip-group> 


            <v-combobox      
              id = "model_part"
              v-model="model_participante"
              :items="alumnos"
              :search-input.sync="search"
              hide-selected              
              label="Participante"
              multiple              
              small-chips
              clearable
            >              
            </v-combobox>


            <v-menu
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
                    label="Día de realización"
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
            <v-combobox
              v-model="model"
              :items="items"
              :search-input.sync="search"
              hide-selected
              hint="Máximo de 2 motivos"
              label="Motivo de la sesión"
              multiple
              persistent-hint
              small-chips
              clearable
            >              
            </v-combobox>
            <br>            
            <h5>Resultado de la sesión</h5>        
            <v-container class="grey lighten-5">
                <v-textarea
                v-model="insert.result"
                counter
                full-width
                single-line
                height="80px"
                ></v-textarea>
            </v-container>
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

import { nameRules, emailRules, codeRules, phoneRules } from "../../Validation";
import axios from "axios";

var now = new Date(); 
var diaActual = now.getFullYear() + "-" + (((now.getMonth()+1) < 10)?"0":"") + (now.getMonth()+1) + "-" + ((now.getDate() < 10)?"0":"") + now.getDate();

export default {
  props: ["form", "dialog", "action"],  
  data() {
    return {
      insert:{     
        student_id: 1,
        tutor_id: 1,
        reason1:"",
        reason2:"",
        place:"Mi casita",
        result:"", 
        date:"",       
      },
      model: [],
      model_participante: [],
      alumnos:[],
      id_alumnos:[],
      items: [        
        'Académico',
        'Académico-administrativo',
        'Vocacional',
        'Personal', 
        'Familiar', 
        'Individual', 
        'Ecónomico', 
        'Psicológico', 
      ],            
      search: null,    
      dark: false,
      startMenu: false,
      startMenuTime:false,
      endMenuTime:false,
      start: diaActual,
      actualidad: diaActual,
      startTime: "07:00",
      endTime: "18:00",
      endMenu: false,
      nowMenu: false,
      minWeeks: 1,
      now: null,
      type: 'week',
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      availableDates: [],
      maxDays: 7,
      color: 'blue',
      events:[],
      schedule:{
        tutor_id:97,
        events: []
      },
      eventosAgregados:[],
      borrarEvento:{
        schedule_id:""
      },
      valid: true,
      lazy: false,
      nameValidation: nameRules,
      emailValidation: emailRules,
      codeValidation: codeRules,
      phoneValidation: phoneRules,
      motivos:[],
    };
  },  
  watch: {
    model (val) {
      if (val.length > 2) {
        this.$nextTick(() => this.model.pop())
      }
    },
    model_participante (val){
      if (val.length > 1 && this.action == "Registrar nueva sesión") {
        this.$nextTick(() => this.model_participante.pop())
      }
    }
  },

  methods: { 
    cargarAlumnos(item){                  
      var alumno;
        var aux1 = [];
        var aux2 = [];
      axios
        .get("/coordinator/show_students/" + this.form.id_facultades[this.form.facultades.indexOf(item)])      
        .then(res =>{
          
          for(alumno in res.data.users){
            aux1.push(res.data.users[alumno].person_full_name)
            aux2.push(res.data.users[alumno].person_id)
          }          
          this.alumnos = aux1;
          this.id_alumnos = aux2;
        })
        .catch(error => {
          console.log(error);
          this.$message.error("No hay alumnos en este programa");
        });    
    }, 

    guardar() {
      if (this.action == "Registrar nueva sesión") this.insertar();
      else if (this.action == "Detalles de la sesión") this.cancelar();
    },

    insertar() {                    
      this.insert.tutor_id = localStorage.getItem("Id_usuario");
      console.log(this.model_participante);
      this.insert.student_id = this.id_alumnos[this.model_participante.indexOf(this.model_participante[0])]
      this.insert.date = this.start;    
      this.insert.reason1 = this.model[0];
      this.insert.reason2 = this.model[1];                           
      console.log(this.insert)
        axios        
          .post("/tutor/register_informal_session/", this.insert)
          .then(res => {
            console.log(res);
            this.$emit("resetList");
            this.$message({ message: "Registro exitoso.", type: "success" });
            this.$emit("resetDialog");
            this.$refs.form.reset();
          })
          .catch(error => {
            console.log(error);
            this.$message.error("Datos duplicados");
          });      
    },

    cancelar() {            
      console.log(this.insert);    
      this.$refs.form.reset();
      this.$emit("resetDialog");
    }
  }
};
</script>