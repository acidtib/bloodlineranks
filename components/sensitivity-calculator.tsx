"use client";

import {
  type ElementType,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Aperture,
  Check,
  ChevronDown,
  Circle,
  ClipboardCopy,
  Copy,
  Crosshair,
  Eye,
  FileText,
  Focus,
  Info,
  Monitor,
  MousePointer2,
  RotateCcw,
  Scan,
  Settings2,
  SlidersHorizontal,
  Target,
  Zap,
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
        <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-border/50 bg-muted/20">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <h4 className="font-display text-sm uppercase tracking-wide text-parchment">
          {label}
        </h4>
      </div>
      <div className="pl-0 sm:pl-12">{children}</div>
      {hint && (
        <p className="pl-0 text-sm leading-relaxed text-muted-foreground sm:pl-12">
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

function ResultCard({ scopeType, value, onCopy, index }: ResultCardProps) {
  const [copied, setCopied] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevValueRef = useRef(value);
  const metadata = SCOPE_METADATA[scopeType];
  const formattedValue = value.toFixed(6);
  const Icon = SCOPE_ICONS[scopeType];

  // Animate on value change
  useEffect(() => {
    if (prevValueRef.current === value) return;

    setIsAnimating(true);
    prevValueRef.current = value;
    const timer = setTimeout(() => setIsAnimating(false), 400);
    return () => clearTimeout(timer);
  }, [value]);

  const handleCopy = () => {
    onCopy(formattedValue, metadata.label);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="reveal-up group relative transition-colors duration-200 hover:bg-muted/10"
      style={{ animationDelay: `${200 + index * 40}ms` }}
    >
      <div className="flex items-center gap-4 px-4 py-4 sm:px-5">
        {/* Icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-muted/20 transition-all duration-300 group-hover:bg-accent/10">
          <Icon className="h-5 w-5 text-muted-foreground transition-colors duration-300 group-hover:text-accent" />
        </div>

        {/* Label & Description */}
        <div className="min-w-0 flex-1">
          <h4 className="font-display text-sm uppercase tracking-wide text-parchment">
            {metadata.label}
          </h4>
          <p className="truncate text-sm text-muted-foreground">
            {metadata.description}
          </p>
        </div>

        {/* Value */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p
              className={`font-mono text-xl tabular-nums leading-none transition-all duration-300 sm:text-2xl ${
                isAnimating ? "scale-105 text-accent" : "text-parchment"
              }`}
            >
              {formattedValue}
            </p>
            <code className="font-mono text-xs text-muted-foreground">
              {metadata.configKey}
            </code>
          </div>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="flex h-9 w-9 items-center justify-center text-muted-foreground transition-all duration-200 hover:bg-accent/10 hover:text-accent active:scale-95"
            aria-label={`Copy ${metadata.label} value`}
          >
            {copied
              ? <Check className="h-4 w-4 text-green-500" />
              : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

interface CopyAllButtonProps {
  results: CalculatedSensitivities;
  onCopy: () => void;
}

function CopyAllButton({ results, onCopy }: CopyAllButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = SCOPE_ORDER.map(
      (scope) =>
        `<Attr name="${SCOPE_METADATA[scope].configKey}" value="${
          results[scope].value.toFixed(6)
        }" />`,
    ).join("\n");

    navigator.clipboard.writeText(text);
    setCopied(true);
    onCopy();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 border border-accent/40 bg-accent/10 px-3 py-1.5 font-display text-xs uppercase tracking-wider text-accent transition-all duration-200 hover:bg-accent/20 active:scale-95"
    >
      {copied
        ? (
          <>
            <Check className="h-3.5 w-3.5" />
            Copied
          </>
        )
        : (
          <>
            <ClipboardCopy className="h-3.5 w-3.5" />
            Copy All
          </>
        )}
    </button>
  );
}

interface CustomSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  formatValue?: (value: number) => string;
}

function CustomSlider({
  value,
  onChange,
  min,
  max,
  step,
  formatValue,
}: CustomSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="group relative h-8 w-full">
      {/* Track background */}
      <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 overflow-hidden bg-muted/30">
        {/* Filled portion with glow */}
        <div
          className="absolute h-full bg-gradient-to-r from-accent/60 to-accent transition-all duration-100"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Native range input (invisible but functional) */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        className="absolute inset-0 w-full cursor-pointer opacity-0"
      />

      {/* Custom thumb with glow */}
      <div
        className={`pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 border border-accent bg-card transition-all duration-100 ${
          isDragging
            ? "scale-125 shadow-[0_0_12px_rgba(204,107,26,0.6)]"
            : "shadow-[0_0_6px_rgba(204,107,26,0.3)] group-hover:shadow-[0_0_10px_rgba(204,107,26,0.5)]"
        }`}
        style={{ left: `${percentage}%` }}
      />

      {/* Value tooltip on drag */}
      {isDragging && formatValue && (
        <div
          className="pointer-events-none absolute -top-7 -translate-x-1/2 border border-accent/40 bg-card px-2 py-0.5 font-mono text-xs text-accent shadow-lg"
          style={{ left: `${percentage}%` }}
        >
          {formatValue(value)}
        </div>
      )}
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

function RadioOption({
  name,
  value,
  checked,
  onChange,
  label,
}: RadioOptionProps) {
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

      <div className="grid items-start gap-6 lg:grid-cols-[2fr_3fr] lg:gap-8">
        {/* Input Section */}
        <div className="reveal-up space-y-0 overflow-hidden border border-border/40 bg-card/30 backdrop-blur-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/30 bg-muted/20 px-4 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <Settings2 className="h-5 w-5 text-accent" />
              <h2 className="font-display text-base uppercase tracking-wider text-parchment">
                Settings
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className={`gap-2 font-display text-xs uppercase tracking-wider text-muted-foreground transition-all hover:bg-accent/10 hover:text-accent ${
                hasChanges ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </Button>
          </div>

          <div className="space-y-6 p-4 sm:p-6">
            {/* Resolution */}
            <InputGroup
              icon={Monitor}
              label="Game Resolution"
              hint="Your in game resolution"
              delay={100}
            >
              <div className="flex items-center gap-3">
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
              hint="Scopes use fixed FOV regardless of this setting"
              delay={150}
            >
              <div className="space-y-3">
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
                  <span className="text-sm text-muted-foreground">degrees</span>
                </div>
                <CustomSlider
                  value={userInput.fov}
                  onChange={(v) => handleInputChange("fov", Math.round(v))}
                  min={85}
                  max={110}
                  step={1}
                  formatValue={(v) => `${v}°`}
                />
              </div>
            </InputGroup>

            {/* Sensitivity */}
            <InputGroup
              icon={MousePointer2}
              label="Default Sensitivity"
              hint="Your base look sensitivity from game settings"
              delay={200}
            >
              <div className="space-y-3">
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
                  formatValue={(v) => v.toFixed(2)}
                />
              </div>
            </InputGroup>

            {/* Monitor Distance Coefficient */}
            <InputGroup
              icon={SlidersHorizontal}
              label="Monitor Distance Coefficient"
              hint={
                <span>
                  <strong className="text-parchment">0%</strong>{" "}
                  = Center match (tracking) ·{" "}
                  <strong className="text-parchment">100%</strong>{" "}
                  = Edge match (flicks)
                </span>
              }
              delay={250}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={0}
                    max={1}
                    step={0.1}
                    value={userInput.monitor_distance_coefficient}
                    onChange={(e) =>
                      handleInputChange(
                        "monitor_distance_coefficient",
                        Math.min(
                          1,
                          Math.max(0, parseFloat(e.target.value) || 0),
                        ),
                      )}
                    className="h-11 w-28 border border-border bg-input/50 px-3 font-mono text-base tabular-nums text-parchment transition-colors focus:border-accent focus:outline-none"
                  />
                  <span className="text-sm text-muted-foreground">
                    ({Math.round(userInput.monitor_distance_coefficient * 100)}
                    %)
                  </span>
                </div>
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
                  formatValue={(v) => `${Math.round(v * 100)}%`}
                />
              </div>
            </InputGroup>

            {/* Lowered State FOV */}
            <InputGroup
              icon={ChevronDown}
              label="Lowered State FOV"
              hint="Weapon lowered / sprinting. Zoom applies 1.25x multiplier."
              delay={300}
            >
              <div className="flex gap-6">
                <RadioOption
                  name="lowered_state_fov"
                  value="default"
                  checked={userInput.lowered_state_fov === "default"}
                  onChange={() =>
                    handleInputChange("lowered_state_fov", "default")}
                  label="Default"
                />
                <RadioOption
                  name="lowered_state_fov"
                  value="zoom"
                  checked={userInput.lowered_state_fov === "zoom"}
                  onChange={() =>
                    handleInputChange("lowered_state_fov", "zoom")}
                  label="Zoom"
                />
              </div>
            </InputGroup>

            {/* Shoulder Aim FOV */}
            <InputGroup
              icon={Crosshair}
              label="Shoulder Aim FOV"
              hint="Weapon raised / hipfire. Zoom applies 1.25x multiplier."
              delay={350}
            >
              <div className="flex gap-6">
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
        </div>

        {/* Results Section */}
        <div className="reveal-up space-y-0 overflow-hidden border border-border/40 bg-card/30 backdrop-blur-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/30 bg-muted/20 px-4 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <Zap className="h-5 w-5 text-primary" />
              <div>
                <h2 className="font-display text-base uppercase tracking-wider text-parchment">
                  Calculated Sensitivities
                </h2>
                <p className="text-sm text-muted-foreground">
                  Counteract hidden factors for consistent aim
                </p>
              </div>
            </div>
            {results && (
              <CopyAllButton
                results={results}
                onCopy={() => showToast("All values copied")}
              />
            )}
          </div>

          {/* Result Cards */}
          {results && (
            <div className="space-y-0 divide-y divide-border/20">
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

          {/* Export Section */}
          {results && (
            <div className="border-t border-border/30 bg-muted/10 p-4 sm:p-6">
              <div className="mb-3 flex items-center gap-3">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="font-display text-sm uppercase tracking-wider text-muted-foreground">
                  XML Export
                </span>
              </div>
              <textarea
                readOnly
                value={SCOPE_ORDER.map(
                  (scope) =>
                    `<Attr name="${SCOPE_METADATA[scope].configKey}" value="${
                      results[scope].value.toFixed(6)
                    }" />`,
                ).join("\n")}
                className="h-48 w-full resize-none border border-border/30 bg-background/50 p-3 font-mono text-xs leading-relaxed text-muted-foreground focus:border-accent/30 focus:outline-none"
                onClick={(e) => (e.target as HTMLTextAreaElement).select()}
              />
              <p className="mt-2 text-sm text-muted-foreground">
                Click to select all · Paste into your attributes.xml
              </p>
            </div>
          )}

          {/* How to Use */}
          <div className="border-t border-border/30 p-4 sm:p-6">
            <div className="mb-4 flex items-center gap-3">
              <Info className="h-4 w-4 text-accent" />
              <span className="font-display text-sm uppercase tracking-wider text-parchment">
                How to Use
              </span>
            </div>
            <ol className="space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="font-display text-accent">1.</span>
                <div className="space-y-2">
                  <span>
                    Open{" "}
                    <code className="border border-border/50 bg-muted/30 px-1.5 py-0.5 font-mono text-xs text-parchment">
                      attributes.xml
                    </code>{" "}
                    in your Hunt profiles folder:
                  </span>
                  <div className="space-y-1.5 pl-1">
                    <div className="flex items-start gap-2 mt-2">
                      <span className="text-xs text-muted-foreground/70">
                        Windows:
                      </span>
                      <code className="break-all border border-border/30 bg-muted/20 px-1.5 py-0.5 font-mono text-xs text-parchment/80">
                        .../Hunt Showdown/USER/profiles/default/attributes.xml
                      </code>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs text-muted-foreground/70">
                        Linux:
                      </span>
                      <code className="break-all border border-border/30 bg-muted/20 px-1.5 py-0.5 font-mono text-xs text-parchment/80">
                        .../Steam/steamapps/common/Hunt Showdown
                        1896/USER/Profiles/default/attributes.xml
                      </code>
                    </div>
                  </div>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-display text-accent">2.</span>
                <span>Copy values above and paste into the file</span>
              </li>
              <li className="flex gap-3">
                <span className="font-display text-accent">3.</span>
                <span>Save the file and restart the game</span>
              </li>
            </ol>
          </div>
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
        </a>{" "}
        for making this tool possible
      </p>
    </div>
  );
}
