<template>    
    <div class="courses-container">
        <div class="course">
            <div class="course-preview">
                <h6 style="color:#FFFFFF;">Participantes</h6>
                <h4>{{name}}</h4>                  
                <a style="color:#FFFFFF; font-size:13px;">Ver participantes <i class="fas fa-chevron-right"></i></a>
            </div>
            <div class="course-info">
                <div class="progress-container">
                        <v-progress-linear :value="(comp.finished_activities/comp.total_activities*100).toString()" color="#76998c"></v-progress-linear>
                    <span class="progress-text" style="font-size:12px">
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
</template>
<script>
export default {    
    name: "Elemento",    
    props: ["comp", "callMethod", "name"],  
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