<script setup lang="ts">
import { useConfigFilesStore } from '@/stores/configFiles'
import { storeToRefs } from 'pinia'

const store = useConfigFilesStore()
const { enabledCount } = storeToRefs(store)
</script>

<template>
<p>{{ enabledCount }} configured</p>

<button @click="store.toggleFile('agent')">
  Toggle agent
</button>
</template>
