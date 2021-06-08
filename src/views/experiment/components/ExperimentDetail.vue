<template>
  <div class="experimentDetail-container">
    <div v-loading class="experimentDetail-main-container">
      <el-row :gutter="20" style="margin-top: 50px">
        <el-col v-for="row in list" :key="row.id" :span="6">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <router-link :to="'/equipment/detail/' + experimentId + '/'+ row.id" class="link-type">
                <span class="link-type"> <b> {{ row.name }} </b></span>
              </router-link>
              <el-dropdown trigger="click" style="float: right; padding-top: 0px" @command="handleCommand">
                <span class="el-dropdown-link">
                  <el-button
                    plain
                    type="text"
                    style="float: right; padding: 3px 5px"
                    icon="el-icon-more"
                  />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="{command:'chart', equipmentId: row.id}">Chart</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <small style="padding-left: 5px">({{ row.abbreviation }})</small>
              <el-tag size="small" style="margin-left: 15px"> {{ row.type }} </el-tag>
            </div>
            <div class="text item">
              <span>Sensors:</span>
              <div v-for="sensor in row.sensor" :key="sensor.id">
                <div style="margin: 6px 20px">
                  <router-link :to="{ path: '/sensor/detail/' + experimentId + '/'+ sensor.id}" class="link-type">
                    <span class="link-type"> <b> {{ sensor.name }} </b></span>
                  </router-link>
                  <small style="padding-left: 5px">({{ sensor.abbreviation }})</small>
                  <el-tag size="small" type="success" style="margin-left: 10px"> {{ sensor.type }} </el-tag>
                </div>
              </div>
            </div>
            <el-divider />
            <small> {{ row.descript }} </small>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { fetchExperiment } from '@/api/experiment'

export default {
  name: 'ExperimentDetail',
  components: {},
  data() {
    return {
      experimentId: '0',
      list: [],
      loading: false
    }
  },
  computed: {},
  created() {
    this.experimentId = this.$route.params && this.$route.params.id
    this.fetchData(this.experimentId)
  },
  methods: {
    handleCommand(command) {
      if (command.command === 'chart') {
        this.$router.push({ path: '/equipment/chart/' + this.experimentId + '/' + command.equipmentId })
      }
    },
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
