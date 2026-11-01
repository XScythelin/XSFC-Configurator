import { beforeEach, describe, expect, it } from "vitest";
import MspHelper from "../../../src/js/msp/MSPHelper";
import MSPCodes from "../../../src/js/msp/MSPCodes";
import FC from "../../../src/js/fc";
import { pinia } from "../../../src/js/pinia_instance";
import { useCpuLoadStore } from "../../../src/stores/cpuLoad";

const helper = new MspHelper();
function receive(code, bytes) {
    helper.process_data({
        code,
        dataView: new DataView(Uint8Array.from(bytes).buffer),
        crcError: false,
        callbacks: [],
    });
}

describe("XSFC API 1.43 payload compatibility", () => {
    beforeEach(() => {
        FC.resetState();
        FC.CONFIG.apiVersion = "1.43.0";
        FC.CONFIG.boardIdentifier = "XSFC";
    });

    it.each([0.34, 4.2, 32.5])("decodes %s A consistently across all current messages", (amps) => {
        const centiamps = Math.round(amps * 100);
        const milliamps = Math.round(amps * 1000);
        const lo = (n) => n & 255;
        const hi = (n) => (n >> 8) & 255;
        receive(MSPCodes.MSP_ANALOG, [120, 0, 0, 0, 0, lo(centiamps), hi(centiamps), 176, 4]);
        receive(MSPCodes.MSP_BATTERY_STATE, [3, 0, 0, 120, 0, 0, lo(centiamps), hi(centiamps), 0, 176, 4]);
        receive(MSPCodes.MSP_CURRENT_METERS, [10, 0, 0, lo(milliamps), hi(milliamps)]);
        expect(FC.ANALOG.amperage).toBeCloseTo(amps);
        expect(FC.BATTERY_STATE.amperage).toBeCloseTo(amps);
        expect(FC.CURRENT_METERS[0].amperage).toBeCloseTo(amps);
    });

    it("preserves interpolation and smoothing fields when saving receiver thresholds", () => {
        // Firmware order: provider, thresholds, bind, pulse limits, interpolation,
        // SPI placeholders, camera, smoothing and auto factor. Exactly 31 bytes.
        const bytes = [
            9, 108, 7, 220, 5, 76, 4, 0, 117, 3, 67, 8, 2, 19, 220, 5, 0, 0, 0, 0, 0, 0, 0, 2, 1, 80, 65, 0, 1, 0, 30,
        ];
        receive(MSPCodes.MSP_RX_CONFIG, bytes);
        expect(helper.crunch(MSPCodes.MSP_SET_RX_CONFIG)).toEqual(bytes);
        expect(FC.RX_CONFIG.rcInterpolation).toBe(2);
        expect(FC.RX_CONFIG.rcSmoothingDerivativeType).toBe(1);
    });

    it("decodes the physical CPU extension through the real status handler", () => {
        const bytes = new Uint8Array(30);
        bytes.set([88, 67, 1, 2], 22);
        const view = new DataView(bytes.buffer);
        view.setUint16(11, 64, true);
        view.setUint16(26, 725, true);
        view.setUint16(28, 130, true);
        receive(MSPCodes.MSP_STATUS_EX, bytes);
        expect(FC.CONFIG.cpuload).toBe(64);
        expect(useCpuLoadStore(pinia).coreLoads).toEqual([72.5, 13]);
        receive(MSPCodes.MSP_STATUS_EX, bytes.slice(0, 22));
        expect(useCpuLoadStore(pinia).coreLoads).toBeNull();
    });

    it("preserves all filter coefficients and maps XSFC dynamic-notch count", () => {
        const bytes = new Array(45).fill(0);
        const view = new DataView(Uint8Array.from(bytes).buffer);
        // Full-width LPF supersedes the legacy one-byte LPF field.
        view.setUint8(0, 120);
        view.setUint16(20, 120, true);
        view.setUint8(37, 3); // deprecated range
        view.setUint8(38, 4); // XSFC notch count
        view.setUint16(39, 400, true);
        view.setUint16(41, 90, true);
        view.setUint8(43, 3);
        view.setUint8(44, 80);
        // Correct total is 47 bytes including max frequency.
        const packet = [...new Uint8Array(view.buffer), 0, 0];
        packet[45] = 88;
        packet[46] = 2;
        receive(MSPCodes.MSP_FILTER_CONFIG, packet);
        expect(helper.crunch(MSPCodes.MSP_SET_FILTER_CONFIG)).toEqual(packet);
        expect(FC.FILTER_CONFIG.dyn_notch_count).toBe(4);
    });

    it("preserves supported advanced PID values without appending newer API fields", () => {
        const view = new DataView(new ArrayBuffer(50));
        view.setUint8(9, 180);
        view.setUint8(17, 55); // angle limit
        view.setUint16(21, 1000, true); // legacy anti-gravity placeholder
        view.setUint16(23, 180, true); // full-width setpoint weight
        view.setUint8(27, 2); // I-term relax
        view.setUint8(28, 1); // setpoint relax type
        view.setUint16(32, 123, true); // roll F
        view.setUint16(34, 456, true); // pitch F
        view.setUint16(36, 789, true); // yaw F
        view.setUint8(46, 15); // relax cutoff
        view.setUint8(47, 85); // motor output limit
        const packet = [...new Uint8Array(view.buffer)];
        receive(MSPCodes.MSP_PID_ADVANCED, packet);
        expect(FC.ADVANCED_TUNING.feedforwardPitch).toBe(456);
        expect(FC.ADVANCED_TUNING.motorOutputLimit).toBe(85);
        expect(helper.crunch(MSPCodes.MSP_SET_PID_ADVANCED)).toEqual(packet);

        FC.ADVANCED_TUNING.levelAngleLimit = 60;
        const saved = helper.crunch(MSPCodes.MSP_SET_PID_ADVANCED);
        packet[17] = 60;
        expect(saved).toEqual(packet);
    });

    it("does not apply Betaflight raw-gyro scaling to XSFC degrees per second", () => {
        const view = new DataView(new ArrayBuffer(18));
        view.setInt16(6, -123, true);
        view.setInt16(8, 456, true);
        receive(MSPCodes.MSP_RAW_IMU, new Uint8Array(view.buffer));
        expect(FC.SENSOR_DATA.gyroscope).toEqual([-123, 456, 0]);
    });
});
