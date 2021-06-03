<template>
  <div class="experimentDetail-container">

    <div class="experimentDetail-main-container">
      <el-row :gutter="20" style="margin-top: 50px">
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>卡片名称</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
              >操作按钮</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{ "列表内容 " + o }}
            </div>
          </el-card>
        </el-col>

      </el-row></div>
  </div>
</template>

<script>
import { fetchExperiment } from '@/api/experiment'

export default {
  name: 'ExperimentDetail',
  components: { },
  data() {
    return {
      list: [],
      loading: false
    }
  },
  computed: {},
  created() {
    const id = this.$route.params && this.$route.params.id
    this.fetchData(id)
  },
  methods: {
    fetchData(id) {
      this.loading = true
      fetchExperiment(id).then((response) => {
        this.list = response.data.equipment
        console.log(this.list)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.experimentDetail-container {
  position: relative;

  .experimentDetail-main-container {
    padding: 0px 45px 20px 50px;
  }
}
.box-card {
  margin-bottom: 10px;
}

</style>
