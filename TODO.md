# XSFC Configurator

- [x] XSFC PID save now reboots (firmware applies private controller/filter
  state at restart); Angle row maps to7 not ALT row3, unsupported Horizon
  fields hidden; plain D correctly labelled and D-max cells disabled.
- [x] Blackbox1.43 six-byte responses no longer read missing sample-rate byte;
  legacy ratio converted, explicit XSFC sample byte supported. Two round-trip
  tests added;13 CPU/MSP tests passed. Hardware record/download still pending.
- [ ] Hardware save/reboot/readback for PID,Angle,rates and Blackbox;
  regression cause not established without pre-reset dump.

- [x] multicore_tests branch: relabel XSFC CPU section percentages as Work time
  and explain peripheral waits in tooltip; do not claim RTOS utilization.
  11 CPU/MSP tests and production build passed. Analysis-only cpustats was
  subsequently removed from firmware; tooltip no longer suggests that command.

- [ ] Current follow-up: user measured ~70 mV at GPIO21/GND with UI ~0.9 A;
  scale100 predicts 0.7 A. Approximate unsynchronized measurements do not
  establish ADC error or actual amps. No current reference; calibration pending.
- [x] Production UI build passed after hiding unsupported DShot Beacon block.

- [x] Hide unsupported DShot Beacon block for XSFC (including BAT_LOW/RX_LOST).
  Firmware returns zero off-mask and ignores beacon setters; this falsely looked
  enabled. Ordinary buzzer events are separately implemented and retained.
- [ ] Current diagnostic at rest: ADC source1/pin21/scale100/offset0, raw=0,
  estimated mV=0, filtered/unfiltered A=0. Need CUR voltage/reference under
  safe conditions; this does not establish ADC accuracy or loaded current.

- [x] Request browser translation opt-out via HTML translate=no/notranslate metadata.
- [x] Recognize Espressif VID 0x303a and ESP/XSFC names for port selection;
  preserve available user selection on refresh and synchronize connected picker.
  56 device-handler/serial-backend tests passed; UI build passed.
- [ ] Confirm browser stops translation prompts and ESP auto-selection on hardware.
  User confirms ADC source, scale100/offset0, GPIO21; request ibatinfo from
  flashed 14:08:39 firmware. Motor heating alone does not establish reference amps.

- [x] Disable Betaflight autocomplete cache builder for XSFC, including direct
  builder calls and saved enabled preferences; no sentinel traffic or retry wait.
- [x] Replace stale README with XSFC repository/build/8081 instructions and
  actual CLI/current limitations; remove obsolete HEX/gyro-tool landing claims.
- [x] CLI/current regression run: 42 tests across 8 suites passed; UI build passed.
  Three MSP current message decoders agree on 0.34, 4.2 and 32.5 A test payloads.
- [ ] Hardware reports peak current only 0.34 A. Accuracy remains unresolved;
  need saved source/pin/scale/offset, ADC data and independent reference current.

- [x] Standalone source repository initialized for
  https://github.com/XScythelin/XSFC-Configurator (main).
  Runtime, generated builds, dependencies and local browser profiles excluded.
- [ ] Audit inherited upstream GitHub workflows before enabling deployment,
  release automation or scheduled maintenance for this fork.

- [x] User follow-up: stable after restart; escinfo shows all drivers initialized
  and bidirectional telemetry enabled. Zero ADC current explained by saved
  ibat_source NONE; no auto-enabling or guessed scale.
- [x] Save/reboot: replace lossy EEPROM callback with error-aware promise;
  drive XSFC serial reconnect even when USB port remains enumerated.
- [x] Remove virtual-connection entries and disable virtual-mode selection setting.
- [x] Latest automated checks: 79 tests in 8 save/reboot/MSP suites plus
  2 current-calibration UI tests passed; production UI and P4 builds passed.
- [ ] Hardware verification of Save & Reboot on Motors remains pending;
  test coverage is not proof that USB reconnect now works on this board.

## Latest requested adjustments

- [ ] Investigate reported ESC CUR/GPIO21 current (~0.8 A at max output).
  Hardware: Skystars KO55II 55Ax4 25V 3-6S with Bluejay.
  XSFC uses multiplicative ibat_scale, unlike Betaflight inverse calibration;
  adjusted calibration branch, but ESC sensitivity/reference current and
  P4 ADC calibration remain unverified. Do not claim current is corrected.

- [x] Display physical CPU0/CPU1 measured work time in Setup/status bar when
  versioned XSFC status tail exists; old firmware falls back to aggregate.
- [x] Restore functional DYNAMIC_FILTER bit 29 in original Configuration form.
- [x] Remove metered-network switch; retain metered restriction enabled.
- [x] Expert mode retained: changes advanced-tab/diagnostic visibility.
- [x] Servo and SmartAudio VTX tabs retained: runtime implementations exist.
  Their full Betaflight field sets are not yet verified (servo forwarding/rate
  and VTX pit/frequency/table controls include unsupported fields).
- [x] STM32 bootloader action remains hidden for XSFC.
- [ ] Hardware check after flashing new P4 firmware: CPU tail, GPIO mode
  removal with saved assignments, ADC current calibration, dynamic-filter toggle.

- [x] Separate copy; original Betaflight directory preserved.
- [x] Bundled Node.js 24 in `.runtime/node`; launcher uses port 8081.
- [x] XSFC logo and muted red palette; original tab layouts retained.
- [x] Removed custom landing tools and replacement introductory cards/text.
- [x] Restored original setup, sensors, ports, configuration, power, failsafe,
  PID, receiver, modes, servos, GPS, motors, VTX, logging and Blackbox viewer components.
- [ ] Audit retained forms and MSP codecs field by field against XSFC API 1.43.
  Restoring a component is NOT verification that its commands work.
- [ ] Adapt read/write layouts without replacing the original interface with reduced forms.
- [ ] Verify unsupported controls individually; do not remove supported tabs wholesale.
- [ ] Verify connection and read/edit/save/reboot/read-back on hardware.
- [ ] Remove remaining upstream branding from active UI, preserving copyright notices.
- [x] Update portable-launch documentation for XSFC and port 8081.

## Compatibility progress (not hardware validation)

- [x] RX API 1.43: preserve interpolation/smoothing bytes on read/write.
- [x] Filter API 1.43: preserve coefficients, map XSFC dynamic-notch count,
  omit fields introduced after 1.43.
- [x] Advanced PID API 1.43: omit newer tails; regression test preserves
  F gains, setpoint weight, angle limit, I-term relax and motor output limit.
- [x] Raw gyro: XSFC values are degrees/second, not Betaflight scaled units.
- [x] Power: retain ADC calibration/warning threshold, hide ignored cell
  limits/capacity and unsupported meter sources; expose tab for XSFC 1.43.
- [x] Motors: skip unsupported 3D read/write, hide 3D and ESC_SENSOR controls,
  disable sanitized PROSHOT option and hide unimplemented dynamic idle RPM.
  Bidirectional DShot and telemetry validation remain available.
- [x] Setup: hide unsupported STM32 bootloader action for XSFC.
- [x] Local build polling reads static index.html instead of missing endpoint.
- [x] Automated check: 3 test files / 29 tests passed; production build passed.
- [ ] Browser runtime/visual review: attempted browser tab became unavailable;
  HTTP 200 alone is not runtime or visual validation.
- [ ] Audit remaining motors fields/save chain, ports, PID/filter UI controls,
  and unsupported-command failure handling. Existing MSP promises can resolve
  unsupported responses: successful completion alone is not a verified save.
