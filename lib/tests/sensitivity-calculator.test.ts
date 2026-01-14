import { describe, expect, it } from "vitest";
import {
  calculate,
  calculateFovs,
  DEFAULT_VALUES,
  SCOPE_ORDER,
} from "../sensitivity-calculator";

// Default settings: 1920x1080, FOV 85, sens 1.0, MDC 0
// Lowered State FOV = Default, Shoulder Aim FOV = Zoom
const EXPECTED_SENSITIVITIES = {
  standard: 1.0,
  hipfire: 0.8628430816,
  ironsights: 0.8353230545,
  deadeye: 0.6801038437,
  marksman: 0.701357152,
  sniper: 0.3117142898,
  aperture: 0.6234285795,
};

const EXPECTED_FOVS = {
  baseVfov: 54.53644225,
  standard_look: { hfov: 85, vfov: 54.53644225 },
  hipfire: { hfov: 70.87017475, vfov: 43.6291538 },
  ironsights: { hfov: 44.91392073, vfov: 26.17749228 },
  deadeye: { hfov: 34.28833321, vfov: 19.68815522 },
  marksman: { hfov: 13.19746921, vfov: 7.446076137 },
  sniper: { hfov: 8.819962341, vfov: 4.967934376 },
  aperture: { hfov: 11.74195872, vfov: 6.620688824 },
};

