<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>
<style lang="scss">
.v-application ul {
  padding-left: 0px !important;
}
.c-header {
  z-index: 100 !important;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
  width: 100%;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.el-input__inner {
  border-radius: 25px !important;
}
.v-data-table-header th {
  color: #2f64ba !important;
  background-color: white !important;
  overflow: hidden;
}
.v-data-table {
  border-radius: 25px !important;
}
tbody tr:nth-of-type(odd) {
  background-color: #fafafa;
}
.buttonAdd {
  margin: 0 auto !important;
  display: block !important;
}
.cardAdd {
  background-color: #039be5;
  color: white;
}
</style>
