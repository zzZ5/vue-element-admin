<template>
  <equipment-detail :is-edit="false" />
</template>

<script>
import EquipmentDetail from './components/EquipmentDetail'

export default {
  name: 'CreateEquipment',
  components: { EquipmentDetail }
}
</script>

