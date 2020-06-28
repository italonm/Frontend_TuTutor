<template>            
    <div class="cardAlumno ml-1">
        <div class="additional"></div> 
        <div class="nombre">{{alumno.participants[0].name}} {{alumno.participants[0].last_name}}</div>
        <div class="codigo">
            <i class="fas fa-address-card"></i>
            &nbsp;{{alumno.participants[0].code}}
        </div> 
        <div class="detalles">       
            <v-btn class="ml-2" outlined fab color="#5A4B7B" @click="verDetalles()">
                <v-icon color="#5A4B7B">fas fa-tasks</v-icon>
            </v-btn> 
        </div>
        <div class="programa">
            <i class="fas fa-school"></i>
            &nbsp;EE.GG.CC
        </div>                   
    </div>
</template>
<script>
import { bus } from "../../../main"
export default {
    props:["alumno"],
    methods:{
        verDetalles(){            
            bus.$emit("verDetalle", this.alumno);             
        }
    },    
}
</script>
<style scoped>
    @import "./Alumnos.css";
</style>