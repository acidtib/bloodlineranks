"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import {
  Aperture,
  Check,
  Circle,
  Copy,
  Crosshair,
  Eye,
  Focus,
  Info,
  Monitor,
  MousePointer2,
  RotateCcw,
  Scan,
  SlidersHorizontal,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  calculate,
  type CalculatedSensitivities,
  DEFAULT_VALUES,
  SCOPE_METADATA,
  SCOPE_ORDER,
  type ScopeType,
  type UserInput,
} from "@/lib/sensitivity-calculator";

// Scope icons mapping for visual distinction
const SCOPE_ICONS: Record<ScopeType, ElementType> = {
  standard: MousePointer2,
  hipfire: Crosshair,
  ironsights: Target,
  deadeye: Focus,
  marksman: Scan,
  sniper: Circle,
  aperture: Aperture,
};

interface InputGroupProps {
  icon: ElementType;
  label: string;
  children: ReactNode;
  hint?: ReactNode;
  delay?: number;
}

function InputGroup({
  icon: Icon,
  label,
  children,
  hint,
  delay = 0,
}: InputGroupProps) {
  return (
    <div
      className="reveal-up space-y-3"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center border border-accent/30 bg-accent/5">
          <Icon className="h-4 w-4 text-accent" />
        </div>
        <h3 className="font-display text-sm uppercase tracking-wider text-parchment">
          {label}
        </h3>
      </div>
      {children}
      {hint && (
        <p className="pl-0 sm:pl-12 text-[13px] leading-relaxed text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  );
}

interface ResultCardProps {
  scopeType: ScopeType;
  value: number;
  onCopy: (value: string, label: string) => void;
  index: number;
}

function ResultCard({
  scopeType,
  value,
  onCopy,
  index,
}: ResultCardProps) {
  const [copied, setCopied] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevValueRef = useRef(value);
  const metadata = SCOPE_METADATA[scopeType];
  const formattedValue = value.toFixed(4);
  const Icon = SCOPE_ICONS[scopeType];

  // Animate on value change
  useEffect(() => {
    if (prevValueRef.current === value) return;

    setIsAnimating(true);
    prevValueRef.current = value;
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [value]);

  const handleCopy = () => {
    onCopy(formattedValue, metadata.label);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="reveal-up group relative overflow-hidden border border-border/50 bg-gradient-to-br from-card/80 via-card/50 to-card/30 transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_20px_rgba(204,107,26,0.1)]"
      style={{ animationDelay: `${300 + index * 50}ms` }}
    >
      {/* Decorative corner accents */}
      <div className="absolute left-0 top-0 h-3 w-3 border-l border-t border-accent/40" />
      <div className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-accent/40" />

      {/* Subtle scan line effect on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-center justify-between gap-4 p-4 sm:p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-border/50 bg-muted/30 transition-colors duration-300 group-hover:border-accent/30 group-hover:bg-accent/10">
            <Icon className="h-5 w-5 text-muted-foreground transition-colors duration-300 group-hover:text-accent" />
          </div>
          <div className="space-y-0.5">
            <h4 className="font-display text-xs uppercase tracking-wider text-parchment">
              {metadata.label}
            </h4>
            <p className="text-[13px] leading-snug text-muted-foreground">
              {metadata.description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <p
            className={`font-mono text-xl tabular-nums text-parchment transition-all duration-300 sm:text-2xl ${
              isAnimating ? "scale-105 text-accent" : ""
            }`}
          >
            {formattedValue}
          </p>
          <button
            onClick={handleCopy}
            className="rounded p-2 text-muted-foreground transition-all duration-200 hover:bg-accent/10 hover:text-accent active:scale-95"
            aria-label={`Copy ${metadata.label} value`}
          >
            {copied
              ? <Check className="h-5 w-5 text-green-500" />
              : <Copy className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Config key reference */}
      <div className="border-t border-border/30 bg-muted/20 px-4 py-2 sm:px-5">
        <code className="font-mono text-xs text-muted-foreground">
          {metadata.configKey}
        </code>
      </div>
    </div>
  );
}

interface CustomSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
}

function CustomSlider({
  value,
  onChange,
  min,
  max,
  step,
}: CustomSliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="relative h-6 w-full">
      {/* Track background */}
      <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 bg-muted/50">
        {/* Filled portion */}
        <div
          className="absolute h-full bg-gradient-to-r from-accent/80 to-accent transition-all duration-150"
          style={{ width: `${percentage}%` }}
        />
        {/* Tick marks */}
        <div className="absolute inset-0 flex justify-between px-0.5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-full w-px bg-border/50" />
          ))}
        </div>
      </div>
      {/* Native range input (invisible but functional) */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="absolute inset-0 w-full cursor-pointer opacity-0"
      />
      {/* Custom thumb */}
      <div
        className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 border-2 border-accent bg-card shadow-[0_0_8px_rgba(204,107,26,0.4)] transition-all duration-150"
        style={{ left: `${percentage}%` }}
      />
    </div>
  );
}

