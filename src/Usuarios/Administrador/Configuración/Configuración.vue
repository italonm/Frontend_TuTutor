<template>
  <div class="grid-content">
    <h1 style="text-align: center;">
      <i class="fas fa-users"></i>&nbsp;Configuración de la institución
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
                  :rules="nameValidation"
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
                  label="Telefono"
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
              <img :src="previewImage" class="uploading-image img-thumbnail" />
              <CCol>
                <input type="file" accept="image/png" @change="uploadImage" />
              </CCol>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <CCol sm xs="20" class="text-center mt-3">
      <CButton size="lg" id="done-button" color="success" @click="registrar">
        <CIcon name="cil-lightbulb" />&nbsp;Actualizar datos
      </CButton>
    </CCol>
  </div>
</template>


<script>
import axios from "axios";
import {
  nameRules,
  emailRules,
  codeRules,
  phoneRules,
  webRules
} from "../../Validation";
export default {
  data() {
    return {
      previewImage: null,
      valid: true,
      lazy: false,
      nameValidation: nameRules,
      emailValidation: emailRules,
      codeValidation: codeRules,
      phoneValidation: phoneRules,
      webValidation: webRules,
      logo: {
        institution_name: "",
        institution_address: "",
        institution_email: "",
        institution_email_help: "",
        institution_phone_number: "",
        institution_web_page: "",
        institution_logo: new Blob(),
        admin_id: ""
      }
    };
  },
  name: "Configuración",
  methods: {
    dataURLtoBlob(dataURI) {
      // convert base64/URLEncoded data component to raw binary data held in a string
      var byteString;
      if (dataURI.split(",")[0].indexOf("base64") >= 0)
        byteString = atob(dataURI.split(",")[1]);
      else byteString = unescape(dataURI.split(",")[1]);

      // separate out the mime component
      var mimeString = dataURI
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];

      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ia], { type: mimeString });
    },
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);

      reader.onload = e => {
        this.previewImage = e.target.result;
        console.log(this.previewImage);
        this.logo.institution_logo = this.dataURLtoBlob(this.previewImage);
        console.log(this.logo.institution_logo);
      };
    },
    registrar() {
      this.$refs.form.validate();
      if (this.valid) {
        this.logo.admin_id = JSON.parse(localStorage.getItem("ID"));
        console.log(this.logo.institution_logo);
        axios
          .post(
            "http://184.73.231.88:5000/api/admin/add_institution/",
            this.logo
          )
          .then(response => {
            console.log(response);
            this.$message({ message: "Registro exitoso.", type: "success" });
          })
          .catch(e => {
            console.log(e);
          });
      } else this.$message.error("Datos incorrectos");
    }
  }
};
</script>
