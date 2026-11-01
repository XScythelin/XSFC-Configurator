# XSFC Configurator

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
