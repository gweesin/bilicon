<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';
import copy from "../utils/copy";

const props = defineProps({
  prefix: String,
  iconName: String
})

const icon = computed(() => props.prefix + ':' + props.iconName)
const isCopied = ref(false)
let timeout = null

function copyToClipboard() {
  copy(icon.value)
  clearTimeout(timeout)
  isCopied.value = true
  timeout = setTimeout(() => {
    isCopied.value = false
  }, 2000)
}
</script>

<template>
  <div class="relative border rounded border-gray-500/10 shadow-lg bg-gray-500/30 p-4 transition-all hover:scale-105 hover:shadow-lg hover:bg-gray-500/10 cursor-pointer" @click="copyToClipboard">
    <Icon :icon="icon" width="4em" height="4em" />
    <span class="absolute bottom-0 text-xs text-center text-nowrap left-0 right-0 scale-75">{{ iconName }}</span>
    <i class="text-xs text-gray-500/50 absolute top-0 right-0 p-1" v-show="isCopied">
      copied<span class="text-green-500">√</span>
    </i>
  </div>
</template>