interface RadioOptionProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}

function RadioOption({ name, value, checked, onChange, label }: RadioOptionProps) {
  return (
    <label className="group flex cursor-pointer items-center gap-3">
      <div
        className={`flex h-6 w-6 items-center justify-center border transition-all ${
          checked
            ? "border-accent bg-accent/20"
            : "border-border bg-input/30 group-hover:border-accent/50"
        }`}
      >
        {checked && <div className="h-2.5 w-2.5 bg-accent" />}
      </div>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className="font-display text-sm uppercase tracking-wider text-parchment">
        {label}
      </span>
    </label>
  );
}

export function SensitivityCalculator() {
  const [userInput, setUserInput] = useState<UserInput>(DEFAULT_VALUES);
  const [results, setResults] = useState<CalculatedSensitivities | null>(
    null,
  );
  const [toast, setToast] = useState<string | null>(null);

  // Calculate on mount and when inputs change
  useEffect(() => {
    setResults(calculate(userInput));
  }, [userInput]);

  const handleInputChange = <K extends keyof UserInput>(
    key: K,
    value: UserInput[K],
  ) => {
    setUserInput((prev) => ({ ...prev, [key]: value }));
  };

  const handleResolutionChange = (
    dimension: "horizontal" | "vertical",
    value: number,
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
    setTimeout(() => setToast(null), 2500);
  };

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    showToast(`${label} copied`);
  };

  const hasChanges =
    JSON.stringify(userInput) !== JSON.stringify(DEFAULT_VALUES);

  return (
    <div className="space-y-8 overflow-hidden">
      {/* Toast notification */}
      <div
        className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ${
          toast
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <div className="flex items-center gap-3 border border-accent/40 bg-card/95 px-5 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(204,107,26,0.2)] backdrop-blur-sm">
          <Check className="h-5 w-5 text-accent" />
          <span className="font-display text-sm uppercase tracking-wider text-parchment">
            {toast}
          </span>
        </div>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[2fr_3fr]">
        {/* Input Section */}
        <div className="reveal-up corner-ornament space-y-6 overflow-hidden border border-border/50 bg-gradient-to-br from-card/50 via-card/30 to-transparent p-4 backdrop-blur-sm sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-7 w-1 bg-accent" />
              <h2 className="font-display text-base uppercase tracking-wider text-parchment sm:text-lg">
                Settings
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className={`gap-2 font-display text-xs uppercase tracking-wider text-muted-foreground transition-all hover:text-accent ${
                hasChanges ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </Button>
          </div>

          <div className="space-y-6">
            {/* Resolution */}
            <InputGroup
              icon={Monitor}
              label="Game Resolution"
              hint="Your in game resolution"
              delay={100}
            >
              <div className="flex items-center gap-3 pl-0 sm:pl-12">
                <input
                  type="number"
                  value={userInput.resolution.horizontal}
                  onChange={(e) =>
                    handleResolutionChange(
                      "horizontal",
                      parseInt(e.target.value) || 1920,
                    )}
                  className="h-11 w-full border border-border bg-input/50 px-3 font-mono text-base tabular-nums text-parchment transition-colors focus:border-accent focus:outline-none"
                  placeholder="1920"
                />
                <span className="font-display text-xl text-muted-foreground">
                  ×
                </span>
                <input
                  type="number"
                  value={userInput.resolution.vertical}
                  onChange={(e) =>
                    handleResolutionChange(
                      "vertical",
                      parseInt(e.target.value) || 1080,
                    )}
                  className="h-11 w-full border border-border bg-input/50 px-3 font-mono text-base tabular-nums text-parchment transition-colors focus:border-accent focus:outline-none"
                  placeholder="1080"
                />
              </div>
            </InputGroup>

            {/* FOV */}
            <InputGroup
              icon={Eye}
              label="Field of View"
              hint="The configured FOV (85°-110°) is mapped internally to a vertical FOV at 16:9. Scopes use fixed FOV values regardless of this setting."
              delay={150}
            >
              <div className="space-y-3 pl-0 sm:pl-12">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={85}
                    max={110}
                    value={userInput.fov}
                    onChange={(e) =>
                      handleInputChange(
                        "fov",
                        Math.min(
                          110,
                          Math.max(85, parseInt(e.target.value) || 85),
                        ),
                      )}
                    className="h-11 w-28 border border-border bg-input/50 px-3 font-mono text-base tabular-nums text-parchment transition-colors focus:border-accent focus:outline-none"
                  />
                  <span className="text-sm text-muted-foreground">
                    degrees
                  </span>
                </div>
                <CustomSlider
                  value={userInput.fov}
                  onChange={(v) => handleInputChange("fov", Math.round(v))}
                  min={85}
                  max={110}
                  step={1}
                />
              </div>
            </InputGroup>

            {/* Sensitivity */}
            <InputGroup
              icon={MousePointer2}
              label="Default Sensitivity"
              hint="Your base sensitivity for looking around (Default Sensitivity in game settings)"
              delay={200}
            >
              <div className="space-y-3 pl-0 sm:pl-12">
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
                        Math.max(0.1, parseFloat(e.target.value) || 1),
                      ),
                    )}
                  className="h-11 w-full border border-border bg-input/50 px-3 font-mono text-base tabular-nums text-parchment transition-colors focus:border-accent focus:outline-none"
                />
                <CustomSlider
                  value={userInput.standard_look_sensitivity}
                  onChange={(v) =>
                    handleInputChange(
                      "standard_look_sensitivity",
                      Math.round(v * 100) / 100,
                    )}
                  min={0.1}
                  max={3}
                  step={0.01}
                />
              </div>
            </InputGroup>

            {/* Monitor Distance Coefficient */}
            <InputGroup
              icon={SlidersHorizontal}
              label="Monitor Distance Coefficient"
              hint={
                <span>
                  Choose where on screen mouse movement matches across FOVs.
                  Useful for consistent flick shots.
                  <br />
                  <strong className="text-parchment">0%</strong>{" "}
                  = Center of screen (recommended for tracking)
                  <br />
                  <strong className="text-parchment">100%</strong>{" "}
                  = Edge of screen (faster high zoom scopes)
                </span>
              }
              delay={250}
            >
              <div className="space-y-3 pl-0 sm:pl-12">
                <input
                  type="number"
                  min={0}
                  max={1}
                  step={0.1}
                  value={userInput.monitor_distance_coefficient}
                  onChange={(e) =>
                    handleInputChange(
                      "monitor_distance_coefficient",
                      Math.min(1, Math.max(0, parseFloat(e.target.value) || 0)),
                    )}
                  className="h-11 w-full border border-border bg-input/50 px-3 font-mono text-base tabular-nums text-parchment transition-colors focus:border-accent focus:outline-none"
                />
                <CustomSlider
                  value={userInput.monitor_distance_coefficient}
                  onChange={(v) =>
                    handleInputChange(
                      "monitor_distance_coefficient",
                      Math.round(v * 10) / 10,
                    )}
                  min={0}
                  max={1}
                  step={0.1}
                />
              </div>
            </InputGroup>

            {/* Lowered State FOV */}
            <InputGroup
              icon={Eye}
              label="Lowered State FOV"
              hint="Affects FOV when weapon is lowered (sprinting, Hunter default). Zoom applies a 1.25x multiplier."
              delay={300}
            >
              <div className="flex gap-6 pl-0 sm:pl-12">
                <RadioOption
                  name="lowered_state_fov"
                  value="default"
                  checked={userInput.lowered_state_fov === "default"}
                  onChange={() => handleInputChange("lowered_state_fov", "default")}
                  label="Default"
                />
                <RadioOption
                  name="lowered_state_fov"
                  value="zoom"
                  checked={userInput.lowered_state_fov === "zoom"}
                  onChange={() => handleInputChange("lowered_state_fov", "zoom")}
                  label="Zoom"
                />
              </div>
            </InputGroup>

            {/* Shoulder Aim FOV */}
            <InputGroup
              icon={Crosshair}
              label="Shoulder Aim FOV"
              hint="Affects FOV when weapon is raised (Gunslinger default / Hunter shoulder aim). Zoom applies a 1.25x multiplier."
              delay={350}
            >
              <div className="flex gap-6 pl-0 sm:pl-12">
                <RadioOption
                  name="hipfire_fov"
                  value="default"
                  checked={userInput.hipfire_fov === "default"}
                  onChange={() => handleInputChange("hipfire_fov", "default")}
                  label="Default"
                />
                <RadioOption
                  name="hipfire_fov"
                  value="zoom"
                  checked={userInput.hipfire_fov === "zoom"}
                  onChange={() => handleInputChange("hipfire_fov", "zoom")}
                  label="Zoom"
                />
              </div>
            </InputGroup>
          </div>

          {/* Instructions */}
          <div
            className="reveal-up mt-8 border-t border-border/30 pt-6"
            style={{ animationDelay: "400ms" }}
          >
            <div className="mb-4 flex items-center gap-3">
              <Info className="h-4 w-4 text-accent" />
              <h3 className="font-display text-sm uppercase tracking-wider text-parchment">
                How to Use
              </h3>
            </div>

            <ol className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="font-display text-accent">1.</span>
                <span>
                  Open{" "}
                  <code className="break-all border border-border/50 bg-muted/30 px-1.5 py-0.5 font-mono text-xs text-parchment">
                    attributes.xml
                  </code>{" "}
                  in your Hunt profiles folder
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-display text-accent">2.</span>
                <span>Copy and paste the calculated values</span>
              </li>
              <li className="flex gap-3">
                <span className="font-display text-accent">3.</span>
                <span>Save and restart the game</span>
              </li>
            </ol>
          </div>
        </div>

        {/* Results Section */}
        <div className="reveal-up corner-ornament overflow-hidden border border-border/50 bg-gradient-to-br from-card/50 via-card/30 to-transparent p-4 backdrop-blur-sm sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-7 w-1 bg-primary" />
            <div>
              <h2 className="font-display text-base uppercase tracking-wider text-parchment sm:text-lg">
                Calculated Sensitivities
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Values that counteract Hunt&apos;s hidden sensitivity factors
                for consistent tracking
              </p>
            </div>
          </div>

          {results && (
            <div className="space-y-3">
              {SCOPE_ORDER.map((scope, index) => (
                <ResultCard
                  key={scope}
                  scopeType={scope}
                  value={results[scope].value}
                  onCopy={handleCopy}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Attribution */}
      <p
        className="reveal-up text-center text-sm text-muted-foreground"
        style={{ animationDelay: "500ms" }}
      >
        Thanks to{" "}
        <a
          href="https://www.reddit.com/user/No_Professional2258/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline-offset-2 transition-colors hover:text-parchment hover:underline"
        >
          No_Professional2258
        </a>{" "}
        and{" "}
        <a
          href="https://www.reddit.com/user/Skymirrh/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline-offset-2 transition-colors hover:text-parchment hover:underline"
        >
          Skymirrh
        </a>
      </p>
    </div>
  );
}
