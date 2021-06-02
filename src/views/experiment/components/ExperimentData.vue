<template>
  <experiment-list :user="true" :user-id="userId" />
</template>

<script>

export default {
  name: 'ExperimentData',
  components: { },
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
