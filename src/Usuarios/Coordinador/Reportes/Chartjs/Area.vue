<script>
import {Line} from 'vue-chartjs'

export default {
    extends: Line,
    mounted() {
        this.renderChart({
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            options: {
                legend: {
                    display: false
                },
            },
            datasets: [
                {
                    label: 'My First dataset',
                    fill: true,
                    lineTension: 0.4,
                    backgroundColor: 'rgba(237, 15, 81, .2)',
                    borderColor: '#ed0f51',
                    borderCapStyle: 'round',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#ed0f51',
                    pointBackgroundColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointHoverRadius: 10,
                    pointHoverBackgroundColor: '#ed0f51',
                    pointHoverBorderColor: '#ed0f51',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    fill: true,
                    lineTension: 0.5,
                    backgroundColor: 'rgba(0,255,0,0.3)',
                    borderColor: '#00E396',
                    borderCapStyle: 'round',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#00E396',
                    pointBackgroundColor: '#00E396',
                    pointBorderWidth: 2,
                    pointHoverRadius: 10,
                    pointHoverBackgroundColor: '#00E396',
                    pointHoverBorderColor: '#00E396',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [50, 45, 23, 80, 58, 5, 21]
                }
            ]
        }, {responsive: true, maintainAspectRatio: false})

    }
}


</script>