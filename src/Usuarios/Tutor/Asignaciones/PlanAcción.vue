<template>
  <v-dialog v-model="dialog" persistent max-width="700px">
    <v-card>
      <v-card-title class="cardAdd">
        <h2 class="headline">Plan de Acción</h2>
      </v-card-title>
      <div class="containerPlan">
        <ul class="todo-list js-todo-list"></ul>
        <!-- add the empty state here -->
        <div class="empty-state">
          <i class="checklist-icon fas fa-tasks" style="font-size: 4em;"></i>
          <h2 class="empty-state__title">Agrega una actividad</h2>
          <p class="empty-state__description">Qué actividades tienes planeadas?</p>
        </div>

        <div class="input__div">
          <div class="input__wrapper">
            <input
              type="text"
              placeholder="Tareas a realizar."
              v-model="newTodo"
              @keyup.enter="addTodo"
            />
          </div>
          <div class="border"></div>
        </div>

        <div class="todo-list">
          <!-- Loop Over All Todos -->
          <div v-for="todo in this.todos" :key="todo.id" class="list">
            <!-- Show Label -->
            <label class="material-checkbox">
              <input type="checkbox" v-model="todo.completed" />
              <span></span>
            </label>
            <div
              class="text"
              :class="{completed: todo.completed}"
              v-if="!todo.editing"
              @dblclick="todo.editing = true; editTodoCache=todo.text"
            >{{ todo.text }}</div>
            <!-- Show Text Box -->
            <div class="input__div1" v-else>
              <div class="input__wrapper1">
                <input
                  type="text"
                  v-focus
                  v-model="todo.text"
                  @keyup.enter="editTodo(todo)"
                  @keyup.esc="cancelEdit(todo)"
                  @blur="cancelEdit(todo)"
                />
              </div>
              <div class="border"></div>
            </div>
            <button
              class="TodoItem__delete justify-end"
              style="align-items:flex-end;"
              data-testid="deleteTrigger"
              @click.prevent="deleteItem(todo)"
            >
              <span class="icon">
                <i class="fa fa-trash fa-lg" />
              </span>
            </button>
          </div>
        </div>
      </div>
      <footer>
        <span>{{ remaining }} Tareas pendientes de {{total}}.</span>
      </footer>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="cancelar">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import axios from "axios";
import { bus } from "../../../main";
export default {
  props: ["form", "dialog", "id_assignment", "todos", "auxTodos", "auxData"],
  data() {
    return {
      last_id: 0,
      newTodo: "",
      editTodoCache: "",
    };
  },

  computed: {
    remaining() {
      return this.todos.filter((todo) => !todo.completed).length;
    },
    total() {
      return this.todos.length;
    },
  },

  methods: {
    addTodo() {
      if (this.newTodo.trim() == "") return;
      let todo = {
        id: --this.last_id,
        text: this.newTodo,
        components: false,
        editing: false,
      };
      this.todos.splice(0, 0, todo);
      let aux = {
        id: this.last_id,
        name: this.newTodo,
        state: false,
        is_cancelled: false,
      };
      this.auxTodos.splice(0, 0, aux);
      this.newTodo = "";
    },

    guardar() {
      var to2;
      for (to2 in this.todos) {
        var index = this.auxTodos.findIndex((a) => a.id === this.todos[to2].id);
        this.auxTodos[index].state = this.todos[to2].completed;
      }

      var to;
      for (to in this.auxTodos) {
        if (this.auxTodos[to].id < 0) this.auxTodos[to].id = null;
      }

      var add = {
        id_assignment: this.id_assignment,
        activities: this.auxTodos,
      };
      axios.post("/tutor/edit_activities/", add).catch((error) => {
        console.log(error);
        this.$message.error("No se pudieron guardar los cambios");
        return;
      });
    },

    deleteItem(todo) {
      this.$confirm(
        "¿Esta seguro de que desea eliminar esta actividad?",
        "Advertencia",
        {
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
          type: "warning",
        }
      ).then(() => {
        var index = this.todos.findIndex((a) => a.id === todo.id);
        this.todos.splice(index, 1);
        index = this.auxTodos.findIndex((a) => a.id === todo.id);
        this.auxTodos[index].is_cancelled = true;
      });
    },

    editTodo(todo) {
      if (todo.text.trim() == "") todo.text = this.editTodoCache;
      else {
        var index = this.todos.findIndex((a) => a.id === todo.id);
        this.todos[index].text = todo.text.trim();
        index = this.auxTodos.findIndex((a) => a.id === todo.id);
        this.auxTodos[index].name = todo.text.trim();
        this.editTodoCache = todo.text.trim();
      }
      todo.editing = false;
    },
    cancelEdit(todo) {
      todo.text = this.editTodoCache;
      todo.editing = false;
    },
    cancelar() {
      this.last_id = 0;
      this.guardar();
      bus.$emit("verDetalle", this.auxData);
      this.$emit("resetList");
      this.$emit("resetDialog");
    },
  },

  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
};
</script>
<style scoped>
@import "./Plan.css";
</style>
