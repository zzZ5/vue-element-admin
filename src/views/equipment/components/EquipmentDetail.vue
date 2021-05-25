<template>
  <div class="createEquipment-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <sticky :z-index="10" class-name="sub-navbar draft">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          Publish
        </el-button>
      </sticky>

      <div class="createEquipment-main-container">
        <el-row>
          <el-col :span="24">
            <el-row>
              <el-col :span="10">
                <el-form-item style="margin-bottom: 40px; margin-right: 40px" prop="name">
                  <MDinput v-model="postForm.name" :maxlength="100" name="name" required>
                    Name
                  </MDinput>
                </el-form-item>
              </el-col>
              <el-col :span="4" />
              <el-col :span="10">
                <el-form-item style="margin-bottom: 40px;" prop="abbreviation">
                  <MDinput v-model="postForm.abbreviation" :maxlength="100" name="abbreviation" required>
                    Abbreviation
                  </MDinput>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="60px" label="Type:" class="postInfo-container-item">
                    <el-select v-model="postForm.type">
                      <el-option v-for="(item,index) in typeOptions" :key="item+index" :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="10">
                  <el-form-item v-if="postForm.created_time" label-width="120px" label="Created Time:" class="postInfo-container-item">
                    {{ postForm.created_time }}
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" label-width="70px" label="Descripy:">
          <el-input v-model="postForm.descript" :rows="1" type="textarea" class="article-textarea" autosize placeholder="Please enter the content" />
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span>
        </el-form-item>
        <el-form-item style="margin-bottom: 40px;" label-width="70px" label="Sensor:" label-position="top">
          <el-transfer
            v-model="postForm.sensor"
            style="text-align: left; display: inline-block"
            :render-content="renderFunc"
            :titles="['Outside', 'Inside']"
            :data="sensorList"
          />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import { fetchEquipment } from '@/api/equipment'
import { fetchList } from '@/api/sensor'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件

const defaultForm = {
  id: undefined,
  name: '', // 设备名
  abbreviation: '', // 设备简称
  type: '', // 设备类型
  descript: '', // 设备描述
  sensor: [], // 设备传感器
  created_time: undefined // 设备创建时间
}

export default {
  name: 'EquipmentDetail',
  components: { Sticky, MDinput },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必填项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必填项'))
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      sensorList: [],
      loading: false,
      typeOptions: ['RE'],
      rules: {
        name: [{ validator: validateRequire }],
        abbreviation: [{ validator: validateRequire }],
        type: [{ validator: validateRequire }],
        descript: [{ validator: validateRequire }]
      },
      pagination: {
        total_size: 0
      },
      listQuery: {
        page: 1,
        size: 20
      },
      listLoading: false,
      renderFunc(h, option) {
        return <span>{ option.id } - { option.name }</span>
      },
      tempRoute: {}
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.descript.length
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
      this.getSensorList()
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    getSensorList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.sensorList = response.data.list
        this.pagination = response.data.pagination
        this.listLoading = false
      })
    },

    fetchData(id) {
      fetchEquipment(id).then(response => {
        this.postForm = response.data
        // set tagsview title
        this.setTagsViewTitle()
        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = 'Edit Equipment'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = 'Edit Equipment'
      document.title = `${title} - ${this.postForm.id}`
    },
    submitForm() {
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$notify({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000
          })
          this.postForm.status = 'published'
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
    // getSensorList(query) {
    //   searchUser(query).then(response => {
    //     if (!response.data.items) return
    //     this.userListOptions = response.data.items.map(v => v.name)
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createEquipment-container {
  position: relative;

  .createEquipment-main-container {
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

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
