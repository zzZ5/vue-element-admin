<template>
  <experiment-detail :is-edit="true" />
</template>

<script>
import ExperimentDetail from './components/ExperimentDetail'

export default {
  name: 'DetailForm',
  components: { ExperimentDetail }
}
</script>
