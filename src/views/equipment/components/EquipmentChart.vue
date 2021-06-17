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
          },
          formatter(params) {
            let res = params[0].data[0] + '</br>'
            for (const i in params) {
              res += params[i].marker + params[i].seriesName + ':' + params[i].data[1] + '</br>'
            }
            return res
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
      tempRoute: {}
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
    this.fetchData()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  created() {
    this.experimentId = this.$route.query && this.$route.query.experimentId
    this.equipmentId = this.$route.params && this.$route.params.equipmentId
    this.query.experiment = this.experimentId
    this.tempRoute = Object.assign({}, this.$route)
    this.setTagsViewTitle()
    this.setPageTitle()
  },
  methods: {
    fetchData() {
      this.chart.showLoading()
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
          tempSeries.push(series)
        })
        this.series = tempSeries
        this.chart.hideLoading()
      })
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption(this.option)
    },
    setTagsViewTitle() {
      const title = 'Equipment Chart'
      const route = Object.assign({}, this.tempRoute, {
        title: `${title} - ${this.equipmentId}`
      })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = 'Equipment Chart'
      document.title = `${title} - ${this.equipmentId}`
    }
  }
}
</script>
