<script setup lang="ts">
import { Icon, listIcons } from '@iconify/vue'
import BiliIconCard from './BiliIconCard.vue';
import { ref, computed } from 'vue'
import orderMap from '../../assets/zhihu-order.json'

const props = defineProps({
  prefix: {
    type: String,
    required: true
  }
})

const icons = listIcons('', props.prefix).sort((a, b) => {
  const aOrder = orderMap[a.replace(props.prefix + ':', '')] || 999
  const bOrder = orderMap[b.replace(props.prefix + ':', '')] || 999
  return aOrder - bOrder
})

const searchContent = ref('')
const computedIcons = computed(() => {
  if (searchContent.value.length > 0) {
    return icons.filter((icon) => icon.includes(searchContent.value))
  }

  return icons;
})
</script>

<template>
  <div class="w-full p-2 pb-8">
    <div class="flex justify-end">
      <div class="flex justify-center items-center border-b mx-6 w-full sm:mr-12 sm:w-auto">
        <Icon icon="iconamoon:search-thin" width="1.3em" height="1.3em" />
        <input v-model="searchContent" placeholder="Search icons..." class="p-1! flex-1"/>
      </div>
    </div>

    <div class="grid IconCardLayout gap-2 mt-2 justify-center">
      <BiliIconCard v-for="iconName in computedIcons" :key="iconName" :prefix="prefix" :icon-name="iconName.replace(prefix + ':', '')" />
    </div>
  </div>
</template>
