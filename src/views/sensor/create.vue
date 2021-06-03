<template>
  <sensor-edit :is-edit="false" />
</template>

<script>
import SensorEdit from './components/SensorEdit'

export default {
  name: 'CreateSensor',
  components: { SensorEdit }
}
</script>

