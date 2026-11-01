import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useCpuLoadStore } from "../../../src/stores/cpuLoad";
import Features from "../../../src/js/Features";

describe("XSFC physical core loads", () => {
    beforeEach(() => setActivePinia(createPinia()));

    function status() {
        const data = new DataView(new ArrayBuffer(30));
        [88, 67, 1, 2].forEach((value, index) => data.setUint8(22 + index, value));
        data.setUint16(26, 723, true);
        data.setUint16(28, 185, true);
        return data;
    }

    it("keeps physical core order and tenths of a percent", () => {
        const store = useCpuLoadStore();
        store.readStatusTail(status(), true);
        expect(store.coreLoads).toEqual([72.3, 18.5]);
    });

    it("clears stale values for legacy firmware, other boards and invalid tails", () => {
        const store = useCpuLoadStore();
        for (const data of [new DataView(new ArrayBuffer(22)), new DataView(new ArrayBuffer(29)), status()]) {
            store.readStatusTail(status(), true);
            if (data.byteLength === 30) data.setUint8(24, 2);
            store.readStatusTail(data, true);
            expect(store.coreLoads).toBeNull();
        }
        store.readStatusTail(status(), false);
        expect(store.coreLoads).toBeNull();
        const invalid = status();
        invalid.setUint16(26, 1001, true);
        store.readStatusTail(invalid, true);
        expect(store.coreLoads).toBeNull();
    });

    it("exposes and toggles actual XSFC dynamic-filter bit 29", () => {
        const features = new Features({ apiVersion: "1.43.0", boardIdentifier: "XSFC", buildOptions: [] });
        features.enable("DYNAMIC_FILTER");
        expect(features.peekMask()).toBe(1 << 29);
        expect(features.isEnabled("DYNAMIC_FILTER")).toBe(true);
        features.disable("DYNAMIC_FILTER");
        expect(features.peekMask()).toBe(0);
    });
});
