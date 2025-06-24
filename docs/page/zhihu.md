---
layout: page
---

<script setup>
import zhihu from 'bilicon/json/zhihu.json';
import { addCollection } from '@iconify/vue';

addCollection(zhihu)
</script>

<BiliconSingleCollection prefix="zhihu"/>
