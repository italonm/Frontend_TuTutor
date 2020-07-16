<template>
  <CDropdown inNav class="c-header-nav-items" placement="bottom-end" add-menu-classes="pt-0">
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img src="./media/download.png" class="card-image" width="18px" height="18px" />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownItem @click="CerrarSesión()">
      <CIcon name="cil-lock-locked" />Cerrar Sesión
    </CDropdownItem>
  </CDropdown>
</template>

<script>
export default {
  name: "Desplegable",
  data() {
    return {
      itemsCount: 42
    };
  },
  /* mounted(){
      document.getElementById('CerrarSesión').addEventListener('click', () => {
        this.$router.push('/Login')
      });
  }, */
  methods: {
    CerrarSesión() {      
      localStorage.clear();      
      this.$router.push("/Login");      
    }
  }
};
</script>

<style scoped>
.c-icon {
  margin-right: 0.3rem;
}
</style>