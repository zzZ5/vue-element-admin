<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(record,index) of records" :key="index" :timestamp="record.created_time" placement="top">
        <el-card>
          <h4>{{ record.record }}</h4>
          <p>{{ record.user.username }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { getRecord } from '@/api/user'

export default {
  data() {
    return {
      records: null,
      query: {
        page: 1,
        size: 5
      },
      loading: false
      // {
      //   timestamp: '2019/4/20',
      //   title: 'Update Github template',
      //   content: 'PanJiaChen committed 2019/4/20 20:46'
      // },
      // {
      //   timestamp: '2019/4/21',
      //   title: 'Update Github template',
      //   content: 'PanJiaChen committed 2019/4/21 20:46'
      // },
      // {
      //   timestamp: '2019/4/22',
      //   title: 'Build Template',
      //   content: 'PanJiaChen committed 2019/4/22 20:46'
      // },
      // {
      //   timestamp: '2019/4/23',
      //   title: 'Release New Version',
      //   content: 'PanJiaChen committed 2019/4/23 20:46'
      // }
    }
  },
  created() {
    this.getRecord()
  },
  methods: {
    getRecord() {
      this.loading = true
      getRecord(this.query).then(response => {
        this.records = response.data.list
        this.loading = false
      })
    }
  }
}
</script>
