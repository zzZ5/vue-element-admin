<template>
  <sensor-detail :is-edit="true" />
</template>

<script>
import SensorDetail from './components/SensorDetail'

export default {
  name: 'EditForm',
  components: { SensorDetail }
}
</script>
