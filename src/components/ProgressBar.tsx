interface Props {
  /** 0–100 */
  percent: number;
  label?: string;
}

export default function ProgressBar({ percent, label }: Props) {
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <div>
      {label && (
        <div className="flex justify-between text-sm text-ink-muted mb-1">
          <span>{label}</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div className="w-full bg-border rounded-pill h-2 overflow-hidden">
        <div
          className="bg-accent h-2 rounded-pill transition-all duration-300"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
