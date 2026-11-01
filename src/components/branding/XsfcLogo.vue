<template>
    <div class="xsfc-brand" :title="tooltip" aria-label="XSFC Configurator">
        <img src="../../images/xsfc-icon.svg" alt="" class="xsfc-brand__icon" />
        <div class="xsfc-brand__name">XSFC <span>CONFIGURATOR</span></div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    configuratorVersion: string;
    firmwareVersion?: string;
    firmwareId?: string;
    hardwareId?: string;
}>();
const tooltip = computed(() =>
    ["XSFC Configurator " + props.configuratorVersion, props.firmwareVersion, props.hardwareId].filter(Boolean).join("\n"),
);
</script>

<style>
.xsfc-brand { display: flex; align-items: center; gap: 0.6rem; padding: 0.25rem 0 0.5rem; margin-bottom: 0.5rem; }
.xsfc-brand__icon { width: 48px; height: 48px; }
.xsfc-brand__name { font-size: 1.7rem; font-weight: 700; letter-spacing: 0.1em; color: var(--text); }
.xsfc-brand__name span { display: block; font-size: 0.5rem; letter-spacing: 0.15em; }
@media (max-width: 1055px) { .xsfc-brand { justify-content: center; } .xsfc-brand__name { display: none; } }
@media (max-width: 575px) { .xsfc-brand { display: none; } }
</style>
