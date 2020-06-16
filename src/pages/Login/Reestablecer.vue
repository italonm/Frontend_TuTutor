<template>
    <div class="containerRees" onclick="onclick">
        <div class="top"></div>
        <div class="bottom"></div>
        <div class="center">
            <h2>Ingresa tu contraseña</h2>        
            <div id="pass-container" style="display: flex; width: 100%; margin-bottom: 15px; width: 100%; background-color: #FFFFFF;">            
                <input id="pass" style ="padding: 12px 15px; margin: 8px 0;	width: 100%;" type="password" placeholder="Contraseña">          
                <i id="pass icon" class="fa fa-eye" style="position: absolute; right:7%; padding: 24px; min-width: 50px; text-align: right;" @click="ShowPass()"></i>
            </div>
            <h2>&nbsp;</h2>
            <div id="container">
                <button class="learn-more">
                    <span class="circle" aria-hidden="true">
                    <span class="icon arrow"></span>
                    </span>
                    <span class="button-text" @click="Registrar">Registrar</span>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        Registrar(){
            console.log("AUXILIO")
        },
        ShowPass(){
        var x = document.getElementById("pass");
        var y = document.getElementById("pass icon");
        if (x.type === "password") {
          y.className = "fa fa-eye-slash"
          x.type = "text";
        } else {
          y.className = "fa fa-eye"
          x.type = "password";
        }                
      },
    }
    
}
</script>
<style lang="scss">
    @import "./Reestablecer.scss";
    @import "./BotonReestablecer.scss";
</style>