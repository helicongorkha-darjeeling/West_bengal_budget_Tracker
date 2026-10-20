import type { ComponentType } from "react";
import {
  ACCOUNTING_STATUSES,
  VERIFICATION_STATUSES,
  type AccountingStatus,
  type VerificationStatus,
} from "@/lib/domain";
import {
  CalculatorIcon,
  ClockIcon,
  HistoryIcon,
  PendingIcon,
  ReviewIcon,
  ShieldIcon,
  VerifiedIcon,
  type IconProps,
} from "./icons";

interface Look {
  Icon: ComponentType<IconProps>;
  iconClass: string;
}

/** Status colours are reserved for verification state and always paired with an icon and a label. */
const VERIFICATION_LOOK: Record<VerificationStatus, Look> = {
  verified: { Icon: VerifiedIcon, iconClass: "text-good" },
  unverified: { Icon: PendingIcon, iconClass: "text-ink-2" },
  needs_review: { Icon: ReviewIcon, iconClass: "text-warning" },
  corrected: { Icon: HistoryIcon, iconClass: "text-ink-2" },
};

/** Accounting status is a property of the source document, not good or bad — so it uses neutral styling. */
const ACCOUNTING_LOOK: Record<AccountingStatus, Look> = {
  estimate: { Icon: CalculatorIcon, iconClass: "text-accent" },
  provisional: { Icon: ClockIcon, iconClass: "text-accent" },
  audited: { Icon: ShieldIcon, iconClass: "text-accent" },
};

const chip =
  "inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-0.5 text-xs font-medium text-ink";

export function VerificationBadge({ status }: { status: VerificationStatus }) {
  const { Icon, iconClass } = VERIFICATION_LOOK[status];
  return (
    <span className={chip}>
      <Icon className={`size-3.5 shrink-0 ${iconClass}`} />
      {VERIFICATION_STATUSES[status].label}
    </span>
  );
}

export function AccountingBadge({ status }: { status: AccountingStatus }) {
  const { Icon, iconClass } = ACCOUNTING_LOOK[status];
  return (
    <span className={chip}>
      <Icon className={`size-3.5 shrink-0 ${iconClass}`} />
      {ACCOUNTING_STATUSES[status].label}
    </span>
  );
}

/** Shown wherever a value will appear once verified data exists. */
export function AwaitingDataBadge({ label = "Awaiting verified data" }: { label?: string }) {
  return (
    <span className={chip}>
      <PendingIcon className="size-3.5 shrink-0 text-ink-2" />
      {label}
    </span>
  );
}

/** An empty value: a visible dash with a spoken explanation for screen-reader users. */
export function EmptyValue({ className = "" }: { className?: string }) {
  return (
    <span className={className}>
      <span aria-hidden="true">—</span>
      <span className="sr-only">No figure yet</span>
    </span>
  );
}
