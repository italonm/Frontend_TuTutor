<template>
    <div class="courses-container">
        <div class="course">
            <div class="course-preview">
                <h6>Participantes</h6>
                <h4>{{name}} {{last_name}}</h4>                  
                <a href="#">Ver participantes <i class="fas fa-chevron-right"></i></a>
            </div>
            <div class="course-info">
                <div class="progress-container">
                    <div class="progress"></div>
                    <span class="progress-text">
                        6/9 Actividades
                    </span>
                </div>
                <h6>{{state}}</h6>
                <h2>{{tutoring_type}}</h2>
                <button class="btn" v-on:click="verPlan()">Ver Plan</button>
            </div>
        </div>
    </div>    
</template>
<script>
export default {    
    name: "Elemento",    
    props: ["name" , "tutoring_type", "last_name", "state", "id_alumno", "callMethod"],     
    methods:{
        verPlan(){       
            this.callMethod();            
        },        
    },    
}
</script>
<style>
    @import "./Asignaciones.css";
</style>