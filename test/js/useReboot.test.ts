import { beforeEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({
    promise: vi.fn(),
    reboot: vi.fn(),
    cleanup: vi.fn((done: () => void) => done()),
    guard: vi.fn(),
    log: vi.fn(),
    config: { armingDisabled: true },
}));
vi.mock("../../src/js/serial_backend", () => ({ reinitializeConnection: mocks.reboot }));
vi.mock("../../src/stores/navigation", () => ({ useNavigationStore: () => ({ cleanup: mocks.cleanup }) }));
vi.mock("../../src/js/msp/MSPHelper", () => ({ mspHelper: { setArmingEnabled: mocks.guard } }));
vi.mock("../../src/js/msp", () => ({ default: { promise: mocks.promise } }));
vi.mock("../../src/js/fc", () => ({ default: { CONFIG: mocks.config } }));
vi.mock("../../src/js/gui_log", () => ({ gui_log: mocks.log }));
vi.mock("../../src/js/localization", () => ({ i18n: { getMessage: (key: string) => key } }));
import { useReboot } from "../../src/composables/useReboot";
import MSPCodes from "../../src/js/msp/MSPCodes";

describe("save and reboot lifecycle", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mocks.promise.mockResolvedValue(undefined);
        mocks.config.armingDisabled = true;
    });
    it("waits for EEPROM ACK before cleanup and reboot", async () => {
        let acknowledge!: () => void;
        mocks.promise.mockReturnValue(
            new Promise<void>((resolve) => {
                acknowledge = resolve;
            }),
        );
        const saving = useReboot().saveAndReboot();
        expect(mocks.promise).toHaveBeenCalledWith(MSPCodes.MSP_EEPROM_WRITE);
        expect(mocks.cleanup).not.toHaveBeenCalled();
        acknowledge();
        await saving;
        expect(mocks.cleanup).toHaveBeenCalledOnce();
        expect(mocks.reboot).toHaveBeenCalledOnce();
    });
    it("rejects EEPROM cancellation/timeout instead of hanging or rebooting", async () => {
        const error = new Error("EEPROM request cancelled");
        mocks.promise.mockRejectedValue(error);
        await expect(useReboot().saveAndReboot()).rejects.toBe(error);
        expect(mocks.cleanup).not.toHaveBeenCalled();
        expect(mocks.reboot).not.toHaveBeenCalled();
    });
    it("propagates a reboot-start failure", async () => {
        mocks.reboot.mockImplementationOnce(() => {
            throw new Error("reboot failed");
        });
        await expect(useReboot().saveAndReboot()).rejects.toThrow("reboot failed");
    });
});
