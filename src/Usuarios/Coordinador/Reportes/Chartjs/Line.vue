<script>
import {Line} from 'vue-chartjs'

export default {
    props:["DataLine1","DataLine2","color1","color2","labels"],
  extends: Line,
  mounted() {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 300)
    this.gradient.addColorStop(0, 'rgba(75, 119, 190, 0.5)')
    this.gradient.addColorStop(0.5, 'rgba(75, 119, 190, 0.3)');
    this.gradient.addColorStop(1, 'rgba(75, 119, 190, 0.05)');

    this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 400)
    this.gradient2.addColorStop(0, 'rgba(255, 0,0, 0.5)')
    this.gradient2.addColorStop(0.5, 'rgba(255, 0, 0, 0.3)');
    this.gradient2.addColorStop(1, 'rgba(255, 0, 0, 0.05)');




    this.renderChart({
      
      labels: this.labels,
      
      datasets: [{
          label: 'Sesiones Formales',
          fill: true,
          lineTension: 0.2,
          backgroundColor: this.gradient,
          borderColor: this.gradient,
          borderCapStyle: 'round',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: this.gradient,
          pointBackgroundColor: this.gradient,
          pointBorderWidth: 2,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: this.gradient,
          pointHoverBorderColor: this.gradient,
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.DataLine1
        },
        {
                    label: 'Sesiones Informales',
                    fill: true,
                    lineTension: 0.5,
                    backgroundColor: this.gradient2,
                    borderColor: this.gradient2,
                    borderCapStyle: 'round',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: this.gradient2,
                    pointBackgroundColor: this.gradient2,
                    pointBorderWidth: 2,
                    pointHoverRadius: 10,
                    pointHoverBackgroundColor: this.gradient2,
                    pointHoverBorderColor: this.gradient2,
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.DataLine2,
                }
      ]
    }, {responsive: true, maintainAspectRatio: false,})

  }
  
}
</script>