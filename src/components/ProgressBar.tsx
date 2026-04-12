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
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>{label}</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div className="w-full bg-gray-800 rounded-full h-2">
        <div
          className="bg-stellar-purple h-2 rounded-full transition-all duration-300"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
