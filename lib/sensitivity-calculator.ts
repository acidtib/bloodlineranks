// Hunt: Showdown Sensitivity Calculator
// Updated for 2.1 Harvest of Ghosts
// Source: https://www.reddit.com/r/HuntShowdown/comments/1gsft5d/fov_sensitivity_calculator_updated_for_21_harvest/
// Spreadsheet: https://docs.google.com/spreadsheets/d/1gXnG2iXM9g1BNi24pvY9lm5It0TFWQiwwtZ9TAOBa_w/
//
// Key change in 2.1: Scopes now use FIXED FOV values instead of multipliers.
// This means scope FOV is the same regardless of your configured FOV setting.
// Only Hipfire and Iron Sights still scale with your base FOV.

export interface Resolution {
  horizontal: number;
  vertical: number;
}

export interface UserInput {
  resolution: Resolution;
  fov: number;
  standard_look_sensitivity: number;
  monitor_distance_coefficient: number;
  hipfire_fov: "normal" | "zoom";
}

export interface FovValue {
  horizontal: number;
  vertical: number;
  zoomFactor: number;
}

export interface CalculatedFovs {
  standard_look: FovValue;
  hipfire: FovValue;
  ironsights: FovValue;
  deadeye: FovValue;
  marksman: FovValue;
  sniper: FovValue;
  aperture: FovValue;
}

export interface SensitivityValue {
  factor: number;
  value: number;
}

export interface CalculatedSensitivities {
  standard: SensitivityValue;
  hipfire: SensitivityValue;
  ironsights: SensitivityValue;
  deadeye: SensitivityValue;
  marksman: SensitivityValue;
  sniper: SensitivityValue;
  aperture: SensitivityValue;
}

// Hidden sensitivity factors (empirical values from 2.1 Harvest)
// These are applied by the game to each view mode
const SENSITIVITY_FACTORS = {
  standard: 1.0,
  hipfire: 1.111111,
  ironsights: 1.851851,
  deadeye: 2.020202,
  marksman: 5.555556,
  sniper: 3.703704,
  aperture: 5.555556,
} as const;

// VFOV multipliers for view modes that still scale with base FOV
const VFOV_MULTIPLIERS = {
  standard: 1.0,
  hipfire_normal: 1.0,
  hipfire_zoom: 1.25,
  ironsights: 2.08,
} as const;

// FIXED VFOV values for scopes (new in 2.1 Harvest)
// Scopes now use fixed FOV regardless of your configured FOV setting
const FIXED_SCOPE_VFOV = {
  deadeye: 19.69,
  marksman: 7.45,
  sniper: 4.97,
  aperture: 6.62,
} as const;

// Default values for the calculator
export const DEFAULT_VALUES: UserInput = {
  resolution: {
    horizontal: 1920,
    vertical: 1080,
  },
  fov: 85,
  standard_look_sensitivity: 1.0,
  monitor_distance_coefficient: 0,
  hipfire_fov: "normal",
};

// Calculate horizontal FOV from vertical FOV and aspect ratio
function calculateHorizontal(vfov: number, aspectRatio: number): number {
  return (
    (Math.atan(Math.tan((vfov * Math.PI) / 360) * aspectRatio) / Math.PI) * 360
  );
}

// Calculate base VFOV from HFOV (normalized to 16:9)
function calculateBaseVfov(hfov: number): number {
  return (
    (Math.atan(Math.tan((hfov * Math.PI) / 360) / (16 / 9)) / Math.PI) * 360
  );
}

// Calculate FOVs for all view modes
export function calculateFovs(userInput: UserInput): CalculatedFovs {
  const aspectRatio =
    userInput.resolution.horizontal / userInput.resolution.vertical;

  // Calculate base VFOV from user's HFOV setting
  const baseVfov = calculateBaseVfov(userInput.fov);
  const baseHfov = calculateHorizontal(baseVfov, aspectRatio);

  // Hipfire multiplier based on setting
  const hipfireMultiplier =
    userInput.hipfire_fov === "zoom"
      ? VFOV_MULTIPLIERS.hipfire_zoom
      : VFOV_MULTIPLIERS.hipfire_normal;

  // Calculate FOVs for modes that scale with base FOV
  const hipfireVfov = baseVfov / hipfireMultiplier;
  const ironsightsVfov = baseVfov / VFOV_MULTIPLIERS.ironsights;

  return {
    standard_look: {
      horizontal: baseHfov,
      vertical: baseVfov,
      zoomFactor: VFOV_MULTIPLIERS.standard,
    },
    hipfire: {
      horizontal: calculateHorizontal(hipfireVfov, aspectRatio),
      vertical: hipfireVfov,
      zoomFactor: hipfireMultiplier,
    },
    ironsights: {
      horizontal: calculateHorizontal(ironsightsVfov, aspectRatio),
      vertical: ironsightsVfov,
      zoomFactor: VFOV_MULTIPLIERS.ironsights,
    },
    // Scopes use FIXED FOV values (new in 2.1)
    deadeye: {
      horizontal: calculateHorizontal(FIXED_SCOPE_VFOV.deadeye, aspectRatio),
      vertical: FIXED_SCOPE_VFOV.deadeye,
      zoomFactor: baseVfov / FIXED_SCOPE_VFOV.deadeye,
    },
    marksman: {
      horizontal: calculateHorizontal(FIXED_SCOPE_VFOV.marksman, aspectRatio),
      vertical: FIXED_SCOPE_VFOV.marksman,
      zoomFactor: baseVfov / FIXED_SCOPE_VFOV.marksman,
    },
    sniper: {
      horizontal: calculateHorizontal(FIXED_SCOPE_VFOV.sniper, aspectRatio),
      vertical: FIXED_SCOPE_VFOV.sniper,
      zoomFactor: baseVfov / FIXED_SCOPE_VFOV.sniper,
    },
    aperture: {
      horizontal: calculateHorizontal(FIXED_SCOPE_VFOV.aperture, aspectRatio),
      vertical: FIXED_SCOPE_VFOV.aperture,
      zoomFactor: baseVfov / FIXED_SCOPE_VFOV.aperture,
    },
  };
}

