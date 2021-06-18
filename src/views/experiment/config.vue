<template>
  <div class="chartConfig-container">
    <div class="chartConfig-main-container">
      <el-form label-width="80px">
        <div class="postInfo-container">
          <el-tree
            :props="props"
            :load="loadNode"
            lazy
            show-checkbox
          />
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { fetchExperiment } from '@/api/experiment'

export default {
  name: 'Config',
  components: { },
  data() {
    return {
      props: {
        label: 'name',
        // children: 'zones',
        isLeaf: 'leaf'
      },
      experimentDetail: {
      },
      equipment: {},
      experimentId: '0',
      tempRoute: {}
    }
  },
  created() {
    this.experimentId = this.$route.params && this.$route.params.experimentId
    this.fetchData(this.experimentId)
    this.tempRoute = Object.assign({}, this.$route)
    this.setTagsViewTitle()
    this.setPageTitle()
  },
  methods: {
    fetchData(id) {
      this.loading = true
      fetchExperiment(id).then((response) => {
        this.equipment = response.data.equipment
        console.log(Array.from(this.equipment))
        this.loading = false
      })
    },

    loadNode(node, resolve) {
      if (node.level === 0) {
        console.log(this.equipment)
        return resolve(Array.from(this.equipment))
      }
      if (node.level > 3) return resolve([])

      var hasChild
      if (node.data.name === 'region1') {
        hasChild = true
      } else if (node.data.name === 'region2') {
        hasChild = false
      } else {
        hasChild = Math.random() > 0.5
      }

      setTimeout(() => {
        var data
        if (hasChild) {
          data = [{
            name: 'zone' + this.count++
          }, {
            name: 'zone' + this.count++
          }]
        } else {
          data = []
        }

        resolve(data)
      }, 500)
    },

    setTagsViewTitle() {
      const title = 'Chart Config'
      const route = Object.assign({}, this.tempRoute, {
        title: `${title} - ${this.experimentId}`
      })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = 'Chart Config'
      document.title = `${title} - ${this.experimentId}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.chartConfig-container {
  position: relative;

  .chartConfig-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }
}
</style>
