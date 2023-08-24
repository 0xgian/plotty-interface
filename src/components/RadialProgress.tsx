import clsx from "clsx";

export default function RadialProgress({
  fraction,
  size = 20,
  width = 2,
  activeRatio = 0.92,
  activeSize = 28,
}: {
  fraction: [number, number];
  size?: number;
  width?: number;
  activeRatio?: number;
  activeSize?: number;
}) {
  const ratio = fraction[0] / fraction[1];

  const exactSize = ratio >= activeRatio ? activeSize : size;

  const r = exactSize / 2;
  const circumference = 2 * (22 / 7) * r;
  const center = r + width / 2;

  const margin = (exactSize - activeSize) / 2;

  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: activeSize + width,
        aspectRatio: 1,
        marginLeft: margin,
        marginRight: margin,
      }}
    >
      <svg
        className="transform -rotate-90"
        style={{ width: exactSize + width, aspectRatio: 1 }}
      >
        <circle
          cx={center}
          cy={center}
          r={r}
          stroke="currentColor"
          stroke-width={width}
          fill="transparent"
          className="opacity-10"
        />

        <circle
          cx={center}
          cy={center}
          r={r}
          stroke="currentColor"
          stroke-width={width}
          fill="transparent"
          stroke-dasharray={circumference}
          stroke-dashoffset={circumference - Math.min(ratio, 1) * circumference}
          className={clsx(
            ratio < activeRatio
              ? "text-primary"
              : ratio > 1
              ? "text-red-500"
              : "text-yellow-500"
          )}
        />
      </svg>
      {exactSize === activeSize && (
        <span
          className={clsx(
            "absolute text-xs leading-none",
            ratio > 1 && "text-red-500"
          )}
        >
          {fraction[1] - fraction[0]}
        </span>
      )}
    </div>
  );
}
