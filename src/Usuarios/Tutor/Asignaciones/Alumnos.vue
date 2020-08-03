<template>            
    <div class="cardAlumno ml-1" :style="{'background-color':alumno.left}">
        <div class="additional" :style="{'background-color':alumno.back}"></div> 
        <div class="nombre">{{alumno.name}} {{alumno.last_name}}</div>
        <v-btn class="notas ml-7 mb-1" outlined x-small color="indigo" @click="descargar()">
            <i class="fas fa-file-download"></i>
            &nbsp;{{space}}
        </v-btn>          
        <div class="codigo">
            <i class="fas fa-address-card"></i>
            &nbsp;{{alumno.code}}
        </div> 
        <div class="detalles">       
            <v-btn class="ml-2" outlined fab color="#5A4B7B" @click="verDetalles()">
                <v-icon color="#5A4B7B">fas fa-tasks</v-icon>
            </v-btn> 
        </div>
        <div class="programa">
            <i class="fas fa-school"></i>
            &nbsp;{{alumno.program_name}}
        </div>                                    
    </div>
</template>
<script>
import { bus } from "../../../main"
import axios from "axios"
export default {
    data(){
        return{
            space:" Descargar Notas",
        }
    },
    props:["alumno", "back", "left"],
    methods:{
        verDetalles(){            
            bus.$emit("verDetalle", this.alumno);             
        },
        descargar(){
            axios
            .get("/tutor/show_scores_from_student/" + this.alumno.id, {
            responseType: "blob"
            })
            .then(res => {
            var fileLink = document.createElement("a");
            fileLink.href = window.URL.createObjectURL(new Blob([res.data]));
            fileLink.setAttribute(
                "download",
                "notas_" + this.alumno.code + ".pdf"
            );
            document.body.appendChild(fileLink);
            fileLink.click();
            })
            .catch(() => this.$message({ type: "warning", message: "No se encuentran notas registradas para este alumno" }));
        }
    },    
}
</script>
<style scoped>
    @import "./Alumnos.css";
</style>