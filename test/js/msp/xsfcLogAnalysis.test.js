import { it } from "vitest";
import fs from "node:fs";
import { FlightLogParser } from "../../../src/blackbox-viewer/flightlog_parser";

it.skipIf(!process.env.XSFC_ANALYZE_LOG)("analyzes supplied XSFC flight log", () => {
    const path = process.env.XSFC_ANALYZE_LOG;
    if (!path) return;
    const data = new Uint8Array(fs.readFileSync(path));
    const parser = new FlightLogParser(data);
    parser.parseHeader(0, data.length);
    const names = parser.frameDefs.I.name;
    const rows = [];
    const frameTypes = [];
    let invalid = 0;
    parser.onFrameReady = (valid, frame, type) => {
        if (type !== "I" && type !== "P") return;
        if (valid) { rows.push([...frame]); frameTypes.push(type); } else invalid++;
    };
    parser.parseLogData(false, undefined, data.length);
    const time = names.indexOf("time");
    const deltas = rows.slice(1).map((r, i) => r[time] - rows[i][time]);
    const sorted = [...deltas].sort((a,b) => a-b);
    const fields = Object.fromEntries(names.map((name, index) => {
        const values = rows.map(r => r[index]).filter(Number.isFinite);
        return [name, { min: Math.min(...values), max: Math.max(...values), mean: values.reduce((a,b)=>a+b,0)/values.length }];
    }));
    const result = { config: parser.sysConfig, names, frames: rows.length, invalid,
        duration: rows.length ? rows.at(-1)[time]-rows[0][time] : 0,
        dt: { min: sorted[0], median: sorted[Math.floor(sorted.length/2)], p99: sorted[Math.floor(sorted.length*.99)], max: sorted.at(-1), over2ms: deltas.filter(d=>d>2000).length }, fields };
    fs.writeFileSync(process.env.XSFC_ANALYZE_OUT, JSON.stringify(result, null, 2));
    fs.writeFileSync(process.env.XSFC_ANALYZE_OUT + ".csv", [names.join(","), ...rows.map(r=>r.join(","))].join("\n"));
    fs.writeFileSync(process.env.XSFC_ANALYZE_OUT + ".types.json", JSON.stringify(frameTypes));
    console.log(JSON.stringify({frames:rows.length, invalid, dt:result.dt, duration:result.duration}));
});
