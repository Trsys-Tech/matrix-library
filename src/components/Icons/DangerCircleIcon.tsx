import { SVGProps } from "react";

export function DangerCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="12" fill="#981c1c" />
      <path
        d="M12 4.757a7.242 7.242 0 1 0 0 14.485 7.242 7.242 0 0 0 0-14.485ZM6.116 12c0-1.378.48-2.644 1.276-3.624l8.258 8.258a6.001 6.001 0 0 1-3.65 1.25A5.89 5.89 0 0 1 6.116 12Zm10.492 3.624L8.351 7.391A5.855 5.855 0 0 1 12 6.115 5.89 5.89 0 0 1 17.884 12a5.74 5.74 0 0 1-1.276 3.624Z"
        fill="#fff"
      />
    </svg>
  );
}
