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


            <v-select                  
              v-model="participante"
              :items="alumnos"   
              :disabled="show"           
              hide-selected      
              item-text="person_full_name"        
              label="Participante"
              id="comboParticipante"                 
              multiple              
              small-chips
              clearable
              return-object
              select
            >              
            </v-select>


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
            <el-time-select
              v-model="insert.start_hour"
              :picker-options="{
                start:'08:00',
                step:'00:15',
                end:'23:00'
              }"
              placeholder="Hora Inicio"
              style="display: inline-block">
            </el-time-select>
            <el-time-select
              v-model="insert.end_hour"
              :picker-options="{
                start:'08:00',
                step:'00:15',
                end:'23:00'
              }"
              placeholder="Hora Fin"
              class="ml-5"
              style="display: inline-block">
            </el-time-select>            
            <v-text-field v-model="insert.place" label="Lugar" persistent-hint hint="Ingrese el lugar o el medio utilizado" ></v-text-field>
            <v-select
              v-model="motivos"
              :items="items"              
              hide-selected
              hint="Máximo de 2 motivos"
              label="Motivo de la sesión"
              multiple
              persistent-hint
              small-chips
              clearable
              return-object
            >              
            </v-select>
            <br>            
            <h5>Resultado de la sesión</h5>        
            <v-container class="grey lighten-5">
                <v-textarea
                v-model="insert.result"
                counter
                no-resize
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
      show:true,
      inicio: "",
      fin:"",
      insert:{     
        student_id: null,
        tutor_id: null,
        reason1:"",
        reason2:"",
        place:"",
        result:"", 
        date:"",    
        start_hour:"",
        end_hour:""   
      },
      motivos: [],
      participante: [],
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
    };
  },  
  watch: {
    motivos (val) {
      if (val.length > 2) {
        this.$nextTick(() => this.motivos.pop())
      }
    },
    participante (val){
      if (val.length > 1 && this.action == "Registrar nueva sesión") {
        this.$nextTick(() => this.participante.pop())
      }
    }
  },

  methods: { 
    cargarAlumnos(item){   
      this.show=false    
      this.participante=[]
      axios
        .get("/coordinator/show_students/" + this.form.id_facultades[this.form.facultades.indexOf(item)])      
        .then(res =>{                    
          this.alumnos = res.data.users;          
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
      this.insert.student_id = this.participante[0].person_id
      this.insert.date = this.start            
      this.insert.reason1 = this.motivos[0];
      this.insert.reason2 = this.motivos[1];                                             
      console.log(this.insert)
      axios        
      .post("/tutor/register_informal_session/", this.insert)
      .then(res => {        
        console.log(res)
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
      this.$refs.form.reset();
      this.$emit("resetDialog");
    }
  }
};
</script>