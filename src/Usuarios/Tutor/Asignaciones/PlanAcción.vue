<template>
    <v-dialog v-model="dialog" persistent max-width="700px">
        <v-card >
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
                    <input type="text" placeholder="Tareas a realizar." v-model="newTodo" @keyup.enter="addTodo" />
                    </div>
                    <div class="border"></div>
                </div>

                <div class="todo-list">
                    <!-- Loop Over All Todos -->
                    <div v-for="todo in todos" :key="todo.id" class="list">
                    <!-- Show Label -->
                        <label class="material-checkbox">
                            <input type="checkbox" v-model="todo.completed">
                            <span></span>
                        </label>
                        <div class="text" :class="{completed: todo.completed}" v-if="!todo.editing" @dblclick="todo.editing = true; editTodoCache=todo.text">{{ todo.text }}</div>
                        <!-- Show Text Box -->
                        <div class="input__div1" v-else>
                            <div class="input__wrapper1">
                                <input type="text" v-focus v-model="todo.text" @keyup.enter="editTodo(todo)" @keyup.esc="cancelEdit(todo)" @blur="cancelEdit(todo)"/>
                            </div>
                            <div class="border"></div>
                        </div>
                    </div>
                </div>                                
            </div>            
            <footer>
                <span>{{ remaining }} Tareas pendientes.</span>
            </footer>
            
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" @click="cancelar">Cerrar</v-btn>          
            </v-card-actions>    
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    props:["form", "dialog"],       
    data() {
        return {
        last_id: 2,
        newTodo: "",
        editTodoCache: "",
        todos: [
            {
            id: 1,
            text: "Learn Vue.js",
            completed: false,
            editing: false
            },
            {
            id: 2,
            text: "Build a project with vue.js",
            completed: false,
            editing: false
            }
        ]
        };
    },

    computed: {
        remaining() {
            return this.todos.filter(todo => !todo.completed).length;
        }
    },

    methods: {
        addTodo() {
            if (this.newTodo.trim() == "") return;
            let todo = {
                id: ++this.last_id,
                text: this.newTodo,
                components: false,
                editing: false
            };
            this.todos.splice(0,0,todo);
            this.newTodo = "";
        },
        editTodo(todo) {            
            if (todo.text.trim() == "") todo.text = this.editTodoCache;            
            else {
                var index = this.todos.findIndex((a)=>a.id===todo.id)
                this.todos[index].text = todo.text.trim()                               
                this.editTodoCache = todo.text.trim()
            }            
            todo.editing = false;
        },
        cancelEdit(todo) {
            todo.text = this.editTodoCache;
            todo.editing = false;            
        },
        cancelar() {                                        
            this.$emit("resetDialog");                                               
            this.$emit("resetList");
        }
    },

    directives: {
        focus: {
        inserted(el) {
            el.focus();
        }
        }
    } 
}
</script>
<style scoped>
    @import "./Plan.css";
</style>