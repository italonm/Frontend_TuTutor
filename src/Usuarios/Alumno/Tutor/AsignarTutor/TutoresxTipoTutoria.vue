<template>
  <div>
    <!---Buscador y listado de tutores--->
    <el-row>
      <el-col :span="8">
        <div class="grid-content">
          <el-input placeholder="Buscar Tutor" v-model="search" clearable>
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="30">
      <el-col :xs="20" :sm="12" :md="12" :lg="8">
        <el-card class="box-group" style="overflow:auto">
          <div v-for="tutor in filterTutor" :key="tutor" class="text item">
            <el-card class="box-card" style="border-style:dashed;">
              <el-row>
                <el-col :sm="5" :xs="5">
                  <v-img
                    class="white--text align-end"
                    height="50px"
                    width="50px"
                    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                  ></v-img>
                </el-col>
                <el-col :xs="11" :sm="10">{{ tutor.t_fullname}}</el-col>
                <el-col :xs="8" :sm="5">
                  <el-button
                    size="small"
                    type="warning"
                    icon="fas fa-plus"
                    @click="showMensaje(tutor)"
                    plain
                  >&nbsp;Info</el-button>
                </el-col>
              </el-row>
            </el-card>
          </div>
        </el-card>
        <br />
      </el-col>
      <!----------------->

      <!------Informacion del tutor------>
      <el-col :xs="20" :sm="12" :md="12" :lg="8">
        <el-card class="box-information" style="overflow:auto; height:480px" v-show="showBox">
          <h5>{{this.tutorInfo.t_fullname}}</h5>
          <v-img
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          ></v-img>
          <br />
          <el-timeline>
            <el-timeline-item :color="this.color" :timestamp="this.tutorInfo.t_code">Codigo:</el-timeline-item>
            <el-timeline-item :color="this.color" :timestamp="this.tutorInfo.t_email">Email:</el-timeline-item>
          </el-timeline>

          <el-row>
            <el-col :xs="12" :sm="15" :md="15">
              <el-button
                type="success"
                icon="fas fa-user-plus"
                @click="solicitarTutor(tutorInfo)"
                plain
              >&nbsp;Solicitar</el-button>
            </el-col>

            <el-col :xs="12" :sm="9" :md="9">
              <v-btn text color="primary" icon="fas fa-search" @click="showHorario(tutorInfo)">
                Horarios
                <i class="el-icon-arrow-right"></i>
              </v-btn>
            </el-col>
          </el-row>
        </el-card>
        <br />
      </el-col>
      <!----------------->

      <!------HORARIO DEL TUTOR------>
      <el-col :xs="20" :sm="12" :md="12" :lg="8">
        <el-card class="box-group" style="overflow:auto;" v-show="showBoxHorario">
          <v-app-bar dark color="green">
            <v-toolbar-title>AGENDA</v-toolbar-title>
          </v-app-bar>
          <div v-for="schedul in customCalendar" :key="schedul" class="text item">
            <v-list class="transparent">
              <!--------->
              <v-list-item >
                <v-list-item-title
                  style="border-right: 3px solid red; font-size: 20px;color:purple; font-weight:bold;"
                >{{ schedul.day[0] }} {{schedul.day[1]}}</v-list-item-title>

                <v-list-item-subtitle class="text-center" v-for="hora in schedul" :key="hora">{{schedul.day[2] }}</v-list-item-subtitle>
              </v-list-item>
              <!--------->
            </v-list>
          </div>
        </el-card>
      </el-col>
      <!----------------->
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tutores: [],
      search: "",
      showBox: false,
      showBoxHorario: false,
      tutorInfo: "",
      scheduler: [],
      customCalendar:[],
      tutoria: {
        s_id_student: "",
        s_code_tutor: "",
        s_tt: ""
      },
      dialog: false,
      color: "#0476D0",
      //dia: ""
    };
  },
  methods: {
    listarTutores() {
      axios
        .get(
          "/student/show_tutors_in_request/" +
            1 /*localStorage.getItem("Id_facultad")*/
        )
        .then(res => {
          this.tutores = res.data.people;

          console.log(this.tutores);
        })
        .catch(error => console.log(error));
    },
    showMensaje(tutor) {
      this.showBox = true;
      console.log(tutor);
      this.tutorInfo = tutor;
      this.showBoxHorario = false;
    },
    showHorario(tutorInfo) {
      this.showBoxHorario = true;
      this.scheduler = tutorInfo.t_schedule;
      this.generateListCalendar();
      //var birthday = new Date("2020-06-13 08:00");
      //var options = { weekday: "long" };
      //this.dia = new Intl.DateTimeFormat("es-PE", options).format(birthday);
    },
    generateListCalendar(){
      console.log("imprime shceduler")
      var etiqueta;
      this.customCalendar=[];
      for (etiqueta of this.scheduler){
        var dias=new Object();
        var birthday = new Date(etiqueta.start);
        var options = { weekday: "long",day: 'numeric'};
        dias.day=new Intl.DateTimeFormat("es-PE", options).format(birthday);
        dias.day=dias.day.split(" ");
        var reg=/ (.+)$/g;
        dias.day[2]=(etiqueta.start).match(reg)+' -'+(etiqueta.end).match(reg);
        this.customCalendar.push(dias);
       
      }
    },
    solicitarTutor(tutor) {
      this.tutoria.s_id_student = localStorage.getItem("Id_usuario");
      this.tutoria.s_code_tutor = tutor.t_code;
      this.tutoria.s_tt = 1;

      axios
        .post("/student/register_assignment/", this.tutoria)
        .then(res => {
          console.log(res);
          this.$message({ message: "Registro exitoso.", type: "success" });
        })
        .catch(error => console.log(error));
    }
  },
  computed: {
    filterTutor: function() {
      console.log(localStorage.getItem("Id_facultad"));
      return this.tutores.filter(tutor => {
        return tutor.t_fullname.toLowerCase().match(this.search.toLowerCase());
      });
    }
  },
  created() {
    this.listarTutores();
  },
  components: {}
};
</script>
<style>
.text {
  font-size: 14px;
}

.item {
  padding: 5px 0;
}

.box-card {
  height: 150px;
  border-radius: 20px;
  cursor: pointer;
  border-color: gray;
  border-width: 1.5px;
}

.box-group {
  height: 480px;
}
.box-information {
  height: 400px;
}
</style>