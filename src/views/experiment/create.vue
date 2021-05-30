<template>
  <Experiment-detail :is-edit="false" />
</template>

<script>
import ExperimentDetail from './components/ExperimentDetail'

export default {
  name: 'CreateExperiment',
  components: { ExperimentDetail }
}
</script>

