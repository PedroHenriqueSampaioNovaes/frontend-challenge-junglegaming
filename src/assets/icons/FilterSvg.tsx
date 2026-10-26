import type { SVGProps } from 'react';

export default function FilterSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g stroke="currentColor" strokeWidth="1.75">
        <circle cx="6.1" cy="6.25" r="2.35" />
        <path d="M11.6 6.25H18.15" />
        <path d="M3.45 15.75H10" />
        <circle cx="15.5" cy="15.75" r="2.35" />
      </g>
    </svg>
  );
}
