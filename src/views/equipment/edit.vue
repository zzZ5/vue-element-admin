<template>
  <equipment-edit :is-edit="true" />
</template>

<script>
import EquipmentEdit from './components/EquipmentEdit'

export default {
  name: 'EditForm',
  components: { EquipmentEdit }
}
</script>
