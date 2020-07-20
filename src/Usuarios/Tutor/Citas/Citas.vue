<template>
  <el-container direction="vertical">
    <!-- Titulo-->
    <el-row>
      <el-col :span="8">
          <h1 style="text-align: center;">
            <i class="fa fa-calendar"></i>&nbsp;Citas programadas
          </h1>
      </el-col>
    </el-row>


    <v-card max-width="1200" class="ml-4" >
      <v-row>
        <v-card-title class="cardAdd layout justify-center ml-3">
            Próximas citas
        </v-card-title>
        <v-card-actions class="cardAdd mr-3">
            <v-btn color='white'
            icon
            @click="show = !show"
            >
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
        </v-card-actions>
      </v-row>

        <v-expand-transition>
          <div v-show = "show">
            <v-divider></v-divider>


          <v-list flat subheader  height="460px" class="scroll">
            <v-list-item-group
                subgroup
                color = "blue"
                multiple
            >
            <template v-if="Object.keys(grupoProximasCitas).length == 0">
                    <v-list-item-content style="color: gray">
                    <v-subheader
                  style="border-bottom: 2px solid blue;color:#205BD9;font-weight:bold;">No hay citas agendadas actualmente</v-subheader>
                    </v-list-item-content>
            </template>

            <template v-for="(prox,i) in grupoProximasCitas">
              <v-list-item :key="'A'+ i" > 

                  <v-list-item-content style="color: gray">
                    <v-subheader
                  style="border-bottom: 2px solid orange;color:#D97F20;font-weight:bold;"
                    v-text="i"></v-subheader>
                  </v-list-item-content>

              </v-list-item>
              <template v-for="(cita, index) in prox">          
                <v-list-item :key="'B'+cita.id_session" > 
                  
                    <v-list-item-content style="color: gray">
                      <v-col>
                      <v-list-item-title >Horario</v-list-item-title>
                      <v-list-item-subtitle v-text="cita.horaIni +'-'+cita.horaFin"></v-list-item-subtitle>
                      </v-col>
                      <template v-if="cita.ubicacion === ''">
                        <v-col>
                        <v-list-item-title >Sesión Virtual</v-list-item-title>
                        <a :href="cita.link" target="_blank">Enlace de la reunión</a>
                        </v-col>
                      </template>

                      <template v-else>
                        <v-col>
                        <v-list-item-title >Ubicación</v-list-item-title>
                        <v-list-item-subtitle v-text="cita.ubicacion"></v-list-item-subtitle>
                        </v-col>
                      </template>

                      <v-col>
                      <v-list-item-title >Cant.Participantes</v-list-item-title>
                      <v-list-item-subtitle v-text="cita.cant_students"></v-list-item-subtitle>
                      </v-col>
                    </v-list-item-content>

                      <v-list-item-action>

                          <v-btn text small  @click="editarLugar(cita)">
                            Editar Lugar
                            <v-icon color="grey lighten-1">mdi-clipboard-outline</v-icon>
                          </v-btn>

                          <v-btn text small @click="cancelarDialog(cita)">
                            Cancelar Cita
                            <v-icon>mdi-close</v-icon>
                          </v-btn>

                      </v-list-item-action>

                </v-list-item>

                <v-list :key="'C'+cita.id_session">
                <v-list-group
                      sub-group
                      no-action
                  >

                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title>Alumnos</v-list-item-title>
                    </v-list-item-content>
                  </template>

                  <v-list-item
                    v-for="(datosAlumno, i) in cita.alumnos"
                    :key="'D'+i"
                    link
                  >
                    <v-list-item-title v-text="datosAlumno.codigo + ' ' + datosAlumno.nombre + ' ' + datosAlumno.apellidos"></v-list-item-title>
                  </v-list-item> 
                  </v-list-group>
                </v-list>
                
                <v-divider
                    v-if="index + 1 < listaProximasCitas.length"
                    :key="'E'+cita.id_session"
                ></v-divider>

              </template>
            </template>
            </v-list-item-group>
          </v-list>

          </div>
          </v-expand-transition>

      </v-card>

      <br>

      <v-card max-width="1200" class="ml-4 ">
        <v-row>
        <v-card-title class="cardAdd layout justify-center ml-3">
            Citas pasadas sin resultado
        </v-card-title>
        <v-card-actions class="cardAdd mr-3">
            <v-btn color='white'
            icon
            @click="show2 = !show2"
            >
            <v-icon>{{ show2 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
        </v-card-actions>
      </v-row>

        <v-expand-transition>
          <div v-show = "show2">
            <v-divider></v-divider>

        <v-list flat subheader height="460px" class="scroll">
          <v-list-item-group
              subgroup
              color = "blue"
              multiple
          >
          <template v-if="Object.keys(grupoCitasSinResultados).length == 0">
                  <v-list-item-content style="color: gray">
                  <v-subheader
                style="border-bottom: 2px solid blue;color:#205BD9;font-weight:bold;">No hay citas pendientes a mostrar</v-subheader>
                  </v-list-item-content>
          </template>

          <template v-for="(proxSin,j) in grupoCitasSinResultados">
            <v-list-item :key="'F'+j" > 

                <v-list-item-content style="color: blue">
                  <v-subheader
                    style="border-bottom: 2px solid orange;color:#D97F20;font-weight:bold;"
                  v-text="j"></v-subheader>
                </v-list-item-content>
            </v-list-item>

            <template v-for="(cita, index) in proxSin">
              <v-list-item :key="'G'+ cita.id_session" >         

                  <v-list-item-content style="color: gray">
                    <v-col>
                    <v-list-item-title >Horario</v-list-item-title>
                    <v-list-item-subtitle v-text="cita.horaIni +'-'+cita.horaFin"></v-list-item-subtitle>
                    </v-col>
                    <template v-if="cita.ubicacion === ''">
                        <v-col>
                        <v-list-item-title >Sesión Virtual</v-list-item-title>
                        <a :href="cita.link" target="_blank">Enlace de la reunión</a>
                        </v-col>
                      </template>

                      <template v-else>
                        <v-col>
                        <v-list-item-title >Ubicación</v-list-item-title>
                        <v-list-item-subtitle v-text="cita.ubicacion"></v-list-item-subtitle>
                        </v-col>
                      </template>
                    <v-row>
                    <v-list-item-title>Cant.Participantes</v-list-item-title>
                    <v-list-item-subtitle v-text="cita.cant_students"></v-list-item-subtitle>
                    </v-row>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-btn text small  @click="editar(cita)">
                        Resultados
                        <v-icon color="grey lighten-1">mdi-clipboard-outline</v-icon>
                      </v-btn>

                        <v-btn text small @click="cancelarDialog(cita)">
                          Cancelar Cita
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-list-item-action>

              </v-list-item>

              <v-list :key="'H'+cita.id_session">
              <v-list-group
                    sub-group
                    no-action
                >

                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>Alumnos</v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item
                  v-for="(datosAlumno, i) in cita.alumnos"
                  :key="'I'+i"
                  link
                >
                  <v-list-item-title v-text="datosAlumno.codigo + ' ' + datosAlumno.nombre + ' ' + datosAlumno.apellidos"></v-list-item-title>
                </v-list-item> 
              </v-list-group>
              </v-list>

         
              <v-divider
                  v-if="index + 1 < listaCitasSinResultados.length"
                  :key="'J'+cita.id_session"
              ></v-divider>

            </template>
          </template>
          </v-list-item-group>
        </v-list>
      </div>
      </v-expand-transition>

      </v-card>

      <br>

      <v-row justify="center">
      <v-dialog v-model="dialogCancelar" persistent max-width="650">
        <v-card>
          <v-card-title class="headline">
            {{
            "Para cancelar la cita, seleccione un motivo de rechazo" }}
          </v-card-title>
            <v-col>
                <v-overflow-btn
                  v-model="motivos"
                  :items="rechazos"
                  label="Motivos de rechazo"
                  target="#dropdown-example"
                  :dense="dense"
                ></v-overflow-btn>
            </v-col>
          <v-card-text>Nota 1: Al cancelar la cita, esta no podrá ser revertida</v-card-text>
          <v-card-text>Nota 2: El motivo elegido será mostrado al alumno a través de un correo electrónico.</v-card-text>
          <v-col>
          <v-btn color="blue darken-1" text @click="cancelar()" >Cerrar</v-btn>
          <v-btn color="green darken-1" text @click="cancelarCita()" > Enviar motivo y cancelar cita </v-btn>
          </v-col>
        </v-card>
      </v-dialog>
    </v-row>




    <!--Formulario-->
    <resultadoForm
      :listaDerivados = "listaDerivados"
      :resultado = "resultado"
      :idSesion = "idSesion"
      :listaAlumnos="listaAlumnos"
      :dialog="dialog"
      :action="action"
      v-on:resetDialog="dialog=$event"
      v-on:resetList="listar()"
    ></resultadoForm>

    <editarLugarForm
      :idSesion = "idSesion"
      :dialogLugar="dialogLugar"
      v-on:resetDialog="dialogLugar=$event"
      v-on:resetList="listar()"
    ></editarLugarForm>
  </el-container>
</template>

<script>
import axios from "axios";
import resultadoF from "./Resultado"
import editarLugarF from "./Lugar"
var now     = new Date(); 
var diaActual = now.getFullYear() + "-" + (((now.getMonth()+1) < 10)?"0":"") + (now.getMonth()+1) + "-" + ((now.getDate() < 10)?"0":"") + now.getDate();
var horaActual = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
export default {
  data() {
    return {
        show:true,
        show2:true,
        fechaTexto:diaActual,
        listaCitas:[],
        listaAlumnos:[],
        listaCitasSinResultados:[],
        listaProximasCitas:[],
        listaDerivados:[],
        dialogCancelar:false,
        grupoCitasSinResultados:[],
        grupoProximasCitas:[],
        rechazos: [],
        motivos: null,
        contadorProxCitas:0,
        contadorSinResultados:0,
        idSesion:"",
        search: "",
        dialog: false,
        dialogLugar:false,
        action: "",
        dense:true,
        timeDiffInSecond:"",
        horasDif:[],
        page:1,
        perPage: 5,
        pageProx:1,
        perPageProx: 5,
        resultado:{
        comentario:"",
        asistencia:[],
        },
        cancelarCitaDatos:{
          idsesion:""
        }
    }
  },
  created() {
    this.listar();
    this.listarRechazos();
  },
  methods: {
    listar() {
      axios
        .get("http://184.73.231.88:7002/api/tutor/show_list_formal_sessions/"+ JSON.parse(localStorage.getItem("Id_usuario")))
        .then(res => {
          this.listaCitas = res.data.data;
          this.ordenarCitas();
        })
        .catch(error => console.log(error));
    },
    listarRechazos() {      
      axios
        .get("http://184.73.231.88:7002/api/tutor/show_reasons_rejection/")
        .then(res => {
          this.rechazos = res.data.reasons;
          this.motivos = this.rechazos[0];
        })
        .catch(error => console.log(error));
    },
    ordenarCitas(){
      this.listaCitasSinResultados=[];
      this.listaProximasCitas=[];
      var index = 0;
      var datodeCita=[];
      for (index;index < this.listaCitas.length;index++){
        datodeCita = this.listaCitas[index];
        if (datodeCita.fecha < diaActual){
          this.listaCitasSinResultados.push(datodeCita);
        }
        else if (datodeCita.fecha == diaActual){
          if(datodeCita.horaFin<horaActual){
            this.listaProximasCitas.push(datodeCita);
          }
          else{
            this.listaCitasSinResultados.push(datodeCita);
          }
        }
        else{
            this.listaProximasCitas.push(datodeCita);
        }
      }
      this.listaCitasSinResultados.sort(function (a, b) {
        if (a.fecha > b.fecha) {
          return -1;
        }
        if (a.fecha < b.fecha) {
          return 1;
        }
        // a must be equal to b
        return 0;
      });
      this.listaProximasCitas.sort(function (a, b) {
        if (a.fecha > b.fecha) {
          return 1;
        }
        if (a.fecha < b.fecha) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });

      var groupsSinResult = {};

      this.listaCitasSinResultados.forEach(function(val) {
        var options = {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric"
        };
          var birthday = new Date(val.fecha);
          birthday.setDate(birthday.getDate() + 1);
          var date = new Intl.DateTimeFormat("es-PE", options).format(
          birthday
        );
          if (date in groupsSinResult) {
              groupsSinResult[date].push(val);
          } else {
              groupsSinResult[date] = new Array(val);
          }
      });
      this.grupoCitasSinResultados = groupsSinResult;

      var groupsProxCit = {};

      this.listaProximasCitas.forEach(function(val) {
        var options = {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric"
        };
          var birthday = new Date(val.fecha);
          birthday.setDate(birthday.getDate() + 1);
          var date = new Intl.DateTimeFormat("es-PE", options).format(
          birthday
        );
          if (date in groupsProxCit) {
              groupsProxCit[date].push(val);
          } else {
              groupsProxCit[date] = new Array(val);
          }
      });
      this.grupoProximasCitas = groupsProxCit;

    },
    editar(item) {
      axios
          .get("/tutor/show_all_students_in_session/"+ item.id_session)
          .then(res => {
            this.listaAlumnos = res.data.data;
            this.idSesion = item.id_session
            axios
                .get("http://184.73.231.88:7002/api/tutor/show_result/"+ item.id_session)
                .then(res => {
                  this.resultado.comentario = res.data.resultado;
                  this.resultado.asistencia = res.data.alumnos;
                  if (this.resultado.comentario !== null){
                    this.action = "Editar resultado de la cita"
                    this.dialog = true;
                  }
                  else 
                    this.action = "Crear resultado de la cita"
                    this.dialog = true;
                  axios
                    .get("http://184.73.231.88:5000/api/coordinator/show_support_units/"+ localStorage.getItem("Id_institución"))
                    .then(res => {
                      this.listaDerivados = res.data.users;
                    })
                    .catch(error => console.log(error));  
                })
            .catch(error => console.log(error));
          })
      .catch(error => console.log(error));

    },
    editarLugar(item){
      this.idSesion = item.id_session;
      this.dialogLugar = true;

    },
    cancelar() {
      this.dialogCancelar = false;
      this.$emit("resetDialog", this.dialogCancelar);
    },
    cancelarDialog(item){
      this.citaGuardar = item
      this.dialogCancelar = true;
    },
    cancelarCita(){
        this.cancelarCitaDatos.idsesion = this.citaGuardar.id_session;
        this.cancelarCitaDatos.motivo = this.motivos;
        axios
            .post("http://184.73.231.88:7002/api/tutor/cancel_session/", this.cancelarCitaDatos)
            .then(res => {
              console.log(res);
              this.listar();
              this.$message({
                message: "Cancelación exitosa. Se le envió un correo electrónico al estudiante",
                type: "success"
              });
              this.dialogCancelar = false;
              this.$emit("resetDialog", this.dialogCancelar);
            })
            .catch(error => console.log(error));
    }
  },
  components: {
    resultadoForm: resultadoF,
    editarLugarForm: editarLugarF
  }
}
</script>
<style> 
.scroll {
   overflow-y: scroll
}
</style>
