"use client";

import * as React from "react";
import {
  Monitor,
  Eye,
  MousePointer2,
  SlidersHorizontal,
  Crosshair,
  RotateCcw,
  Copy,
  Check,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  calculate,
  DEFAULT_VALUES,
  SCOPE_METADATA,
  SCOPE_ORDER,
  type CalculatedSensitivities,
  type ScopeType,
  type UserInput,
} from "@/lib/sensitivity-calculator";

function InputGroup({
  icon: Icon,
  label,
  children,
  hint,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
  hint?: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h3 className="flex items-center gap-2 font-display text-sm uppercase tracking-widest text-parchment">
        <Icon className="h-4 w-4 text-accent" />
        {label}
      </h3>
      {children}
      {hint && (
        <p className="text-xs leading-relaxed text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}

function ResultCard({
  scopeType,
  value,
  onCopy,
}: {
  scopeType: ScopeType;
  value: number;
  onCopy: (value: string, label: string) => void;
}) {
  const [copied, setCopied] = React.useState(false);
  const metadata = SCOPE_METADATA[scopeType];
  const formattedValue = value.toFixed(4);

  const handleCopy = () => {
    onCopy(formattedValue, metadata.label);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative border border-border/50 bg-card/50 p-4 transition-all hover:border-accent/30 hover:bg-card/80">
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1">
          <h4 className="font-display text-xs uppercase tracking-widest text-muted-foreground">
            {metadata.label}
          </h4>
          <p className="font-mono text-lg text-parchment">{formattedValue}</p>
        </div>
        <button
          onClick={handleCopy}
          className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-accent/10 hover:text-accent"
          aria-label={`Copy ${metadata.label} value`}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}

export function SensitivityCalculator() {
  const [userInput, setUserInput] = React.useState<UserInput>(DEFAULT_VALUES);
  const [results, setResults] = React.useState<CalculatedSensitivities | null>(
    null
  );
  const [toast, setToast] = React.useState<string | null>(null);

  // Calculate on mount and when inputs change
  React.useEffect(() => {
    setResults(calculate(userInput));
  }, [userInput]);

  const handleInputChange = <K extends keyof UserInput>(
    key: K,
    value: UserInput[K]
  ) => {
    setUserInput((prev) => ({ ...prev, [key]: value }));
  };

  const handleResolutionChange = (
    dimension: "horizontal" | "vertical",
    value: number
  ) => {
    setUserInput((prev) => ({
      ...prev,
      resolution: { ...prev.resolution, [dimension]: value },
    }));
  };

  const handleReset = () => {
    setUserInput(DEFAULT_VALUES);
    showToast("Reset to defaults");
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    showToast(`${label} copied!`);
  };

  const hasChanges =
    JSON.stringify(userInput) !== JSON.stringify(DEFAULT_VALUES);

  return (
    <div className="space-y-8">
      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded border border-accent/30 bg-card px-4 py-2 font-display text-sm uppercase tracking-widest text-parchment shadow-lg">
          {toast}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Input Section */}
        <div className="space-y-6 border border-border/50 bg-card/30 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg uppercase tracking-widest text-parchment">
              Settings
            </h2>
            {hasChanges && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="gap-2 font-display text-xs uppercase tracking-widest text-muted-foreground hover:text-parchment"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </Button>
            )}
          </div>

          <div className="space-y-6">
            {/* Resolution */}
            <InputGroup
              icon={Monitor}
              label="Game Resolution"
              hint="Your in-game resolution"
            >
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={userInput.resolution.horizontal}
                  onChange={(e) =>
                    handleResolutionChange(
                      "horizontal",
                      parseInt(e.target.value) || 1920
                    )
                  }
                  className="h-10 w-full rounded-none border border-border bg-input px-3 font-mono text-sm text-parchment focus:border-accent focus:outline-none"
                  placeholder="1920"
                />
                <span className="text-muted-foreground">x</span>
                <input
                  type="number"
                  value={userInput.resolution.vertical}
                  onChange={(e) =>
                    handleResolutionChange(
                      "vertical",
                      parseInt(e.target.value) || 1080
                    )
                  }
                  className="h-10 w-full rounded-none border border-border bg-input px-3 font-mono text-sm text-parchment focus:border-accent focus:outline-none"
                  placeholder="1080"
                />
              </div>
            </InputGroup>

            {/* FOV */}
            <InputGroup
              icon={Eye}
              label="Field of View"
              hint="FOV range is limited between 85° and 110°"
            >
              <div className="space-y-2">
                <input
                  type="number"
                  min={85}
                  max={110}
                  value={userInput.fov}
                  onChange={(e) =>
                    handleInputChange(
                      "fov",
                      Math.min(110, Math.max(85, parseInt(e.target.value) || 85))
                    )
                  }
                  className="h-10 w-full rounded-none border border-border bg-input px-3 font-mono text-sm text-parchment focus:border-accent focus:outline-none"
                />
                <input
                  type="range"
                  min={85}
                  max={110}
                  value={userInput.fov}
                  onChange={(e) =>
                    handleInputChange("fov", parseInt(e.target.value))
                  }
                  className="w-full accent-accent"
                />
              </div>
            </InputGroup>

            {/* Sensitivity */}
            <InputGroup
              icon={MousePointer2}
              label="Default Sensitivity"
              hint="Your base sensitivity for looking around (Default Sensitivity in game settings)"
            >
              <div className="space-y-2">
                <input
                  type="number"
                  min={0.1}
                  max={3}
                  step={0.01}
                  value={userInput.standard_look_sensitivity}
                  onChange={(e) =>
                    handleInputChange(
                      "standard_look_sensitivity",
                      Math.min(
                        3,
                        Math.max(0.1, parseFloat(e.target.value) || 1)
                      )
                    )
                  }
                  className="h-10 w-full rounded-none border border-border bg-input px-3 font-mono text-sm text-parchment focus:border-accent focus:outline-none"
                />
                <input
                  type="range"
                  min={0.1}
                  max={3}
                  step={0.01}
                  value={userInput.standard_look_sensitivity}
                  onChange={(e) =>
                    handleInputChange(
                      "standard_look_sensitivity",
                      parseFloat(e.target.value)
                    )
                  }
                  className="w-full accent-accent"
                />
              </div>
            </InputGroup>

            {/* Monitor Distance Coefficient */}
            <InputGroup
              icon={SlidersHorizontal}
              label="Monitor Distance Coefficient"
              hint={
                <span>
                  Defines the reference point for sensitivity calculations:
                  <br />
                  <strong>0</strong> = Center of screen (recommended)
                  <br />
                  <strong>1</strong> = Edge of screen (faster scopes)
                </span>
              }
            >
              <div className="space-y-2">
                <input
                  type="number"
                  min={0}
                  max={1}
                  step={0.1}
                  value={userInput.monitor_distance_coefficient}
                  onChange={(e) =>
                    handleInputChange(
                      "monitor_distance_coefficient",
                      Math.min(1, Math.max(0, parseFloat(e.target.value) || 0))
                    )
                  }
                  className="h-10 w-full rounded-none border border-border bg-input px-3 font-mono text-sm text-parchment focus:border-accent focus:outline-none"
                />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={userInput.monitor_distance_coefficient}
                  onChange={(e) =>
                    handleInputChange(
                      "monitor_distance_coefficient",
                      parseFloat(e.target.value)
                    )
                  }
                  className="w-full accent-accent"
                />
              </div>
            </InputGroup>

            {/* Hipfire FOV */}
            <InputGroup
              icon={Crosshair}
              label="Hipfire FOV"
              hint="Normal = standard hipfire FOV | Zoom = slight zoom when aiming (1.25x)"
            >
              <div className="flex gap-4">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="hipfire_fov"
                    value="normal"
                    checked={userInput.hipfire_fov === "normal"}
                    onChange={() => handleInputChange("hipfire_fov", "normal")}
                    className="accent-accent"
                  />
                  <span className="font-display text-xs uppercase tracking-widest text-parchment">
                    Normal
                  </span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="hipfire_fov"
                    value="zoom"
                    checked={userInput.hipfire_fov === "zoom"}
                    onChange={() => handleInputChange("hipfire_fov", "zoom")}
                    className="accent-accent"
                  />
                  <span className="font-display text-xs uppercase tracking-widest text-parchment">
                    Zoom
                  </span>
                </label>
              </div>
            </InputGroup>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <div className="border border-border/50 bg-card/30 p-6 backdrop-blur-sm">
            <h2 className="mb-2 font-display text-lg uppercase tracking-widest text-parchment">
              Calculated Sensitivities
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              These values provide consistent sensitivity across all zoom
              levels.
            </p>

            {results && (
              <div className="grid gap-3 sm:grid-cols-2">
                {SCOPE_ORDER.map((scope) => (
                  <ResultCard
                    key={scope}
                    scopeType={scope}
                    value={results[scope].value}
                    onCopy={handleCopy}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="border border-border/50 bg-card/30 p-6 backdrop-blur-sm">
            <h2 className="mb-4 flex items-center gap-2 font-display text-lg uppercase tracking-widest text-parchment">
              <Info className="h-4 w-4 text-accent" />
              How to Use
            </h2>

            <ol className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="font-display text-accent">1.</span>
                <span>
                  Navigate to:{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-parchment">
                    /Hunt Showdown 1896/USER/Profiles/default/attributes.xml
                  </code>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-display text-accent">2.</span>
                <span>Find and update the following values in the file:</span>
              </li>
            </ol>

            <ul className="mt-3 space-y-1 border-l-2 border-border pl-6 text-xs">
              {SCOPE_ORDER.map((scope) => (
                <li key={scope} className="text-muted-foreground">
                  <code className="font-mono text-parchment">
                    {SCOPE_METADATA[scope].configKey}
                  </code>{" "}
                  = {SCOPE_METADATA[scope].label}
                </li>
              ))}
            </ul>

            <ol start={3} className="mt-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="font-display text-accent">3.</span>
                <span>Save the file and restart the game</span>
              </li>
            </ol>

            <div className="mt-4 flex items-start gap-2 rounded border border-accent/20 bg-accent/5 p-3">
              <Copy className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <p className="text-xs text-muted-foreground">
                <strong className="text-parchment">Tip:</strong> Click the copy
                icon next to each value to copy it to your clipboard!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Attribution */}
      <p className="text-center text-xs text-muted-foreground">
        Thanks to{" "}
        <a
          href="https://www.reddit.com/user/No_Professional2258/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline-offset-2 hover:underline"
        >
          No_Professional2258
        </a>{" "}
        and{" "}
        <a
          href="https://www.reddit.com/user/Skymirrh/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline-offset-2 hover:underline"
        >
          Skymirrh
        </a>
      </p>
    </div>
  );
}
