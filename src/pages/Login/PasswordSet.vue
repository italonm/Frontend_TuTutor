<template>   
    <div class="nav containerPrincipal">
        <div class='column'>
            <h1 class='header'>Bienvenido</h1>
            <p class='subheader'>Clickee y complete para continuar</p>            
            <div class='search'>
                <div class='search_bar'>
                <input id='searchOne' type='checkbox'>
                <label for='searchOne'>
                    <i class='icon fas fa-key'></i>
                    <i class='last icon far fa-paper-plane' @click="validar"></i>
                    <p>|</p>
                </label>
                <input placeholder='Ingrese el código...' type='text'>
                </div>
            </div>
        </div>        
    </div>
</template>
<script>
export default {
    methods:{
        validar(){
            this.$router.push("/Registrar Contraseña")
        }
    }
}
</script>
<style lang="scss" scoped>
    @import "./Password.scss";
</style>