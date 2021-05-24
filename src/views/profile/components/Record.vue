<template>
  <div class="block">
    <el-timeline v-loading="listLoading">
      <el-timeline-item v-for="(record,index) of records" :key="index" :timestamp="record.created_time" placement="top">
        <el-card>
          <h4>{{ record.record }}</h4>
          <p> <svg-icon icon-class="modifier" /> {{ record.user.username }} </p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <pagination v-show="pagination.total_size>0" :total="pagination.total_size" :page.sync="listQuery.page" :size.sync="listQuery.size" @pagination="getRecord" />
  </div>
</template>

<script>

import { getRecord } from '@/api/user'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  data() {
    return {
      records: null,
      pagination: {
        total_size: 0
      },
      listQuery: {
        page: 1,
        size: 20
      },
      listLoading: false

    }
  },
  created() {
    this.getRecord()
  },
  methods: {
    getRecord() {
      this.listLoading = true
      getRecord(this.listQuery).then(response => {
        this.records = response.data.list
        this.pagination = response.data.pagination
        this.listLoading = false
      })
    }

  }
}
</script>
