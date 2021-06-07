<template>
  <div class="app-container">
    <div class="filter-container">

      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        Export
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >

      <el-table-column label="Value" min-width="50px">
        <template slot-scope="{ row }">
          <span>{{ row.value }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Unit" min-width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.unit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Measured Time" min-width="120px">
        <template slot-scope="{ row }">
          <span> {{ row.measured_time }} </span>
        </template>
      </el-table-column>

      <pagination
        v-show="pagination.total_size > 0"
        :total="pagination.total_size"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.size"
        @pagination="getList"
      />
    </el-table>
  </div>
</template>

<script>
import { fetchData } from '@/api/sensor'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'Equipment',
  components: { Pagination },
  directives: { waves },
  filters: {
  },
  props: {
  },
  data() {
    return {
      list: null,
      pagination: { total_size: 0 },
      listLoading: true,
      listQuery: {
        experiment: '0',
        page: 1,
        size: 100,
        step: 1
      },
      downloadLoading: false
    }
  },
  created() {
    const experimentId = this.$route.params && this.$route.params.experimentId
    this.listQuery.experiment = experimentId
    const id = this.$route.params && this.$route.params.sensorId
    this.getList(id)
  },
  methods: {
    getList(id) {
      this.listLoading = true
      fetchData(id, this.listQuery).then((response) => {
        this.list = response.data.list
        this.pagination = response.data.pagination

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then((excel) => {
        const tHeader = [
          'Value',
          'Unit',
          'Measured time'
        ]
        const filterVal = [
          'value',
          'unit',
          'measured_time'
        ]
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'data-table'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map((v) =>
        filterVal.map((j) => {
          if (j === 'measured_time') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    }
  }
}
</script>
