import type { SVGProps } from 'react';

export default function ArrowExplorerSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="12"
      height="10"
      viewBox="0 0 12 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.75 4.76628L0.75 4.76628"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#D28A4C"
      />
      <path
        d="M6.71647 0.750049C6.71647 0.750049 10.7498 2.92405 10.7498 4.76538C10.7498 6.60805 6.71647 8.78271 6.71647 8.78271"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#D28A4C"
      />
    </svg>
  );
}
