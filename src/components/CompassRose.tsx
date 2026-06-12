// Compass rose, by way of the record shop: a platter with a tonearm whose
// needle rides toward N. Pure charm — drawn in the basemap's own ink and
// kept quiet in a corner.
export default function CompassRose({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 76"
      width={54}
      height={64}
      className={className}
      aria-hidden
    >
      <text
        x="30"
        y="12"
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
        fill="#564b3d"
        style={{ fontFamily: "var(--font-oswald), sans-serif" }}
      >
        N
      </text>
      <g stroke="#564b3d" fill="none">
        <circle
          cx="30"
          cy="46"
          r="22"
          fill="rgba(250,245,234,0.5)"
          strokeWidth="1.3"
        />
        <circle cx="30" cy="46" r="17.5" strokeWidth="0.7" opacity="0.45" />
        <circle cx="30" cy="46" r="13" strokeWidth="0.7" opacity="0.45" />
        <circle cx="30" cy="46" r="6.5" strokeWidth="1" opacity="0.85" />
        <circle cx="30" cy="46" r="1.3" fill="#564b3d" stroke="none" />
        <circle cx="55" cy="64" r="2.6" strokeWidth="1.2" />
        <path
          d="M55 64 L51 40 L36 27"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M36 27 L31.5 22.5" strokeWidth="2.6" strokeLinecap="round" />
      </g>
    </svg>
  );
}
