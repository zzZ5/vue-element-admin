<template>
  <div class="components-container">

    <el-row :gutter="20">
      <el-col :span="12">
        <experiment-list :owner="true" :user-id="userId" />
      </el-col>
      <el-col :span="12">
        <experiment-list :user="true" :user-id="userId" />
      </el-col>
    </el-row>

  </div>
</template>

<script>
import ExperimentList from './components/ExperimentList'

export default {
  name: 'MyExperiment',
  components: { ExperimentList },
  data() {
    return {
      userId: '0'
    }
  },
  created() {
    this.getUserId()
  },
  methods: {
    getUserId() {
      this.userId = this.$store.getters.user_id
    }
  }
}
</script>
