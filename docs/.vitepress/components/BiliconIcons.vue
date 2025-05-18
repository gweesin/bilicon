<script setup lang="ts">
import { Icon, addCollection, listIcons } from '@iconify/vue'
import { biliIconifyJSON } from 'bilicon';
import BiliIconCard from './BiliIconCard.vue';
import { ref, computed } from 'vue'

addCollection(biliIconifyJSON);
const icons = listIcons('', 'bili')

const searchContent = ref('')
const computedIcons = computed(() => {
  if (searchContent.value.length > 0) {
    return icons.filter((icon) => icon.includes(searchContent.value))
  }

  return icons;
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