<template>
  <el-container direction="vertical">
    <!-- Titulo-->
    <el-row>
      <el-col :span="8">
          <h1 style="text-align: center;">
            <i class="fas fa-people-arrows"></i>&nbsp;Asignaciones vigentes
          </h1>
      </el-col>
    </el-row>

    <v-card max-width="1200" class="ml-4" >              
      <v-card max-width="1200" class="ml-4 ">
        <v-row>
            <v-card-title class="cardAdd layout justify-center ml-3">
                Asignaciones
            </v-card-title>        
        </v-row>
        <v-list flat subheader height="460px" class="scroll">
          <v-list-item-group
              subgroup
              color = "blue"
              multiple
          >
          <template v-if="Object.keys(asignacionesFacultad).length == 0">
                  <v-list-item-content style="color: gray">
                  <v-subheader
                style="border-bottom: 2px solid blue;color:#205BD9;font-weight:bold;">No hay citas pendientes a mostrar</v-subheader>
                  </v-list-item-content>
          </template>

          <template v-for="(asignación,j) in asignacionesFacultad">
            <v-list-item :key="'F'+j" > 

                <v-list-item-content style="color: blue">
                  <v-subheader
                    style="border-bottom: 2px solid orange;color:#D97F20;font-weight:bold;"
                  v-text="j"></v-subheader>
                </v-list-item-content>
            </v-list-item>

            <template v-for="alumno in asignación">              
              <v-list :key="'H'+alumno.id_session">
              <v-list-group
                    sub-group
                    no-action
                >

                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>Alumnos asignados</v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item
                  v-for="(datosAlumno, i) in cita.alumnos"
                  :key="'I'+i"
                  link
                >
                  <v-list-item-title v-text="datosAlumno.codigo + ' ' + datosAlumno.nombre + ' ' + datosAlumno.apellidos"></v-list-item-title>
                    <v-btn text small  @click="editar(cita)">
                        Resultados
                        <v-icon color="grey lighten-1">mdi-clipboard-outline</v-icon>
                    </v-btn>
                </v-list-item> 
              </v-list-group>
              </v-list>
                       

            </template>
          </template>
          </v-list-item-group>
        </v-list>            
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
export default {
    data(){
        return{
            asignacionesFacultad: []
        }        
    }
}
</script>