<template>
  <div class="grid-content">
    <h1 style="text-align: center;">
      <i class="fas fa-university"></i>&nbsp;Configuración de la institución
    </h1>
    <CRow>
      <CCol sm="5">
        <CCard w-50>
          <CCardHeader>
            <strong>Datos de la institución</strong>
          </CCardHeader>
          <CCardBody>
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="logo.institution_name"
                  :rules="nameValidation"
                  label="Nombre de la institución*"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field
                  v-model="logo.institution_address"
                  :rules="placeValidaiton"
                  label="Ubicación*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="logo.institution_email"
                  :rules="emailValidation"
                  label="Correo principal*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="logo.institution_email_help"
                  :rules="emailValidation"
                  label="Correo de ayuda*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="logo.institution_web_page"
                  :rules="webValidation"
                  label="Sitio web*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="logo.institution_phone_number"
                  :rules="phoneValidation"
                  label="Telefono / Celular"
                  required
                ></v-text-field>
              </v-col>
              <h6>*Campos obligatorios</h6>
            </v-form>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol>
        <CCard>
          <CCardHeader>
            <strong>Logo de la institución</strong>
          </CCardHeader>
          <CCardBody>
            <div>
              <img id="img" :src="previewImage" class="uploading-image img-thumbnail" />
              <CCol>
                <input ref="file" type="file" accept="image/png" @change="uploadImage" />
              </CCol>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  
    <v-col class="text-right">
    <v-btn large color="error" rounded   @click="cancelarCambios">Cancelar cambios</v-btn>
    <v-btn large color="success" rounded   @click="verificar">Actualizar datos</v-btn>
    </v-col>
  </div>
</template>


<script>
import axios from "axios";
import { bus } from "../../../main";
import {
  nameRules,
  emailRules,
  codeRules,
  phoneRules,
  placeRules,
  webRules
} from "../../Validation";
var formData = new FormData();
export default {
  data() {
    return {
      previewImage: null,
      valid: true,
      lazy: false,
      logoActualizado: false,
      nameValidation: nameRules,
      emailValidation: emailRules,
      codeValidation: codeRules,
      phoneValidation: phoneRules,
      placeValidaiton: placeRules,
      webValidation: webRules,
      logo: {
        institution_id: "",
        institution_name: "",
        institution_address: "",
        institution_email: "",
        institution_email_help: "",
        institution_phone_number: "",
        institution_web_page: "",
        institution_logo: "",
        admin_id: JSON.parse(localStorage.getItem("Id_usuario"))
      },
      editarlogo: {
        institution_id: "",
        institution_name: "",
        institution_address: "",
        institution_email: "",
        institution_email_help: "",
        institution_phone_number: "",
        institution_web_page: ""
      }
    };
  },
  created() {
    this.listar();
  },
  name: "Configuración",
  methods: {
    verificar() {
      if (this.editarlogo.institution_id == "") this.registrar();
      else this.editar();
    },
    listar() {
      var Id_usuario = JSON.parse(localStorage.getItem("Id_usuario"));
      axios
        .get("/admin/show_institution/" + Id_usuario)
        .then(res => {
          this.logo.institution_name = res.data.institution_name;
          this.logo.institution_address = res.data.institution_address;
          this.logo.institution_email = res.data.institution_email;
          this.logo.institution_email_help = res.data.institution_email_help;
          this.logo.institution_phone_number =
            res.data.institution_phone_number;
          this.logo.institution_web_page = res.data.institution_web_page;
          this.editarlogo.institution_id = res.data.institution_id;
          localStorage.setItem('Id_institución',JSON.stringify(this.editarlogo.institution_id));
          axios
            .get("/admin/show_logo/" + Id_usuario, {
              responseType: "arraybuffer"
            })
            .then(response => {
              let image = btoa(
                new Uint8Array(response.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              );
              this.previewImage = `data:${response.headers[
                "content-type"
              ].toLowerCase()};base64,${image}`;
            });
        })
        .catch(error => console.log(error));
      bus.$emit("updateLogo", 1);
    },
    cancelarCambios(){
      this.listar();
    },
    uploadImage(e) {
      formData = new FormData();
      const image = e.target.files[0];
      formData.append("file", image, image.name);
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e => {
        this.previewImage = e.target.result;
      };
      this.logoActualizado = true;
    },
    registrar() {
      this.$refs.form.validate();
      if (this.valid) {
        axios
          .post("/admin/add_institution/", this.logo)
          .then(
            this.$message({ message: "Registro exitoso.", type: "success" })
          )
          .then(res =>{
                    console.log(res);
                    if (this.logoActualizado) {
                      this.logo.admin_id = JSON.parse(localStorage.getItem("Id_usuario"));
                      axios
                        .post("/admin/add_logo/" + this.logo.admin_id, formData)
                        .then(this.$message({ message: "Subiendo logo", type: "success" }))
                        .then(res => {
                          console.log(res);
                          this.listar();
                        })
                        .catch(e => {
                          console.log(e);
                          this.listar();
                        });
                      this.logoActualizado = false;
                    }
          })
          .then(this.listar())
          .then(this.listar())
          .catch(e => {
            console.log(e);
          });
      } else this.$message.error("Datos incorrectos");
    },
    editar() {
      this.$refs.form.validate();
      if (this.valid) {
        if (this.logoActualizado) {
          this.logo.admin_id = JSON.parse(localStorage.getItem("Id_usuario"));
          axios
            .post("/admin/add_logo/" + this.logo.admin_id, formData)
            .then(this.$message({ message: "Subiendo datos", type: "success" }))
            .then(res => {
              console.log(res);
              this.listar();
            })
            .catch(e => {
              console.log(e);
            });
          this.logoActualizado = false;
        }
        this.editarlogo.institution_name = this.logo.institution_name;
        this.editarlogo.institution_address = this.logo.institution_address;
        this.editarlogo.institution_email = this.logo.institution_email;
        this.editarlogo.institution_email_help = this.logo.institution_email_help;
        this.editarlogo.institution_phone_number = this.logo.institution_phone_number;
        this.editarlogo.institution_web_page = this.logo.institution_web_page;

        axios
          .post("/admin/update_institution/", this.editarlogo)
          .then(
            this.$message({ message: "Registro exitoso.", type: "success" })
          )
          .then(this.listar())
          .then(this.listar())
          .catch(e => {
            console.log(e);
          });
      } else this.$message.error("Datos incorrectos");
    }
  }
};
</script>