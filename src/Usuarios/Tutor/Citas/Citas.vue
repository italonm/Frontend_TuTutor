<template>
  <el-container direction="vertical">
    <!-- Titulo-->
    <el-row>
      <el-col :span="8">
        <div class="grid-content">
          <h1 style="text-align: center;">
            <i class="fa fa-calendar"></i>&nbsp;Citas programadas
          </h1>
        </div>
      </el-col>
    </el-row>

    <v-card max-width="1200" class="ml-4" max-height="100">
        <v-card-title class="cardAdd justify-center">
            Lista de citas pendientes
        </v-card-title>

        <v-list flat subheader>
          <v-list-item-group
              subgroup
              color = "blue"
              multiple
          >
            <template v-for="(cita, index) in visiblePages">
              <v-list-item :key="index" >         

                <template v-if="fechaTexto > cita.fecha" >
                  <v-subheader>Estado: Fecha pasada</v-subheader>
                  <v-list-item-content style="color: gray">
                    <v-col>
                    <v-list-item-title class="ml-2" >Fecha</v-list-item-title>
                    <v-list-item-subtitle v-text="cita.fecha"></v-list-item-subtitle>
                    </v-col>
                    <v-col>
                    <v-list-item-title >Hora Inicio</v-list-item-title>
                    <v-list-item-subtitle v-text="cita.horaIni"></v-list-item-subtitle>
                    </v-col>
                    <v-col>
                    <v-list-item-title >Hora Fin</v-list-item-title>
                    <v-list-item-subtitle v-text="cita.horaFin"></v-list-item-subtitle>
                    </v-col>
                    <v-col>
                    <v-list-item-title>N.Participantes</v-list-item-title>
                    <v-list-item-subtitle v-text="cita.cant_students"></v-list-item-subtitle>
                    </v-col>
                    <v-col>
                    <v-list-item-title >Ubicación</v-list-item-title>
                    <v-list-item-subtitle v-text="cita.ubicacion"></v-list-item-subtitle>
                    </v-col>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-btn text small  @click="editar(cita)">
                        Resultados
                        <v-icon color="grey lighten-1">mdi-clipboard-outline</v-icon>
                      </v-btn>

                        <v-btn text small @click="cancelar(cita)">
                          Cancelar Cita
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </template>     

                <template v-else>
                  <v-subheader >Estado: Cita pendiente </v-subheader>
                  <v-list-item-content style="color: gray">
                    <v-col>
                    <v-list-item-title >Fecha</v-list-item-title>
                    <v-list-item-subtitle v-text="cita.fecha"></v-list-item-subtitle>
                    </v-col>
                    <v-col>
                    <v-list-item-title >Hora de Inicio</v-list-item-title>
                    <v-list-item-subtitle v-text="cita.horaIni"></v-list-item-subtitle>
                    </v-col>
                    <v-col>
                    <v-list-item-title >Hora fin</v-list-item-title>
                    <v-list-item-subtitle v-text="cita.horaFin"></v-list-item-subtitle>
                    </v-col>
                    <v-col>
                    <v-list-item-title >N.Participantes</v-list-item-title>
                    <v-list-item-subtitle v-text="cita.cant_students"></v-list-item-subtitle>
                    </v-col>
                    <v-col>
                    <v-list-item-title >Ubicación</v-list-item-title>
                    <v-list-item-subtitle v-text="cita.ubicacion"></v-list-item-subtitle>
                    </v-col>
                    </v-list-item-content>

                    <v-list-item-action>

                        <v-btn text small @click="cancelar(cita)">
                          Cancelar Cita
                          <v-icon>mdi-close</v-icon>
                        </v-btn>

                    </v-list-item-action>

                </template>   

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
                  :key="i"
                  link
                >
                  <v-list-item-title v-text="datosAlumno.nombre + ' ' + datosAlumno.apellidos"></v-list-item-title>
                </v-list-item> 
              </v-list-group>

              </v-list-item>
              
              

              <v-divider
                  v-if="index + 1 < listaCitas.length"
                  :key="index"
              ></v-divider>

            </template>
          </v-list-item-group>
        </v-list>

        <v-pagination
                v-model="page"
                :length= "Math.ceil(listaCitas.length/perPage)"
        ></v-pagination>

      </v-card>

    <!--Formulario-->
    <resultadoForm
      :resultado = "resultado"
      :idSesion = "idSesion"
      :listaAlumnos="listaAlumnos"
      :dialog="dialog"
      :action="action"
      v-on:resetDialog="dialog=$event"
      v-on:resetList="listar()"
    ></resultadoForm>
  </el-container>
</template>

<script>
import axios from "axios";
import resultadoF from "./Resultado"
var now     = new Date(); 
var diaActual = now.getFullYear() + "-" + (((now.getMonth()+1) < 10)?"0":"") + (now.getMonth()+1) + "-" + ((now.getDate() < 10)?"0":"") + now.getDate();
export default {
  data() {
    return {
        fechaTexto:diaActual,
        listaCitas:[],
        listaAlumnos:[],
        idSesion:"",
        search: "",
        dialog: false,
        action: "",
        timeDiffInSecond:"",
        horasDif:[],
        page:1,
        perPage: 5,
        resultado:{
        comentario:"",
        asistencia:[],
        },
        cancelarCita:{
          idsesion:""
        }
    }
  },
  created() {
    console.log(JSON.parse(localStorage.getItem("Id_usuario")));
    this.listar();
  },
  computed: {
    visiblePages () {
      return this.listaCitas.slice((this.page - 1)* this.perPage, this.page* this.perPage)
    }
  },
  methods: {
    listar() {
      axios
        .get("http://184.73.231.88:7002/api/tutor/show_list_formal_sessions/"+ JSON.parse(localStorage.getItem("Id_usuario")))
        .then(res => {
          this.listaCitas = res.data.data;
        })
        .catch(error => console.log(error));
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
                  console.log(item.id_session)
                  this.resultado.comentario = res.data.resultado;
                  this.resultado.asistencia = res.data.alumnos;
                  if (this.resultado.comentario !== null){
                    this.action = "Editar resultado de la cita"
                    console.log(this.resultado.comentario);
                    this.dialog = true;
                  }
                  else 
                    this.action = "Crear resultado de la cita"
                    this.dialog = true;
                })
            .catch(error => console.log(error));
          })
      .catch(error => console.log(error));

    },
    cancelar(item){
      this.$confirm(
        "¿Esta seguro de cancelar esta cita?",
        "Advertencia",
        {
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
          type: "warning"
        }
      )
      .then(() => {
        this.cancelarCita.idsesion = item.id_session
        console.log(item.id_session)
        axios
            .post("http://184.73.231.88:7002/api/tutor/cancel_session/", this.cancelarCita)
            .then(res => {
              console.log(res);
              this.listar();
              this.$message({
                message: "Rechazo exitoso",
                type: "success"
              });
            })
            .catch(error => console.log(error));
      })
      .catch(() => {
          this.$message({ type: "info", message: "Cancelación no realizada" });
      });
    }
  },
  components: {
    resultadoForm: resultadoF
  }
}
</script>
