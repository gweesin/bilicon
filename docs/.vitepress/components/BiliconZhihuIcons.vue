<script setup lang="ts">
import { Icon, addCollection, listIcons } from '@iconify/vue'
import { zhihuIconifyJSON } from 'bilicon';
import BiliIconCard from './BiliIconCard.vue';
import { ref, computed } from 'vue'
import orderMap from '../../assets/zhihu-order.json'

addCollection(zhihuIconifyJSON);
const icons = listIcons('', 'zhihu').sort((a, b) => {
  const aOrder = orderMap[a.replace('zhihu:', '')] || -1
  const bOrder = orderMap[b.replace('zhihu:', '')] || -1
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
      <BiliIconCard v-for="iconName in computedIcons" :key="iconName" prefix="zhihu" :icon-name="iconName.replace('zhihu:', '')" />
    </div>
  </div>
</template>
