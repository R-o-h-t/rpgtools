import React from "react";
import { Badge } from "./badge";

export interface BadgedProps {
  count: number;
  children: React.ReactNode;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  badgeProps?: React.ComponentProps<typeof Badge>;
  showZero?: boolean;
}

export const Badged = React.forwardRef<HTMLDivElement, BadgedProps>(
  ({ count, children, position = "top-right", badgeProps, showZero }, ref) => {
    return (
      <div className="relative" ref={ref}>
        {children}
        {(count !== 0 || showZero) && (
          <Badge
            className={`absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full px-2 py-1 ${position}`}
            {...badgeProps}
          >
            {count > 99 ? "99+" : count ?? null}
          </Badge>
        )}
      </div>
    );
  }
);

Badged.displayName = "Badged";
