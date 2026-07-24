type ProgressRingProps = {
  progress: number;
  children: React.ReactNode;
};

export function ProgressRing({ progress, children }: ProgressRingProps) {
  const radius = 116;
  const circumference = 2 * Math.PI * radius;
  const clampedProgress = Math.min(1, Math.max(0, progress));

  return (
    <div className="progress-ring">
      <svg viewBox="0 0 260 260" aria-hidden="true">
        <defs>
          <linearGradient id="timer-gradient" x1="24" y1="220" x2="226" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#e37552" />
            <stop offset="0.52" stopColor="#ef9d68" />
            <stop offset="1" stopColor="#f2c992" />
          </linearGradient>
        </defs>
        <circle className="progress-ring__track" cx="130" cy="130" r={radius} />
        <circle
          className="progress-ring__value"
          cx="130"
          cy="130"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - clampedProgress)}
        />
      </svg>
      <div className="progress-ring__content">{children}</div>
    </div>
  );
}
