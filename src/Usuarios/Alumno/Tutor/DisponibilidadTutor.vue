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
                <v-btn
                    fab
                    small
                    absolute
                    left
                    color="primary"
                    @click="$refs.calendar.prev()"
                >
                    <v-icon dark>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn
                    fab
                    small
                    absolute
                    right
                    color="primary"
                    @click="$refs.calendar.next()"
                >
                    <v-icon dark>mdi-chevron-right</v-icon>
                </v-btn>
                <br><br><br>
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
                            <v-btn icon @click="deleteEvent(selectedEvent.id)">
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
  const weekdaysDefault = [1, 2, 3, 4, 5, 6, 0]
  const intervalsDefault = {
    first: 0,
    minutes: 60,
    count: 24,
    height: 40
  }
var now = new Date(); 
var diaActual = now.getFullYear() + "-" + (((now.getMonth()+1) < 10)?"0":"") + (now.getMonth()+1) + "-" + ((now.getDate() < 10)?"0":"") + now.getDate();
  export default {
    props: ["dialog", "eventos"],
    data: () => ({
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
        tutor_id:97,
        events: []
      },
      eventosAgregados:[],
      borrarEvento:{
        schedule_id:""
      }
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
        console.log("mostrar eventos");
        this.events=this.eventos;
        console.log(this.eventos);
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
                          start: this.start +" "+ this.startTime,
                          end: this.start +" "+ this.endTime, color:"blue"})
        this.schedule.events = this.eventosAgregados;
        console.log(this.schedule);
        
        this.events.push({id:null , name: "Disponible",
                          start: this.start +" "+ this.startTime,
                          end: this.start +" "+ this.endTime, color:"blue"})                  
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
      deleteEvent(selectedEventID){
        this.borrarEvento.schedule_id = selectedEventID;
        console.log(this.borrarEvento.schedule_id);
        
      },
    }
  }
</script>