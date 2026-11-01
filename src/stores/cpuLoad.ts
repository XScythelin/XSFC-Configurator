import { defineStore } from "pinia";
import { ref } from "vue";

export const useCpuLoadStore = defineStore("cpuLoad", () => {
    const coreLoads = ref<number[] | null>(null);

    /** Decode the optional XSFC v1 physical-core timing tail; old firmware has none. */
    function readStatusTail(data: DataView, xsfc: boolean) {
        coreLoads.value = null;
        const offset = 22;
        if (!xsfc || data.byteLength !== offset + 8) return;
        if (
            data.getUint8(offset) !== 88 ||
            data.getUint8(offset + 1) !== 67 ||
            data.getUint8(offset + 2) !== 1 ||
            data.getUint8(offset + 3) !== 2
        )
            return;
        const loads = [data.getUint16(offset + 4, true), data.getUint16(offset + 6, true)];
        if (loads.some((load) => load > 1000)) return;
        coreLoads.value = loads.map((load) => load / 10);
    }

    return { coreLoads, readStatusTail };
});
