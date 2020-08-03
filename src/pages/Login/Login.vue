<template>
  <div class="nav containerPrincipal">
    <div class="containerLogin" id="container">
      <div class="form-container sign-up-container">
        <div
          style="background-color: #FFFFFF; display: flex;align-items: center;justify-content: center;flex-direction: column;padding: 0 50px;height: 100%;text-align: center;"
        >
          <div class="Iniciar">Regístrate</div>
          <div class="social-container">
            <a class="social icon" style="color:#333;">
              <i class="fab fa-google-plus-g"></i>
            </a>
            <a href="#" class="social icon" style="color:#333;">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
          <span style="font-size: 12px;">o usa alguna de tus cuentas</span>
          <input
            style="background-color: #FFFFFF; border: none; padding: 12px 15px; margin: 8px 0;	width: 100%;font-size:14px;"
            type="text"
            placeholder="Nombre"
          />
          <input
            style="background-color: #FFFFFF; border: none; padding: 12px 15px; margin: 8px 0;	width: 100%;font-size:14px;"
            type="email"
            placeholder="Correo electrónico"
          />
          <input
            style="background-color: #FFFFFF; border: none; padding: 12px 15px; margin: 8px 0;	width: 100%;font-size:14px;"
            type="password"
            placeholder="Contraseña"
          />
          <button
            style="border-radius: 20px; border: 1.3px solid #3C4B64; background-color: transparent;color: #3C4B64;font-size: 11px;padding: 12px 45px;letter-spacing: 1px;text-transform: uppercase;transition: transform 80ms ease-in;"
          >Registrar</button>
        </div>
      </div>
      <div class="form-container sign-in-container">
        <div
          style="background-color: #FFFFFF; display: flex;align-items: center;justify-content: center;flex-direction: column;padding: 0 50px;height: 100%;text-align: center;"
        >
          <div class="Iniciar">Inicia Sesión</div>
          <div class="social-container">
            <GoogleLogin
              class="social"
              :params="params"
              :renderParams="renderParams"
              :onSuccess="onSuccess"
              :onFailure="onFailure"
            ></GoogleLogin>
          </div>
          <span style="font-size: 12px; padding: 0 50">o inicia a través de</span>
          <input
            style="background-color: #FFFFFF; border: none; padding: 12px 15px; margin: 8px 0;	width: 100%;font-size:14px;"
            type="text"
            placeholder="Usuario"
            v-model="login.user_name"
            @keyup.enter="logItIn"
          />
          <div
            id="pass-container"
            style="display: flex; width: 100%; margin-bottom: 15px; width: 100%; background-color: #FFFFFF;"
          >
            <input
              id="pass"
              style="padding: 12px 15px; margin: 8px 0;	width: 100%;font-size:14px;"
              type="password"
              placeholder="Contraseña"
              v-model="login.password"
              value
              @keyup.enter="logItIn"
            />
            <i
              id="pass icon"
              class="fa fa-eye"
              style="position: absolute; right:7%; padding: 24px; min-width: 50px; text-align: right;"
              @click="ShowPass()"
            ></i>
          </div>
          <a
            style="color:#333; font-size: 12px; margin: 15px 0"
            @click="resetPass"
          >Olvidaste tu contraseña?</a>
          <button
            style="border-radius: 20px; border: 1.3px solid #3C4B64; background-color: transparent;color: #3C4B64;font-size: 11px;padding: 12px 45px;letter-spacing: 1px;text-transform: uppercase;transition: transform 80ms ease-in;"
            id="LogButton"
            @click="logItIn"
          >Iniciar</button>
        </div>
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
import axios from "axios";
import GoogleLogin from "vue-google-login";

