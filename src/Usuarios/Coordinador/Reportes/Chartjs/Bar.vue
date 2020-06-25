<script>
import {Bar} from 'vue-chartjs'

export default {
    props: ["label","horasInstruidas","horasTotales","color1","color2"],
  extends: Bar,
  mounted() {
    this.renderChart({
      labels: this.label,
      datasets: [
        {
          label: 'Horas Instuidas',
          backgroundColor: this.color1,
          borderColor: this.color1,
          borderWidth: 1,
          hoverBackgroundColor: this.color1,
          hoverBorderColor: this.color1,
          borderCapStyle: 'round',
          data:this.horasInstruidas
          
        }, {
          label: 'Horas cambiadas',
          backgroundColor: this.color2,
          borderColor: this.color2,
          borderWidth: 1,
          hoverBackgroundColor:this.color2,
          hoverBorderColor: this.color2,
          borderCapStyle: 'round',
          data: this.horasTotales,
        },
      ]
    }, {responsive: true, maintainAspectRatio: false})

  }
}
</script>