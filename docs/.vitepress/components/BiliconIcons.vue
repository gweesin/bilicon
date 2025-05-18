<script setup lang="ts">
import { Icon, addCollection, listIcons } from '@iconify/vue'
import { biliIconifyJSON } from 'bilicon';
import BiliIconCard from './BiliIconCard.vue';
import { ref, computed } from 'vue'

addCollection(biliIconifyJSON);
const icons = ref([])
fetch('/bili-order.json').then(res => res.json()).then((orderMap) => {
  icons.value = listIcons('', 'bili').sort((a, b) => {
    const aOrder = orderMap[a.replace('bili:', '')] || -1
    const bOrder = orderMap[b.replace('bili:', '')] || -1
    return aOrder - bOrder
  })
})

const searchContent = ref('')
const computedIcons = computed(() => {
  if (searchContent.value.length > 0) {
    return icons.value.filter((icon) => icon.includes(searchContent.value))
  }

  return icons.value;
})
</script>

<template>
  <div class="p-2 w-full">
    <div class="flex justify-end">
      <div class="flex justify-center items-center border-b mr-10">
        <Icon icon="iconamoon:search-thin" width="1.3em" height="1.3em" />
        <input v-model="searchContent" placeholder="Search icons..." class="p-1!"/>
      </div>
    </div>

    <div class="flex flex-wrap justify-center items-center gap-2 mt-2">
      <BiliIconCard v-for="iconName in computedIcons" :key="iconName" prefix="bili" :icon-name="iconName.replace('bili:', '')" />
    </div>
  </div>
</template>

<style scoped>

</style>