// Calculate sensitivity value for a specific scope
function calculateSensitivityValue(
  scopeFactor: number,
  scopeFov: number,
  standardFov: number,
  monitorDistanceCoefficient: number,
  standardLookSensitivity: number
): number {
  if (monitorDistanceCoefficient === 0) {
    // Center of screen reference (0% monitor distance - recommended)
    return (
      standardLookSensitivity *
      scopeFactor *
      (Math.tan((scopeFov * Math.PI) / 360) /
        Math.tan((standardFov * Math.PI) / 360))
    );
  } else {
    // Edge of screen reference (or intermediate values)
    // Higher values make high-power scopes relatively faster
    return (
      standardLookSensitivity *
      scopeFactor *
      (Math.atan(
        monitorDistanceCoefficient * Math.tan((scopeFov * Math.PI) / 360)
      ) /
        Math.atan(
          monitorDistanceCoefficient * Math.tan((standardFov * Math.PI) / 360)
        ))
    );
  }
}

// Calculate sensitivities for all view modes
export function calculateSensitivities(
  userInput: UserInput,
  fovs: CalculatedFovs
): CalculatedSensitivities {
  const { monitor_distance_coefficient, standard_look_sensitivity } = userInput;
  const standardFov = fovs.standard_look.horizontal;

  const fovMapping: Record<keyof typeof SENSITIVITY_FACTORS, number> = {
    standard: standardFov,
    hipfire: fovs.hipfire.horizontal,
    ironsights: fovs.ironsights.horizontal,
    deadeye: fovs.deadeye.horizontal,
    marksman: fovs.marksman.horizontal,
    sniper: fovs.sniper.horizontal,
    aperture: fovs.aperture.horizontal,
  };

  function buildSensitivityValue(scope: keyof typeof SENSITIVITY_FACTORS): SensitivityValue {
    const factor = SENSITIVITY_FACTORS[scope];
    if (scope === "standard") {
      return { factor, value: standard_look_sensitivity };
    }
    return {
      factor,
      value: calculateSensitivityValue(
        factor,
        fovMapping[scope],
        standardFov,
        monitor_distance_coefficient,
        standard_look_sensitivity
      ),
    };
  }

  return {
    standard: buildSensitivityValue("standard"),
    hipfire: buildSensitivityValue("hipfire"),
    ironsights: buildSensitivityValue("ironsights"),
    deadeye: buildSensitivityValue("deadeye"),
    marksman: buildSensitivityValue("marksman"),
    sniper: buildSensitivityValue("sniper"),
    aperture: buildSensitivityValue("aperture"),
  };
}

// Main calculation function
export function calculate(userInput: UserInput): CalculatedSensitivities {
  const fovs = calculateFovs(userInput);
  return calculateSensitivities(userInput, fovs);
}

// Scope type metadata for UI display
export const SCOPE_METADATA = {
  standard: {
    label: "Default",
    configKey: "MouseSensitivity",
  },
  hipfire: {
    label: "Shoulder Aim",
    configKey: "HipMouseSensitivity",
  },
  ironsights: {
    label: "Aim Down Sights",
    configKey: "IronSightsMouseSensitivity",
  },
  deadeye: {
    label: "Deadeye Scope",
    configKey: "ShortScopeMouseSensitivity",
  },
  marksman: {
    label: "Marksman Scope",
    configKey: "MediumScopeMouseSensitivity",
  },
  sniper: {
    label: "Sniper Scope",
    configKey: "LongScopeMouseSensitivity",
  },
  aperture: {
    label: "Aperture",
    configKey: "PeepholeMouseSensitivity",
  },
} as const;

export type ScopeType = keyof typeof SCOPE_METADATA;

// Ordered list of scope types for consistent UI rendering
export const SCOPE_ORDER: ScopeType[] = [
  "standard",
  "hipfire",
  "ironsights",
  "deadeye",
  "marksman",
  "sniper",
  "aperture",
];
