<template>
  <experiment-edit :is-edit="false" />
</template>

<script>
import ExperimentEdit from './components/ExperimentEdit'

export default {
  name: 'CreateExperiment',
  components: { ExperimentEdit }
}
</script>

