<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm>
                <h1>Registro de usuario</h1>
                <p class="text-muted">Crea una cuenta</p>
                <CInput
                  placeholder="Nombres"
                  autocomplete="nombres"
                  v-model = "signup.admin_name"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>

                <CInput
                  placeholder="Apellidos"
                  autocomplete="apellidos"
                  v-model = "signup.admin_last_name"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput
                  placeholder="Email"
                  autocomplete="email"
                  prepend="@"
                  v-model = "signup.admin_email"
                />
                <CInput
                  placeholder="Telefono"
                  autocomplete="telefono"
                  prepend="#"
                  v-model = "signup.admin_phone_number"
                />
                <CInput
                  placeholder="Código"
                  autocomplete="codigo"
                  prepend="#"
                  v-model = "signup.admin_code"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput
                  placeholder="Contraseña"
                  type="password"
                  autocomplete="new-password"
                  v-model = "signup.admin_password"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CInput
                  placeholder="Escribe nuevamente la contraseña"
                  type="password"
                  autocomplete="again-password"
                  class="mb-4"  
                >
                <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CButton color="success" block success @click='registrar'>Crear cuenta</CButton>
              </CForm>
            </CCardBody>
            <CCardFooter class="p-4">
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  data() {
			return {
				signup:{
          admin_name:"",
          admin_last_name:"",
          admin_email:"",
          admin_phone_number:"",
          admin_code:"",
					admin_password:""
				}
			}
    },
  methods:{
    registrar(){
                /* console.log(this.signup);
                axios.post('http://184.73.231.88:5000/api/admin/sign_up/',this.signup)
                .then(response =>{ console.log(response)})
                .catch(e =>{
                    console.log(e);
                })
                this.$router.push('/') */ 
              }
            },
  }
</script>
