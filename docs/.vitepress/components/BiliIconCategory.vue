<script setup lang="ts">
import type {IconSet} from "@iconify/tools/lib/icon-set";
import BiliIconCard from "./BiliIconCard.vue";
import {computed} from "vue";
import biliOrderMap from '../../assets/bili-order.json'

const props = defineProps<{
  category: string;
  keyword: string;
  iconSet: IconSet;
}>()

const computedIcons = computed(() => {
  let icons = props.iconSet.listCategory(props.category);

  // TODO remove hard code
  if (props.category === '小黄脸') {
    icons = icons.sort((a, b) => {
      const aOrder = biliOrderMap[a] || -1
      const bOrder = biliOrderMap[b] || -1
      return aOrder - bOrder
    })
  }
  if (props.keyword.length > 0) {
    return icons.filter((icon) => icon.includes(props.keyword))
  }

  return icons;
})
</script>

<template>
  <div :key="category">
    <div class="flex my-4">
      <div class="inline-block h-[25px] min-h-[1em] w-1 rounded self-stretch dark:bg-[var(--vp-c-brand-1)] ml-5 mr-2"></div>

      <div class="text-[var(--vp-c-text-2)]">{{ category }}</div>
    </div>

    <div class="grid IconCardLayout gap-2 mt-2 justify-center">
      <BiliIconCard v-for="iconName in computedIcons" :key="iconName" :prefix="iconSet.prefix" :icon-name="iconName" />
    </div>
  </div>
</template>
