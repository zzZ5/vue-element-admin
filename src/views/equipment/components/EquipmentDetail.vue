<template>
  <div class="experimentDetail-container">
    <div v-loading class="experimentDetail-main-container">
      <el-row :gutter="20" style="margin-top: 50px">
        <el-col v-for="row in list" :key="row.id" :span="6">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <b> {{ row.name }} </b>
              <el-button
                plain
                type="text"
                style="float: right; padding: 3px 5px"
                icon="el-icon-more"
              />
              <small style="padding-left: 5px">({{ row.abbreviation }})</small>
              <el-tag size="small" style="margin-left: 15px"> {{ row.type }} </el-tag>
            </div>
            <div class="text item">
              <span>{{ row.descript }}</span>
            </div>
            <el-divider />
            <small> {{ row.data_latest }} </small>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { fetchEquipment } from '@/api/equipment'

export default {
  name: 'EquipmentDetail',
  components: {},
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
      fetchEquipment(id).then((response) => {
        this.list = response.data.sensor
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
