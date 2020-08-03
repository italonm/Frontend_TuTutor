<template>
  <el-container direction="vertical">
    <!-- Titulo-->
    <el-row>
      <el-col :span="11">
        <div class="grid-content">
          <h1 style="text-align: left; font-family: 'Basic', sans-serif;font-weight:600;">
            Alumnos
            <h6 class="text-muted mb-3">Alumnos Asignados</h6>
          </h1>
          <div class="searchBox">
            <el-input placeholder="Buscar alumno" v-model="search" clearable>
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
        </div>
      </el-col>

      <el-col :span="12">
        <div class="grid-content">
          <h1 style="text-align: left; font-family: 'Basic', sans-serif;font-weight:600;">
            Tutorías
            <h6 class="text-muted mb-3">Tutorías con {{namae}}</h6>
          </h1>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="11">
        <alumnos
          v-for="(alumno, idx) in alumnosFiltrados"
          :key="idx"
          :alumno="alumno"
          :back="backAlumnos[idx]"
          :left="leftAlumnos[idx]"
        ></alumnos>
      </el-col>
      <el-col :span="12">
        <div class="containerBody">
          <h3 class="mt-10" v-if="show">Seleccione un alumno</h3>
          <asignaciones
            v-else
            v-for="(comp, ind) in asignaciones"
            :key="ind"
            :comp="comp"
            :name="namae"
            :callMethod="parentMethod"
            :auxData="auxData"
          ></asignaciones>
        </div>
      </el-col>
    </el-row>

    <!--Formulario-->
    <plan
      :form="form"
      :dialog="dialog"
      :id_assignment="id_assign"
      :todos="todos"
      :auxTodos="auxTodos"
      :auxData="auxData"
      v-on:resetDialog="dialog=false"
      v-on:resetList="listarAsignaciones(auxData)"
      v-on:rerender="rerender()"
    ></plan>
  </el-container>
</template>

<script>
import axios from "axios";
import Plan from "./PlanAcción.vue";
import { bus } from "../../../main";
import Alumnos from "./Alumnos.vue";
import Asignaciones from "./Elemento.vue";

export default {
  data() {
    return {
      search: "",
      components: [],
      namae: "",
      dialog: false,
      id_assign: 1,
      show: true,
      ind: 0,
      form: {},
      todos: [],
      auxTodos: [],
      alumnos: [],
      leftAlumnos: ["#E5F8F8", "#FCD1CB", "#E5E3F9", "#FDE9D0"],
      backAlumnos: ["#A9DAC7", "#FC6D5D", "#293B61", "#FC9A1F"],
      auxData: [],
      programas: [],
    };
  },
  computed: {
    asignaciones() {
      return this.components;
    },
    alumnosFiltrados() {
      return this.alumnos.filter((post) => {
        return post.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  created() {
    bus.$on("verDetalle", (data) => {
      this.namae = data.name + " " + data.last_name;
      this.listarAsignaciones(data);
      this.show = false;
    });
    bus.$on("verEstado", (data) => {
      this.listarAux(data);
    });
    this.listar();
  },
  methods: {
    listarAux(data) {
      var username = localStorage.getItem("Token");
      username = username.slice(1, username.length - 1);
      var password = "";
      var token = new Buffer(username + ":" + password).toString("base64");
      axios
        .get(
          "/tutor/show_assignments_from_student/" +
            localStorage.getItem("Id_usuario") +
            "/" +
            data.id,
          {
            headers: {
              Authorization: `Basic ${token}`,
            },
          }
        )
        .then((response) => {
          this.components = response.data.assignments;
        });
    },
    listarAsignaciones(data) {
      this.auxData = data;
      var username = localStorage.getItem("Token");
      username = username.slice(1, username.length - 1);
      var password = "";
      var token = new Buffer(username + ":" + password).toString("base64");
      axios
        .get(
          "/tutor/show_assignments_from_student/" +
            localStorage.getItem("Id_usuario") +
            "/" +
            data.id,
          {
            headers: {
              Authorization: `Basic ${token}`,
            },
          }
        )
        .then((response) => {
          this.components = response.data.assignments;
        });
    },
    parentMethod: function (id) {
      this.id_assign = id;
      var iter;
      this.todos = [];
      this.auxTodos = [];
      axios.get("/tutor/show_activities/" + id).then((res) => {
        for (iter in res.data.activities) {
          var aux = {
            id: 1,
            text: "",
            completed: false,
            editing: false,
          };
          var aux2 = {
            id: 1,
            name: "",
            state: false,
            is_cancelled: false,
          };
          aux.id = res.data.activities[iter].id;
          aux2.id = aux.id;
          aux.text = res.data.activities[iter].activity;
          aux2.name = aux.text;
          if (res.data.activities[iter].state === "Terminado") {
            aux.completed = true;
            aux2.state = true;
          }
          this.todos.push(aux);
          this.auxTodos.push(aux2);
        }
      });
      this.dialog = true;
    },
    listar() {
      this.alumnos = [];
      var username = localStorage.getItem("Token");
      username = username.slice(1, username.length - 1);
      var password = "";
      var token = new Buffer(username + ":" + password).toString("base64");
      axios
        .get(
          "/tutor/show_students_from_tutor/" +
            localStorage.getItem("Id_usuario"),
          {
            headers: {
              Authorization: `Basic ${token}`,
            },
          }
        )
        .then((response) => {
          var alumno;
          for (alumno in response.data.students) {
            var aux = {
              name: "",
              last_name: "",
              code: null,
              program_name: "",
              id: null,
              back: "",
              left: "",
            };
            aux.name = response.data.students[alumno].name;
            aux.id = response.data.students[alumno].id;
            aux.code = response.data.students[alumno].code;
            aux.last_name = response.data.students[alumno].last_name;
            aux.program_name = response.data.students[alumno].program_name;
            var index = this.programas.findIndex(
              (a) => a.program_name === aux.program_name
            );
            if (index >= 0) {
              aux.back = this.programas[index].back;
              aux.left = this.programas[index].left;
            } else {
              var program = {
                program_name: aux.program_name,
                back: this.backAlumnos[this.ind],
                left: this.leftAlumnos[this.ind++],
              };
              aux.back = program.back;
              aux.left = program.left;
              this.programas.push(program);
            }
            this.alumnos.push(aux);
          }
        });
    },
  },
  components: {
    asignaciones: Asignaciones,
    plan: Plan,
    alumnos: Alumnos,
  },
};
</script>
<style>
@import "./Asignaciones.css";
</style>
