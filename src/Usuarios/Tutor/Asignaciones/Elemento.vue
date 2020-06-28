<template>
    <div class="containerBody">
        <h1>{{components}}</h1>
        <div v-for="(comp, idx) in components" :key="idx">
            <div class="courses-container">
                <div class="course">
                    <div class="course-preview">
                        <h6>Participantes</h6>
                        <h4>{{comp.participants[0].name}} {{comp.participants[0].last_name}}</h4>                  
                        <a href="#">Ver participantes <i class="fas fa-chevron-right"></i></a>
                    </div>
                    <div class="course-info">
                        <div class="progress-container">
                                <v-progress-linear :value="(comp.finished_activities/comp.total_activities*100).toString()" color="#2A265F"></v-progress-linear>
                            <span class="progress-text">
                                {{comp.finished_activities}}/{{comp.total_activities}} Actividades
                            </span>
                        </div>
                        <h6>{{comp.state}}</h6>
                        <h2>{{comp.tutoring_type}}</h2>
                        <button class="btn" v-on:click="verPlan()">
                            Ver Plan
                        </button>
                    </div>
                </div>
            </div>   
        </div>
    </div> 
</template>
<script>
export default {    
    name: "Elemento",    
    props: ["components", "callMethod"],  
    methods:{
        verPlan(){                                                      
            this.callMethod(this.comp.id);            
        },        
    },              
}
</script>
<style>
    @import "./Asignaciones.css";    
</style>