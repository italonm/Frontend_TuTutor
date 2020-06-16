<template>
<v-dialog v-model="dialog" persistent max-width="870px" color="color">
      <v-card>
          <v-card-title class="cardAdd justify-center">
             Horario de disponibilidad
          </v-card-title>
            <v-layout wrap>
                <v-col
                sm="12"
                lg="3"
                class="mb-4 controls"
                >
                <v-select
                    v-model="weekdays"
                    :items="weekdaysOptions"
                    label="Rango de días"
                ></v-select>
                <v-text-field
                    v-if="type === 'custom-weekly'"
                    v-model="minWeeks"
                    label="Minimum Weeks"
                    type="number"
                ></v-text-field>
                <v-select
                    v-if="hasIntervals"
                    v-model="intervals"
                    :items="intervalsOptions"
                    label="Intervalos"
                ></v-select>
                <br>
                <h6> Agregar disponibilidad: </h6> 
                <el-select v-model="valueDate" placeholder="Selecciona el día">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <br><br>
                <el-time-select
                  placeholder="Hora inicio"
                  style="width: 100%;"
                  v-model="startTime"
                  :picker-options="{
                    start: '06:00',
                    step: '00:15',
                    end: '22:00'
                  }"
                  >
                </el-time-select>
                <br><br>
                <el-time-select
                  placeholder="Hora fin"
                  v-model="endTime"
                  style="width: 100%;"
                  :picker-options="{
                    start: '06:00',
                    step: '00:15',
                    end: '22:00',
                    minTime: startTime
                  }">
                </el-time-select>
                <br><br>
                <v-btn color="success" width= "110%"  @click="agregarEvento">Añadir al calendario</v-btn>
                </v-col>
            <v-col
            sm="12"
            lg="9"
            class="pl-4"
            >
                <v-sheet height="500" color ="color">
                    <v-calendar
                    ref="calendar"
                    v-model="start"
                    :type="type"
                    :start="start"
                    :min-weeks="minWeeks"
                    :max-days="maxDays"
                    :now="now"
                    :dark="dark"
                    :weekdays="weekdays"
                    :first-interval="intervals.first"
                    :interval-minutes="intervals.minutes"
                    :interval-count="intervals.count"
                    :interval-height="intervals.height"
                    :color="color"
                    :events="events"
                    :event-color="getEventColor"
                    @click:event="showEvent"
                    category-hide-dynamic= "true"
                    >
                    </v-calendar>
                    <v-menu
                        v-model="selectedOpen"
                        :close-on-content-click="false"
                        :activator="selectedElement"
                        offset-x
                        >
                        <v-card
                            color="grey lighten-4"
                            min-width="300px"
                            flat
                        >
                            <v-toolbar
                            :color="selectedEvent.color"
                            dark
                            >
                            <v-spacer></v-spacer>
                            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn icon @click="deleteEvent(selectedEvent)">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                            <v-btn icon @click="selectedOpen = false">
                                <v-icon>mdi-close-circle-outline</v-icon>
                            </v-btn>
                            </v-toolbar>
                            <v-card-text>
                                Inicio del evento: 
                            <span v-html="selectedEvent.start"></span>
                            <br>
                                Fin del evento: 
                            <span v-html="selectedEvent.end"></span>
                            </v-card-text>
                            <v-card-actions>

                            </v-card-actions>
                        </v-card>
                        </v-menu>

                </v-sheet>
            </v-col>
            </v-layout>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" @click="cancelar">Cerrar</v-btn>
            </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';
  const weekdaysDefault = [1, 2, 3, 4, 5, 6, 0]
  const intervalsDefault = {
    first: 0,
    minutes: 60,
    count: 24,
    height: 40
  }
