<script lang="ts" setup>
import {useToggle} from '@vueuse/shared'
import {useDark} from "@vueuse/core";

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <el-button @click="toggleDark()">
    <span >{{ isDark ? 'Light': 'Dark' }}</span>
  </el-button>
</template>
