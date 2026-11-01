import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import FC from "../../src/js/fc";
import { usePower } from "../../src/composables/usePower";

describe("XSFC current calibration", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        FC.resetState();
        FC.CONFIG.boardIdentifier = "XSFC";
        FC.CONFIG.apiVersion = "1.43.0";
        FC.CURRENT_METER_CONFIGS = [{ scale: 100, offset: 0 }];
    });

    it("increases multiplicative scale when the reference current is higher", () => {
        const power = usePower();
        power.batteryConfig.currentMeterSource = 1;
        power.currentConfigs.push({ scale: 100, offset: 0 });
        power.currentMeters.push({ amperage: 0.8 });
        power.amperagecalibrationValue.value = 4;
        power.calibrate();
        expect(power.currentConfigs[0].scale).toBe(500);
        expect(power.amperagescalechanged.value).toBe(true);
    });

    it("does not calibrate a disabled source or divide by zero", () => {
        const power = usePower();
        power.currentConfigs.push({ scale: 100, offset: 0 });
        power.currentMeters.push({ amperage: 0 });
        power.amperagecalibrationValue.value = 4;
        power.calibrate();
        expect(power.currentConfigs[0].scale).toBe(100);
        power.batteryConfig.currentMeterSource = 1;
        power.calibrate();
        expect(power.currentConfigs[0].scale).toBe(100);
        expect(power.amperagescalechanged.value).toBe(false);
    });
});
