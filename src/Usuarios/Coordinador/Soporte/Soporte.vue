<template>
  <div>
    <el-row>
      <el-col :span="20">
        <div class="grid-content">
          <h1 style="text-align: center;">
            <i class="far fa-file"></i>
            &nbsp;{{" Reporte de los resultados de las encuestas de satisfacción"}}
          </h1>
        </div>
      </el-col>
    </el-row>
    <v-spacer></v-spacer>
    <div style="padding-left:20px !important;">
      <el-row>
        <el-col :span="20">
          <h5>{{"Total de encuestas respondidas: " + respondidas}}</h5>
          <h5>{{"Total de encuestas no respondidas: " + noRespondidas}}</h5>
        </el-col>
      </el-row>
    </div>
    <v-container>
      <embed
        src="https://a20160298.typeform.com/report/RGn9ztac/Yx7GClikh9Oyrnqf"
        width="1160"
        height="3100"
      />
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      respondidas: 0,
      noRespondidas: 0,
    };
  },
  methods: {
    listarRespondidas_y_NoRespondidas() {
      axios
        .post("/coordinator/show_status_report_polls/", {
          coordinator_id: localStorage.getItem("Id_usuario"),
        })
        .then((res) => {
          this.respondidas = res.data.answered;
          this.noRespondidas = res.data.not_answered;
        })
        .catch((error) => console.log(error));
    },
  },

  created() {
    this.listarRespondidas_y_NoRespondidas();
  },
};
</script>