describe("Sensitivity Calculator", () => {
  describe("Default Settings", () => {
    it("calculates correct sensitivity values for all scopes", () => {
      const results = calculate(DEFAULT_VALUES);

      for (const scope of SCOPE_ORDER) {
        expect(results[scope].value).toBeCloseTo(
          EXPECTED_SENSITIVITIES[scope],
          5,
        );
      }
    });

    it("returns correct hidden factors for all scopes", () => {
      const results = calculate(DEFAULT_VALUES);

      expect(results.standard.factor).toBe(1.0);
      expect(results.hipfire.factor).toBeCloseTo(1.111111, 5);
      expect(results.ironsights.factor).toBeCloseTo(1.851851, 5);
      expect(results.deadeye.factor).toBeCloseTo(2.020202, 5);
      expect(results.marksman.factor).toBeCloseTo(5.555556, 5);
      expect(results.sniper.factor).toBeCloseTo(3.703704, 5);
      expect(results.aperture.factor).toBeCloseTo(5.555556, 5);
    });
  });

  describe("FOV Calculations", () => {
    it("calculates correct base VFOV", () => {
      const fovs = calculateFovs(DEFAULT_VALUES);
      expect(fovs.baseVfov).toBeCloseTo(EXPECTED_FOVS.baseVfov, 4);
    });

    it("calculates correct HFOV and VFOV for all view modes", () => {
      const fovs = calculateFovs(DEFAULT_VALUES);

      // Standard look
      expect(fovs.standard_look.horizontal).toBeCloseTo(
        EXPECTED_FOVS.standard_look.hfov,
        4,
      );
      expect(fovs.standard_look.vertical).toBeCloseTo(
        EXPECTED_FOVS.standard_look.vfov,
        4,
      );

      // Hipfire
      expect(fovs.hipfire.horizontal).toBeCloseTo(
        EXPECTED_FOVS.hipfire.hfov,
        4,
      );
      expect(fovs.hipfire.vertical).toBeCloseTo(EXPECTED_FOVS.hipfire.vfov, 4);

      // Iron sights
      expect(fovs.ironsights.horizontal).toBeCloseTo(
        EXPECTED_FOVS.ironsights.hfov,
        4,
      );
      expect(fovs.ironsights.vertical).toBeCloseTo(
        EXPECTED_FOVS.ironsights.vfov,
        4,
      );

      // Deadeye
      expect(fovs.deadeye.horizontal).toBeCloseTo(
        EXPECTED_FOVS.deadeye.hfov,
        4,
      );
      expect(fovs.deadeye.vertical).toBeCloseTo(EXPECTED_FOVS.deadeye.vfov, 4);

      // Marksman
      expect(fovs.marksman.horizontal).toBeCloseTo(
        EXPECTED_FOVS.marksman.hfov,
        4,
      );
      expect(fovs.marksman.vertical).toBeCloseTo(
        EXPECTED_FOVS.marksman.vfov,
        4,
      );

      // Sniper
      expect(fovs.sniper.horizontal).toBeCloseTo(EXPECTED_FOVS.sniper.hfov, 4);
      expect(fovs.sniper.vertical).toBeCloseTo(EXPECTED_FOVS.sniper.vfov, 4);

      // Aperture
      expect(fovs.aperture.horizontal).toBeCloseTo(
        EXPECTED_FOVS.aperture.hfov,
        4,
      );
      expect(fovs.aperture.vertical).toBeCloseTo(
        EXPECTED_FOVS.aperture.vfov,
        4,
      );
    });

    it("calculates correct zoom factors", () => {
      const fovs = calculateFovs(DEFAULT_VALUES);

      expect(fovs.standard_look.zoomFactor).toBeCloseTo(1.0, 4);
      expect(fovs.hipfire.zoomFactor).toBeCloseTo(1.25, 4);
      expect(fovs.ironsights.zoomFactor).toBeCloseTo(2.083333, 4);
    });
  });

  describe("Lowered State FOV Setting", () => {
    it("does not affect sensitivity values when changed", () => {
      const defaultResults = calculate(DEFAULT_VALUES);
      const zoomResults = calculate({
        ...DEFAULT_VALUES,
        lowered_state_fov: "zoom",
      });

      // All sensitivities should remain the same
      for (const scope of SCOPE_ORDER) {
        expect(zoomResults[scope].value).toBeCloseTo(
          defaultResults[scope].value,
          5,
        );
      }
    });

    it("only affects standard_look FOV values", () => {
      const defaultFovs = calculateFovs(DEFAULT_VALUES);
      const zoomFovs = calculateFovs({
        ...DEFAULT_VALUES,
        lowered_state_fov: "zoom",
      });

      // Standard look FOV should be different (zoomed in)
      expect(zoomFovs.standard_look.vertical).toBeLessThan(
        defaultFovs.standard_look.vertical,
      );
      expect(zoomFovs.standard_look.zoomFactor).toBeCloseTo(1.25, 4);

      // All other FOVs should remain the same
      expect(zoomFovs.hipfire.vertical).toBeCloseTo(
        defaultFovs.hipfire.vertical,
        4,
      );
      expect(zoomFovs.ironsights.vertical).toBeCloseTo(
        defaultFovs.ironsights.vertical,
        4,
      );
    });
  });

  describe("Shoulder Aim (Hipfire) FOV Setting", () => {
    it("changes hipfire sensitivity when set to default", () => {
      const zoomResults = calculate(DEFAULT_VALUES); // hipfire_fov = "zoom"
      const defaultResults = calculate({
        ...DEFAULT_VALUES,
        hipfire_fov: "default",
      });

      // Hipfire sensitivity should be higher with default (no zoom)
      expect(defaultResults.hipfire.value).toBeGreaterThan(
        zoomResults.hipfire.value,
      );
      // Should equal the hidden factor when FOV multiplier is 1.0
      expect(defaultResults.hipfire.value).toBeCloseTo(1.111111, 5);
    });

    it("does not affect other scope sensitivities", () => {
      const zoomResults = calculate(DEFAULT_VALUES);
      const defaultResults = calculate({
        ...DEFAULT_VALUES,
        hipfire_fov: "default",
      });

      // All scopes except hipfire should remain the same
      expect(defaultResults.standard.value).toBeCloseTo(
        zoomResults.standard.value,
        5,
      );
      expect(defaultResults.ironsights.value).toBeCloseTo(
        zoomResults.ironsights.value,
        5,
      );
      expect(defaultResults.deadeye.value).toBeCloseTo(
        zoomResults.deadeye.value,
        5,
      );
      expect(defaultResults.marksman.value).toBeCloseTo(
        zoomResults.marksman.value,
        5,
      );
      expect(defaultResults.sniper.value).toBeCloseTo(
        zoomResults.sniper.value,
        5,
      );
      expect(defaultResults.aperture.value).toBeCloseTo(
        zoomResults.aperture.value,
        5,
      );
    });
  });

  describe("Custom Input Values", () => {
    it("scales sensitivity with base sensitivity input", () => {
      const sens1 = calculate({
        ...DEFAULT_VALUES,
        standard_look_sensitivity: 1,
      });
      const sens2 = calculate({
        ...DEFAULT_VALUES,
        standard_look_sensitivity: 2,
      });

      // All values should scale linearly
      for (const scope of SCOPE_ORDER) {
        expect(sens2[scope].value).toBeCloseTo(sens1[scope].value * 2, 5);
      }
    });

    it("handles different resolutions correctly", () => {
      const res16_9 = calculate({
        ...DEFAULT_VALUES,
        resolution: { horizontal: 1920, vertical: 1080 },
      });
      const res21_9 = calculate({
        ...DEFAULT_VALUES,
        resolution: { horizontal: 2560, vertical: 1080 },
      });

      // Different aspect ratios should produce different HFOV but same VFOV
      const fovs16_9 = calculateFovs({
        ...DEFAULT_VALUES,
        resolution: { horizontal: 1920, vertical: 1080 },
      });
      const fovs21_9 = calculateFovs({
        ...DEFAULT_VALUES,
        resolution: { horizontal: 2560, vertical: 1080 },
      });

      // VFOV should be the same (base VFOV is calculated from 16:9)
      expect(fovs16_9.baseVfov).toBeCloseTo(fovs21_9.baseVfov, 4);

      // HFOV should be different for scopes
      expect(fovs21_9.hipfire.horizontal).toBeGreaterThan(
        fovs16_9.hipfire.horizontal,
      );
    });

    it("handles FOV range boundaries", () => {
      const fov85 = calculate({ ...DEFAULT_VALUES, fov: 85 });
      const fov110 = calculate({ ...DEFAULT_VALUES, fov: 110 });

      // Higher FOV should result in different sensitivity values
      expect(fov110.hipfire.value).not.toBeCloseTo(fov85.hipfire.value, 2);
    });
  });

  describe("Monitor Distance Coefficient", () => {
    it("produces same results at MDC 0 as tan formula", () => {
      const results = calculate({
        ...DEFAULT_VALUES,
        monitor_distance_coefficient: 0,
      });

      // Verify the values match expected (which use tan formula)
      expect(results.hipfire.value).toBeCloseTo(
        EXPECTED_SENSITIVITIES.hipfire,
        5,
      );
    });

    it("produces different results at MDC > 0", () => {
      const mdc0 = calculate({
        ...DEFAULT_VALUES,
        monitor_distance_coefficient: 0,
      });
      const mdc1 = calculate({
        ...DEFAULT_VALUES,
        monitor_distance_coefficient: 1,
      });

      // Scopes should have different values at different MDC
      expect(mdc1.deadeye.value).not.toBeCloseTo(mdc0.deadeye.value, 2);
      expect(mdc1.marksman.value).not.toBeCloseTo(mdc0.marksman.value, 2);
      expect(mdc1.sniper.value).not.toBeCloseTo(mdc0.sniper.value, 2);
    });
  });
});
