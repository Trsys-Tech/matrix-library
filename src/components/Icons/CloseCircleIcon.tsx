import { SVGProps } from "react";

export function CloseCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M15.755 8.203a1.125 1.125 0 0 0-1.591 0L12 10.411 9.755 8.203a1.125 1.125 0 1 0-1.591 1.591L10.368 12l-2.165 2.204a1.125 1.125 0 1 0 1.591 1.591L12 13.59l2.205 2.205a1.125 1.125 0 1 0 1.59-1.591l-2.204-2.205 2.204-2.204a1.094 1.094 0 0 0-.04-1.59zM12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0Zm0 21.75c-5.377 0-9.75-4.374-9.75-9.75S6.623 2.25 12 2.25s9.75 4.374 9.75 9.75-4.373 9.75-9.75 9.75z" />
    </svg>
  );
}
