<template>
  <equipment-detail :is-edit="true" />
</template>

<script>
import EquipmentDetail from './components/EquipmentDetail'

export default {
  name: 'EditForm',
  components: { EquipmentDetail }
}
</script>
