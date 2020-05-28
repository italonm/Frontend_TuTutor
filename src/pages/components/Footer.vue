<template>
  <CFooter :fixed="false" >
    <div>
      <a href="https://www.pucp.edu.pe/" target="_blank">PUCP</a>
      <span class="ml-1">&copy; {{ new Date().getFullYear() }} TuTutor.</span>
    </div>
    <div class="ml-auto">
      <span class="mr-1">Powered by</span>
      <a href="https://vuejs.org/" target="_blank">Vue</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: "TheFooter",
};
</script>
