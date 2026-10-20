import type { ReactNode, SVGProps } from "react";

/**
 * Small inline icons drawn for this project (no icon library dependency).
 * Icons are decorative: meaning is always carried by adjacent text.
 */

export type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function InfoIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5" />
      <path d="M12 7.6v.01" strokeWidth={2.5} />
    </BaseIcon>
  );
}

/** Filled circle with a check — "verified". Colour comes from `currentColor`. */
export function VerifiedIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="9.5" fill="currentColor" stroke="none" />
      <path d="m8 12.4 2.7 2.7L16.2 9.5" stroke="#ffffff" strokeWidth={2} />
    </BaseIcon>
  );
}

/** Filled triangle with a dark mark — "needs review". Legible on the warning yellow in both themes. */
export function ReviewIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 2.8 1.9 20.4h20.2L12 2.8Z" fill="currentColor" stroke="none" />
      <path d="M12 9.6v5" stroke="#0b0b0b" strokeWidth={2} />
      <path d="M12 17.4v.01" stroke="#0b0b0b" strokeWidth={2.6} />
    </BaseIcon>
  );
}

/** Dashed circle — "not yet verified" / "nothing here yet". */
export function PendingIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="8.5" strokeDasharray="3.2 3" />
    </BaseIcon>
  );
}

export function HistoryIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 12a8 8 0 1 0 2.4-5.7" />
      <path d="M4 4.5V9h4.5" />
      <path d="M12 8v4.3l2.8 1.7" />
    </BaseIcon>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.3 2" />
    </BaseIcon>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 3 5 5.8v5.4c0 4.4 2.9 8.2 7 9.8 4.1-1.6 7-5.4 7-9.8V5.8L12 3Z" />
      <path d="m9 12 2.2 2.2L15.2 10" />
    </BaseIcon>
  );
}

export function CalculatorIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8.5 7h7" />
      <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01M8.5 15h.01M12 15h.01M15.5 15h.01M8.5 18h.01M12 18h.01" strokeWidth={2.4} />
    </BaseIcon>
  );
}

export function DocumentIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M14 3H7.5A2.5 2.5 0 0 0 5 5.5v13A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5V8l-5-5Z" />
      <path d="M14 3v5h5" />
      <path d="M8.5 13h7M8.5 16.5h7" />
    </BaseIcon>
  );
}

export function ExternalLinkIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />
    </BaseIcon>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.3-4.3" />
    </BaseIcon>
  );
}

/** The site mark: a ledger page with ruled lines on a rounded tile. */
export function LogoMark(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" width="1em" height="1em" aria-hidden="true" focusable="false" {...props}>
      <rect width="32" height="32" rx="7" fill="currentColor" />
      <path
        d="M10 8.5h8.5l4 4V23a1.5 1.5 0 0 1-1.5 1.5H10A1.5 1.5 0 0 1 8.5 23V10A1.5 1.5 0 0 1 10 8.5Z"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M12 15.5h8M12 19h8" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
