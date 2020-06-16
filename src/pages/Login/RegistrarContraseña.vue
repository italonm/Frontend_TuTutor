<template>
    <div class="nav containerPrincipal">
        <div class='column'>
            <h1 class='header'>Reestablecer</h1>
            <p class='subheader'>Ingrese su nueva contraseña</p> 
            <div class="icon1">
                <input
                    style="background-color: #FFFFFF; border: none; padding: 12px 15px; margin: 8px 0;	width: 100%; margin-top:65%; position: relative;"
                    type="text"
                    placeholder="Contraseña"
                />
                <button class="effect1" @click="establecer">
                    Enviar
                    <span class="bg"></span>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        establecer(){
            this.$router.push("/Reestablecer")
        }
    }
}
</script>
<style>
    @import "./RegContra.css";       
</style>
<style lang="scss">
    @import "./Password.scss";   
</style>
