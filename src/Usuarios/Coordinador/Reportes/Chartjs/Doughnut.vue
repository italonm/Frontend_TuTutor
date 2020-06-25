<script>
import {Doughnut} from 'vue-chartjs'

export default {
 props: ["labelObtenidos"],
  extends: Doughnut,
  mounted() {
    this.renderChart({
      labels: this.labelObtenidos,
      datasets: [{
        data: [250, 50, 100,80],
        backgroundColor: [
          '#FEB019',
          '#FF4560',
          '#008FFB',
          '#00E396'
        ],
        hoverBackgroundColor: [
          '#F2A309',
          '#E51C39',
          '#0585E7',
          "#06D991"
        ]
      }]
    }, {responsive: true, maintainAspectRatio: false})

  }
}
</script>