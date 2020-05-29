<template>
  <div class="nav containerPrincipal">
    <div class="containerLogin" id="container">
      <div class="form-container sign-up-container">
        <form
          style="background-color: #FFFFFF; display: flex;align-items: center;justify-content: center;flex-direction: column;padding: 0 50px;height: 100%;text-align: center;"
          action="#"
        >
          <div class="Iniciar">Regístrate</div>
          <div class="social-container">
            <a href="#" class="social icon" style="color:#333;">
              <i class="fab fa-google-plus-g"></i>
            </a>
            <a href="#" class="social icon" style="color:#333;">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
          <span style="font-size: 12px;">o usa alguna de tus cuentas</span>
          <input
            style="background-color: #FFFFFF; border: none; padding: 12px 15px; margin: 8px 0;	width: 100%;"
            type="text"
            placeholder="Nombre"
          />
          <input
            style="background-color: #FFFFFF; border: none; padding: 12px 15px; margin: 8px 0;	width: 100%;"
            type="email"
            placeholder="Correo electrónico"
          />
          <input
            style="background-color: #FFFFFF; border: none; padding: 12px 15px; margin: 8px 0;	width: 100%;"
            type="password"
            placeholder="Contraseña"
          />
          <button
            style="border-radius: 20px; border: 1.3px solid #3C4B64; background-color: transparent;color: #3C4B64;font-size: 11px;padding: 12px 45px;letter-spacing: 1px;text-transform: uppercase;transition: transform 80ms ease-in;"
          >Registrar</button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form
          style="background-color: #FFFFFF; display: flex;align-items: center;justify-content: center;flex-direction: column;padding: 0 50px;height: 100%;text-align: center;"
          action="#"
        >
          <div class="Iniciar">Inicia Sesión</div>
          <div class="social-container">
            <a href="#" class="social" style="color:#333; font-size: 14px; margin-bottom: 5px;">
              <i class="fab fa-google-plus-g"></i>
            </a>
            <a href="#" class="social" style="color:#333; font-size: 14px; margin-bottom: 5px; ">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
          <span style="font-size: 12px; padding: 0 50">o inicia a través de</span>
          <input style ="background-color: #FFFFFF; border: none; padding: 12px 15px; margin: 8px 0;	width: 100%;" type="text" placeholder="Usuario" v-model="login.user_name"/>          
          <div id="pass-container" style="display: flex; width: 100%; margin-bottom: 15px; width: 100%; background-color: #FFFFFF;">            
            <input id="pass" style ="padding: 12px 15px; margin: 8px 0;	width: 100%;" type="password" placeholder="Contraseña" v-model="login.password" value>          
            <i id="pass icon" class="fa fa-eye" style="position: absolute; right:7%; padding: 24px; min-width: 50px; text-align: right;" @click="ShowPass()"></i>
          </div>
          <a style="color:#333; font-size: 12px; margin: 15px 0" hre  f="#">Olvidaste tu contraseña?</a>
          <button style="border-radius: 20px; border: 1.3px solid #3C4B64; background-color: transparent;color: #3C4B64;font-size: 11px;padding: 12px 45px;letter-spacing: 1px;text-transform: uppercase;transition: transform 80ms ease-in;"
          success @click='logItIn'>Iniciar</button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1
              style="font-weight: 600; margin: 0;font-size: 2.1875rem; color:#FFFFF; margin: 0;"
            >Bienvenido de Regreso!</h1>
            <p>Para mantenernos conectados, por favor ingresa con tu cuenta</p>
            <button
              style="border-radius: 20px; border: 2px; background-color: transparent;color: #FFFFFF;font-size: 14px;padding: 12px 45px;letter-spacing: 1px;transition: transform 80ms ease-in;"
              id="signIn"
            >Ingresar</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1
              style="font-weight: 600; margin: 0;font-size: 2.1875rem; color:#FFFFF; margin: 0;"
            >Hey, Compañero!</h1>
            <p>Cuéntanos sobre ti y comencemos nuestro viaje juntos</p>
            <button
              style="border-radius: 20px; border: 2px; background-color: transparent;color: #FFFFFF;font-size: 14px;padding: 12px 45px;letter-spacing: 1px;transition: transform 80ms ease-in;"
              class="ghost"
              id="signUp"
            >Regístrate</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//COMPONENTE DE REGISTRO DE NUEVO USUARIO
import Registro from './Registro'
/* //COMPONENTE CONTENEDOR
import Contenedor from '../../pages/Main'
//RUTAS
import {rutitas} from '../../extra/routes/routes' */
import axios from "axios";

export default {    
    data() {
			return {
				login:{
					user_name:"",
					password:""
				}
			}
    },     
    mounted(){      
      const container = document.getElementById('container');      
      document.getElementById('signUp').addEventListener('click', () => {
        container.classList.add("right-panel-active");
      });
      document.getElementById('signIn').addEventListener('click', () => {
        container.classList.remove("right-panel-active");
      });
    },      
		methods:{      
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
			logItIn(){        
        var that = this;
        console.log(that.login)
        axios.post('http://184.73.231.88:5000/api/user/log_in/',that.login)
        .then(response =>{ 
            let Nombre = response.data.name;
            let Apellidos = response.data.last_name;
            let EsAdministrador = response.data.is_admin;
            let EsCoordinador = response.data.is_coordinator;
            let EsAlumno = response.data.is_student;
            let EsSoporte = response.data.is_support;
            let EsTutor = response.data.is_tutor;
            localStorage.setItem('Nombre',JSON.stringify(Nombre));                    
            localStorage.setItem('Apellidos',JSON.stringify(Apellidos));  
            localStorage.setItem('EsAdministrador',JSON.stringify(EsAdministrador));                    
            localStorage.setItem('EsCoordinador',JSON.stringify(EsCoordinador));                   
            localStorage.setItem('EsTutor',JSON.stringify(EsTutor));
            localStorage.setItem('EsAlumno',JSON.stringify(EsAlumno));
            localStorage.setItem('EsSoporte',JSON.stringify(EsSoporte));   
            if (EsAdministrador){
                /* this.$router.addRoutes([{path: '/', name: 'Principal', component: Contenedor, children: rutitas['admin']}])                                                   */              
                this.$router.push('/TuTutor/Bienvenido')  
                window.Location.reload()                                              
            }
            else if (EsCoordinador){
                /* this.$router.addRoutes([{path: '/', name: 'Principal', component: Contenedor, children: rutitas['coordi']}])                                                   */                
                this.$router.push('/TuTutor/Bienvenido')                                                                              
            }
            /* else if (EsTutor){                
            }
            else if (EsSoporte){                
            }        */
        })
        .catch(function(error) {
          if (error.response){
            console.log(error)
            that.$message.error("Datos inválidos, por favor ingrese de nuevo.")
          }          
        }
          
        )                               			                
				/* .then(response => {
					let newToken=response.data.user.api_token;
					window.token=newToken;
					let user=response.data.user;	
					localStorage.setItem('token',newToken);
					localStorage.setItem('user',JSON.stringify(user));

					window.axios.defaults.params={api_token:newToken}
					Event.$emit('login',user);

					this.$router.push('/');
				}); */
    },
    signUp() {
      this.$router.addRoutes([
        {
          path: "/Registro",
          name: "Registro",
          component: Registro
        }
      ]);
      this.$router.push("/Registro");
    }
  }
};
</script>
<style scoped>
@import "./Login.css";
</style>