var Id_usuario = JSON.parse(localStorage.getItem("Id_usuario"));
//var now = new Date(); 
//var diaActual = now.getFullYear() + "-" + (((now.getMonth()+1) < 10)?"0":"") + (now.getMonth()+1) + "-" + ((now.getDate() < 10)?"0":"") + now.getDate();
  export default {
    props: ["dialog"],
    data: () => ({
      dark: false,
      startMenu: false,
      startMenuTime:false,
      endMenuTime:false,
      start: "2020-06-01",
      actualidad: "2020-06-01",
      startTime:"",
      endTime:"",
      endMenu: false,
      nowMenu: false,
      minWeeks: 1,
      now: null,
      type: 'week',
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      availableDates: [],
      weekdays: weekdaysDefault,
      weekdaysOptions: [
        { text: 'Lunes - Domingo', value: weekdaysDefault},
        { text: 'Lunes, Miercoles y Viernes', value: [1, 3, 5] },
        { text: 'Lunes - Viernes', value: [1, 2, 3, 4, 5] }
      ],
      intervals: intervalsDefault,
      intervalsOptions: [
        { text: 'Cada hora', value: intervalsDefault },
        { text: 'Cada 30 minutos', value: { first: 0, minutes: 30, count: 48, height: 30 }},
        { text: 'Cada 15 minutos', value: { first: 0, minutes: 15, count: 95, height: 60 }}
      ],
      maxDays: 7,
      color: 'blue',
      events:[],
      schedule:{
        tutor_id:Id_usuario,
        events: []
      },
      eventosAgregados:[],
      borrarEvento:{
        schedule_id:""
      },
      options: [{
          value: "2020-06-01",
          label: 'Lunes'
        }, {
          value: "2020-06-02",
          label: 'Martes'
        }, {
          value: "2020-06-03",
          label: 'Miercoles'
        }, {
          value: "2020-06-04",
          label: 'Jueves'
        }, {
          value: "2020-06-05",
          label: 'Viernes'
        },{
          value: "2020-06-06",
          label: 'Sabado'
        },{
          value: "2020-06-07",
          label: 'Domingo'
        },
        
        ],
        valueDate: ''
    }),
    computed: {
      hasIntervals () {
        return this.type in {
          'week': 1, 'day': 1, '4day': 1, 'custom-daily': 1
        }
      },
      hasEnd () {
        return this.type in {
          'custom-weekly': 1, 'custom-daily': 1
        }
      }
    },
    created() {
    this.listar();
    },
    methods: {
      listar() {
      axios
        .get("/tutor/show_schedule/"+Id_usuario)
        .then(res => {
          this.events = res.data.schedules;
        })
        .catch(error => console.log(error));
     },
      getEventColor (event) {
        return event.color
      },
      cancelar() {
      this.newDialog = false;
      this.$emit("resetDialog", this.newDialog);
      this.listar();
      },
      agregarEvento(){
        this.eventosAgregados.push({id:null , name: "Disponible",
                          start: this.valueDate +" "+ this.startTime,
                          end: this.valueDate +" "+ this.endTime, color:"green"})
        this.schedule.events = this.eventosAgregados;
        console.log(this.schedule);
        axios
          .post("/tutor/add_schedule/", this.schedule)
          .then(res => {
            console.log(res);
            this.listar();
          })
          .catch(error => {
            console.log(error);
            this.$message.error("Error al registrar datos");
          });
        this.events.push({id:null , name: "Disponible",
                          start: this.valueDate +" "+ this.startTime,
                          end: this.valueDate +" "+ this.endTime, color:"green"})                  
        console.log(this.events); 
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => this.selectedOpen = true, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      deleteEvent(selectedEvent){
        this.borrarEvento.schedule_id = selectedEvent.id;
        console.log(this.borrarEvento.schedule_id);
        if(selectedEvent.name == "Reservado"){
          this.$message.error("Evento reservado. No se puede eliminar");
        }
        else if (selectedEvent.name == "Disponible"){
          axios
            .post("/tutor/delete_schedule/", this.borrarEvento)
            .then(res => {
              this.selectedOpen = false
              console.log(res);
              this.$message({ message: "Eliminación exitosa.", type: "success" });
              console.log(this.events);
              this.listar();
            })
            .catch(error => {
              console.log(error);
              this.$message.error("No se pudo eliminar");
            });
        }
      },
    }
  }
</script>

<style>
.theme--light.v-btn {
    color: rgba(0, 0, 0, 0);
}
.v-calendar-daily_head-day {
    height: 25px;
    flex: 1 1 auto;
    width: 0;
    position: relative;
}
.v-btn--fab.v-size--default {
    height: 0px;
    width: 0px;
}
</style>