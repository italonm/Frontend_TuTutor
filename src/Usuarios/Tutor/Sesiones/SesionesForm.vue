<template>
  <v-dialog v-model="dialog" persistent max-width="700px">
    <v-card>
      <v-card-title class="cardAdd">
        <h2 class="headline">{{action}}</h2>
      </v-card-title>
      <v-card-text>
        <v-container>            
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
              <h5 v-if="option">Selecciona tu facultad</h5>               

              <v-chip-group
                column
                active-class="primary--text"                                
                v-if="option"
              >     
                <v-chip filter v-for="facultad in facultades" :key="facultad.program_name" :value="facultad.program_name"                                                              
                  class="ma-2"
                  color="primary"
                  outlined    
                  @click="cargarAlumnos(facultad.program_id)"
                >
                  <v-avatar left>
                    <v-icon>mdi-account-circle</v-icon>
                  </v-avatar>
                  {{facultad.program_name}}
                </v-chip>
              </v-chip-group> 
            
              <v-select     
                v-if = "option"    
                v-model="participante"                         
                :items="alumnos"     
                :disabled="show"              
                :rules="[v => !!v || 'Seleccione un participante']"
                required         
                hide-selected      
                item-text="person_full_name"
                item-value="person_full_name"        
                label="Seleccione un participante"              
                small-chips
                clearable
                return-object              
              >              
              </v-select>

              <v-menu
                  v-if="option"
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
                      :rules="nameValidation" 
                      required       
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
                v-if="option"
                v-model="insert.start_hour"
                :rules="[v => !!v || 'Seleccione una hora de inicio']"
                required       
                :picker-options="{
                  start:'08:00',
                  step:'00:15',
                  end:'23:00'
                }"
                placeholder="Hora Inicio"
                style="display: inline-block">
              </el-time-select>
              <el-time-select
                v-if="option"
                v-model="insert.end_hour"
                :rules="[v => !!v || 'Seleccione una hora de fin']"
                :picker-options="{
                  start:'08:00',
                  step:'00:15',
                  end:'23:00'
                }"
                placeholder="Hora Fin"
                class="ml-5"
                style="display: inline-block">
              </el-time-select>            
              <v-text-field v-if="option" v-model="insert.place" label="Lugar o medio utilizado (Links)" ></v-text-field>
              <v-select
                v-if="option"
                v-model="motivos"
                :items="items"   
                :rules="[v => !!v || 'Seleccione al menos 1 motivo']"                                       
                label="Motivo de la sesión (Máx. 2 motivos)"
                multiple                
                small-chips
                clearable
                return-object
              >              
              </v-select>
              <br>            
              <h5>Resultado de la sesión <small style="padding-left:26%;">Última modificación {{form.last_modified}}</small></h5>                      
              <v-textarea
              v-model="form.resultado"
              background-color="#E5F8F8"
              color="#6B9486"
              counter
              no-resize
              full-width
              single-line                
              height="80px"
              ></v-textarea>              
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
  props: ["facultades", "dialog", "action", "form", "option"],  
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
        .get("/coordinator/show_students/" + item)      
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
      else if (this.action == "Detalles de la sesión") this.editar();
    },

    insertar() {  
      this.$refs.form.validate();
      if (this.valid) {                  
        this.insert.tutor_id = localStorage.getItem("Id_usuario");    
        console.log(this.participante)  
        this.insert.student_id = this.participante.person_id
        this.insert.date = this.start            
        this.insert.reason1 = this.motivos[0];
        this.insert.reason2 = this.motivos[1]; 
        this.insert.result = this.form.resultado                                                  
        axios        
        .post("/tutor/register_informal_session/", this.insert)
        .then(() => {                  
          this.$emit("resetList");
          this.$message({ message: "Registro exitoso.", type: "success" });
          this.$emit("resetDialog");
          this.$refs.form.reset();
        })
        .catch(error => {
          console.log(error);
          this.$message.error("Datos incompletos");
        });  
      }
      else this.$message.error("Datos incorrectos");
    },

    editar(){
      var edit = {
        idsesion:this.form.id,
        resultado:this.form.resultado
      }      
      axios
      .post("http://184.73.231.88:7002/api/tutor/edit_result/",edit)
      .then(res=>{
        if(res!==null)
          this.$message.success("Resultado actualizado")        
        this.$emit("resetList")
      })
      .catch(error=>{
        console.log(error)
        this.$message.error("No se pudo actualizar el resultado")
      })      
      this.$emit("resetDialog")
      },

    cancelar() {                  
      this.$refs.form.reset();
      this.$emit("resetDialog");
    }
  }
};
</script>