export default {
  data() {
    return {
      google_login: {
        email: "",
        access_token: "",
        id_token: "",
      },
      login: {
        user_name: "",
        password: "",
      },
      params: {
        client_id:
          "829453480197-kqbrfh0qngf6mrneclddc0s0e15ochlk.apps.googleusercontent.com",
      },
      renderParams: {
        width: 225,
        height: 40,
        longtitle: true,
      },
      clientId:
        "829453480197-kqbrfh0qngf6mrneclddc0s0e15ochlk.apps.googleusercontent.com",
    };
  },
  components: {
    GoogleLogin,
  },
  mounted() {
    const container = document.getElementById("container");
    document.getElementById("signUp").addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });
    document.getElementById("signIn").addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });
  },
  methods: {
    onFailure() {},
    resetPass() {
      this.$router.push("/ResetPass");
    },
    onSuccess(googleUser) {
      var that = this;
      var profile = googleUser.getBasicProfile();
      this.google_login.email = profile.getEmail();
      this.google_login.access_token = googleUser.wc.access_token;
      this.google_login.id_token = googleUser.getAuthResponse().id_token;
      axios
        .post("/user/google_auth/", this.google_login)
        .then((response) => {
          let Token = response.data.token;
          let Id_usuario = response.data.id;
          let Id_programa = response.data.program_id;
          let Id_institución = response.data.id_institution;
          let Nombre_programa = response.data.program_name;
          let Nombre = response.data.name;
          let Apellidos = response.data.last_name;
          let EsAdministrador = response.data.is_admin;
          let EsCoordinador = response.data.is_coordinator;
          let EsAlumno = response.data.is_student;
          let EsSoporte = response.data.is_support;
          let EsTutor = response.data.is_tutor;
          localStorage.setItem("Token", JSON.stringify(Token));
          localStorage.setItem("Id_usuario", JSON.stringify(Id_usuario));
          localStorage.setItem("Id_facultad", JSON.stringify(Id_programa));
          localStorage.setItem(
            "Id_institución",
            JSON.stringify(Id_institución)
          );
          localStorage.setItem(
            "Nombre_programa",
            JSON.stringify(Nombre_programa)
          );
          localStorage.setItem("Nombre", JSON.stringify(Nombre));
          localStorage.setItem("Apellidos", JSON.stringify(Apellidos));
          localStorage.setItem(
            "EsAdministrador",
            JSON.stringify(EsAdministrador)
          );
          localStorage.setItem("EsCoordinador", JSON.stringify(EsCoordinador));
          localStorage.setItem("EsTutor", JSON.stringify(EsTutor));
          localStorage.setItem("EsAlumno", JSON.stringify(EsAlumno));
          localStorage.setItem("EsSoporte", JSON.stringify(EsSoporte));
          if (EsAdministrador) that.$router.push("/Administrador/Bienvenido");
          else if (EsCoordinador) that.$router.push("/Coordinador/Bienvenido");
          else if (EsTutor) that.$router.push("/Tutor/Bienvenido");
          else if (EsAlumno) that.$router.push("/Alumno/Bienvenido");
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error);
            that.$message.error("Datos inválidos, por favor ingrese de nuevo.");
          }
        });
    },
    ShowPass() {
      var x = document.getElementById("pass");
      var y = document.getElementById("pass icon");
      if (x.type === "password") {
        y.className = "fa fa-eye-slash";
        x.type = "text";
      } else {
        y.className = "fa fa-eye";
        x.type = "password";
      }
    },
    logItIn() {
      var that = this;
      axios
        .post("/user/log_in/", that.login)
        .then((response) => {
          let Token = response.data.token;
          let Id_usuario = response.data.id;
          let Id_programa = response.data.program_id;
          let Id_institución = response.data.id_institution;
          let Nombre_programa = response.data.program_name;
          let Nombre = response.data.name;
          let Apellidos = response.data.last_name;
          let EsAdministrador = response.data.is_admin;
          let EsCoordinador = response.data.is_coordinator;
          let EsAlumno = response.data.is_student;
          let EsSoporte = response.data.is_support;
          let EsTutor = response.data.is_tutor;
          localStorage.setItem("Token", JSON.stringify(Token));
          localStorage.setItem("Id_usuario", JSON.stringify(Id_usuario));
          localStorage.setItem("Id_facultad", JSON.stringify(Id_programa));
          localStorage.setItem(
            "Id_institución",
            JSON.stringify(Id_institución)
          );
          localStorage.setItem(
            "Nombre_programa",
            JSON.stringify(Nombre_programa)
          );
          localStorage.setItem("Nombre", JSON.stringify(Nombre));
          localStorage.setItem("Apellidos", JSON.stringify(Apellidos));
          localStorage.setItem(
            "EsAdministrador",
            JSON.stringify(EsAdministrador)
          );
          localStorage.setItem("EsCoordinador", JSON.stringify(EsCoordinador));
          localStorage.setItem("EsTutor", JSON.stringify(EsTutor));
          localStorage.setItem("EsAlumno", JSON.stringify(EsAlumno));
          localStorage.setItem("EsSoporte", JSON.stringify(EsSoporte));
          if (EsAdministrador) {
            that.$router.push("/Administrador/Bienvenido");
          } else if (EsCoordinador) {
            that.$router.push("/Coordinador/Bienvenido");
          } else if (EsTutor) {
            that.$router.push("/Tutor/Bienvenido");
          } else if (EsAlumno) {
            that.$router.push("/Alumno/Bienvenido");
          }
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error);
            that.$message.error("Datos inválidos, por favor ingrese de nuevo.");
          }
        });
    },
  },
};
</script>
<style scoped>
@import "./Login.css";
</style>