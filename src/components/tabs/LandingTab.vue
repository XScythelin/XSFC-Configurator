<template>
    <BaseTab tab-name="landing">
        <div class="content_wrapper"></div>
    </BaseTab>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import BaseTab from "./BaseTab.vue";
import GUI from "../../js/gui";

onMounted(() => GUI.content_ready());
</script>
