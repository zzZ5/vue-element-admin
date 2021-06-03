<template>
  <equipment-edit :is-edit="false" />
</template>

<script>
import EquipmentEdit from './components/EquipmentEdit'

export default {
  name: 'CreateEquipment',
  components: { EquipmentEdit }
}
</script>

