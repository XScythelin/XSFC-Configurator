import { beforeEach, describe, expect, it } from "vitest";
import FC from "../../../src/js/fc";
import { generateFilename } from "../../../src/js/utils/generate_filename";
import { entriesFromModeRanges } from "../../../src/js/utils/modeRanges";

describe("XSFC backup identity and mode ranges", () => {
    beforeEach(() => {
        FC.resetState();
        FC.CONFIG.apiVersion = "1.43.0";
        FC.CONFIG.flightControllerIdentifier = "BTFL";
        FC.CONFIG.boardIdentifier = "XSFC";
    });
    it.each(["cli", "BLACKBOX_LOG"])("uses XSFC for %s downloads without changing the wire variant", (prefix) => {
        expect(generateFilename(prefix, "txt")).toMatch(new RegExp(`^XSFC_${prefix}_`));
        expect(FC.CONFIG.flightControllerIdentifier).toBe("BTFL");
    });
    it("preserves other controller filename prefixes", () => {
        FC.CONFIG.boardIdentifier = "OTHER";
        expect(generateFilename("cli", "txt")).toMatch(/^BTFL_cli_/);
    });
    it("decodes the supplied dump as one ARM and one ANGLE, not two ARM conditions", () => {
        const ranges = [
            { id: 0, auxChannelIndex: 0, range: { start: 1800, end: 2100 } },
            { id: 2, auxChannelIndex: 2, range: { start: 900, end: 2100 } },
            ...Array.from({ length: 6 }, () => ({ id: 0, auxChannelIndex: 0, range: { start: 900, end: 900 } })),
        ];
        const entries = entriesFromModeRanges(ranges, ranges.map(r => ({ id: r.id, modeLogic: 0, linkedTo: 0 })));
        expect(entries.map(e => e.modeId)).toEqual([0, 2]);
    });
});
