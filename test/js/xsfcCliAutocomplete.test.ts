import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CliAutoComplete from "../../src/js/CliAutoComplete";
import FC from "../../src/js/fc";
import CONFIGURATOR from "../../src/js/data_storage";

describe("XSFC CLI autocomplete compatibility", () => {
    const send = vi.fn();
    const output = vi.fn();

    beforeEach(() => {
        vi.useFakeTimers();
        vi.clearAllMocks();
        FC.CONFIG.boardIdentifier = "XSFC";
        FC.CONFIG.flightControllerIdentifier = "BTFL";
        CONFIGURATOR.cliActive = true;
        CONFIGURATOR.cliValid = true;
        CliAutoComplete.configEnabled = false;
        CliAutoComplete.initialize(send, output, () => true);
    });

    afterEach(() => {
        CliAutoComplete.cleanup();
        CliAutoComplete.configEnabled = false;
        CONFIGURATOR.cliActive = false;
        CONFIGURATOR.cliValid = false;
        FC.CONFIG.boardIdentifier = "";
        vi.useRealTimers();
    });

    it("does not build, suppress output or wait for retries even with a saved enabled setting", () => {
        CliAutoComplete.setEnabled(true);
        expect(CliAutoComplete.isEnabled()).toBe(false);
        CliAutoComplete.builderStart();
        vi.advanceTimersByTime(30_000);
        expect(send).not.toHaveBeenCalled();
        expect(output).not.toHaveBeenCalled();
        expect(CliAutoComplete.isSuppressingOutput()).toBe(false);
        expect(CliAutoComplete.builder.state).toBe("reset");
    });

    it("still supports the upstream Betaflight builder", () => {
        FC.CONFIG.boardIdentifier = "OTHER";
        CliAutoComplete.setEnabled(true);
        expect(CliAutoComplete.isEnabled()).toBe(true);
        expect(send).toHaveBeenCalledOnce();
        expect(CliAutoComplete.isBuilding()).toBe(true);
    });
});
