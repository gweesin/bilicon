<script setup lang="ts">
import { Icon, addCollection, } from '@iconify/vue'
import { ref } from 'vue'
import bili from 'bilicon/json/bili.json'
import { IconSet } from '@iconify/tools/lib/icon-set';
import BiliIconCategory from "./BiliIconCategory.vue";

addCollection(bili);
const iconSet = new IconSet(bili)
const categoryTitles = Array.from(iconSet.categories.values()).map(category => category.title)
    // TODO remove hard code
    .sort((a, b) => {
  if (a === '小黄脸') return -1
  if (b === '小黄脸') return 1
  return a.localeCompare(b)
})

const keyword = ref('')
</script>

<template>
  <div class="w-full p-2 pb-8">
    <div class="flex justify-end mb-2 relative">
      <div class="flex justify-center items-center border-b mx-6 w-full sm:mr-12 sm:w-auto absolute top-2">
        <Icon icon="iconamoon:search-thin" width="1.3em" height="1.3em" />
        <input v-model="keyword" placeholder="Search icons..." class="p-1! flex-1"/>
      </div>
    </div>

    <BiliIconCategory v-for="category in categoryTitles" :key="category" :keyword="keyword" :category="category" :icon-set="iconSet" />
  </div>
</template>
