<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from '../mixins/resize'
import { fetchData } from '@/api/equipment'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null,
      series: [],
      option: {
        legend: {
        },
        title: {
          text: ''
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {},
            dataView: {}
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false
          }
        },
        grid: {
          show: true,
          containLabel: true
        },
        xAxis: {
          type: 'time',
          boundaryGap: false,
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true
          }
        },
        dataZoom: [{
          type: 'inside',
          realtime: true,
          start: 0,
          end: 100
        }, {
          start: 0,
          end: 100
        }]
      },
      experimentId: '0',
      equipmentId: '0',
      query: {
        experiment: '0',
        step: 1,
        count: undefined,
        begin_time: undefined,
        end_time: undefined
      },
      loading: false
    }
  },
  watch: {
    series(val) {
      if (val !== []) {
        this.chart.setOption({ series: val })
      }
    }
    // options: {
    //   handler(options) {
    //     this.chart.setOption(this.options)
    //   },
    //   deep: true
    // }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  created() {
    const experimentId = this.$route.params && this.$route.params.experimentId
    this.experimentId = experimentId
    const equipmentId = this.$route.params && this.$route.params.equipmentId
    this.equipmentId = equipmentId
    this.query.experiment = this.experimentId
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetchData(this.equipmentId, this.query).then((response) => {
        const tempSeries = []
        response.data.forEach(element => {
          const series = {
            name: element.name,
            type: 'line',
            smooth: true,
            showSymbol: false,
            // hoverAnimation: false,
            data: []
          }
          element.data.forEach(i => {
            series.data.push([i.measured_time, i.value])
          })
          console.log(series)
          tempSeries.push(series)
        })
        this.series = tempSeries
      })
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption(this.option)
    }
  }
}
</script>
