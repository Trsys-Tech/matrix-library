"use client";

import React from "react";

import { cn } from "../../lib/utils";
import { tv, VariantProps } from "tailwind-variants";
import { Star } from "@trsys-tech/matrix-icons";

const ratingVariants = tv({
  base: "mtx-flex mtx-items-center mtx-gap-0",
  variants: {
    variant: {
      default: "mtx-text-yellow-400",
      primary: "mtx-text-primary",
      secondary: "mtx-text-secondary",
      success: "mtx-text-success",
      danger: "mtx-text-danger",
      warning: "mtx-text-warning",
      info: "mtx-text-info",
    },
    size: {
      sm: "[&_*_svg]:mtx-h-5 [&_*_svg]:mtx-w-5",
      md: "[&_*_svg]:mtx-h-6 [&_*_svg]:mtx-w-6",
      lg: "[&_*_svg]:mtx-h-8 [&_*_svg]:mtx-w-8",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  precision?: "half" | "full";
  variant?: VariantProps<typeof ratingVariants>["variant"];
  size?: VariantProps<typeof ratingVariants>["size"];
  readOnly?: boolean;
  value?: number;
  onValueChange?: (value: number) => void;
  children?: React.ReactNode;
  disabled?: boolean;
  max?: number;
  Icon?: React.JSXElementConstructor<React.SVGProps<SVGSVGElement>>;
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>((props, ref) => {
  const {
    precision = "full",
    variant,
    size,
    readOnly = false,
    onValueChange,
    value: _value = 0,
    className,
    children,
    max = 5,
    Icon = Star,
    disabled,
    ...restProps
  } = props;

  const [value, setValue] = React.useState(_value);
  const [hoveredValue, setHoveredValue] = React.useState<number | null>(null);

  const displayedValue = hoveredValue ?? value;

  React.useEffect(() => {
    setValue(_value);
  }, [_value]);

  const handleValueChange = (newValue: number) => {
    if (readOnly) return;
    setValue(newValue);
    onValueChange?.(newValue);
  };

  const handleHover = (newValue: number | null) => {
    if (readOnly) return;
    setHoveredValue(newValue);
  };

  return (
    <div
      className={cn(ratingVariants({ variant, size, className }))}
      role="slider"
      data-value={value}
      aria-valuenow={displayedValue}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuetext={`${displayedValue} out of ${max}`}
      {...restProps}
      ref={ref}
    >
      {Array.from({ length: max }).map((_, index) => (
        <RatingItem
          Icon={Icon}
          index={index}
          key={index}
          displayedValue={displayedValue}
          onHover={handleHover}
          onValueChange={handleValueChange}
          precision={precision}
          readOnly={readOnly}
          disabled={disabled}
        />
      ))}
      {children}
    </div>
  );
});

type RatingItemProps = {
  Icon: React.JSXElementConstructor<React.SVGProps<SVGSVGElement>>;
  index: number;
  onHover: (value: number | null) => void;
  onValueChange: (value: number) => void;
  displayedValue: number;
  precision: "half" | "full";
  readOnly: boolean;
  disabled?: boolean;
};

const RatingItem = ({ Icon, index, displayedValue, onHover, onValueChange, precision, readOnly, disabled }: RatingItemProps) => {
  if (precision === "half") {
    return (
      <div
        className={cn(
          "mtx-relative hover:mtx-scale-125 mtx-transition-transform mtx-px-0.5",
          readOnly && "hover:mtx-scale-100",
          disabled && "hover:mtx-scale-100 mtx-opacity-70",
        )}
      >
        <Icon className={cn("mtx-stroke-gray-500")} />
        <button
          type="button"
          className={cn(
            "mtx-absolute mtx-top-0 mtx-w-[calc(50%+2px)] mtx-left-0 mtx-overflow-hidden mtx-h-full",
            readOnly && "mtx-cursor-default",
            disabled && "mtx-cursor-default hover:mtx-scale-100 mtx-opacity-70",
          )}
          onClick={() => onValueChange(index + 0.5)}
          onMouseEnter={() => onHover(index + 0.5)}
          onMouseLeave={() => onHover(null)}
          disabled={disabled}
          aria-label={`Set rating to ${index + 0.5}`}
        >
          <Icon
            className={cn(
              "mtx-stroke-none mtx-absolute mtx-left-0.5 mtx-top-0 mtx-[mask-image:linear-gradient(to_right,_black_50%,_transparent_50%)]",
              displayedValue >= index + 0.5 && "mtx-stroke-current mtx-fill-current",
            )}
          />
        </button>
        <button
          type="button"
          className={cn(
            "mtx-absolute mtx-top-0 mtx-w-[calc(50%+2px)] mtx-right-0 mtx-overflow-hidden mtx-h-full",
            readOnly && "mtx-cursor-default",
            disabled && "mtx-cursor-default hover:mtx-scale-100 mtx-opacity-70",
          )}
          onClick={() => onValueChange(index + 1)}
          onMouseEnter={() => onHover(index + 1)}
          onMouseLeave={() => onHover(null)}
          disabled={disabled}
          aria-label={`Set rating to ${index + 1}`}
        >
          <Icon
            className={cn(
              "mtx-stroke-none mtx-absolute mtx-right-0.5 mtx-top-0 mtx-[mask-image:linear-gradient(to_left,_black_50%,_transparent_50%)]",
              displayedValue >= index + 1 && "mtx-stroke-current mtx-fill-current",
            )}
          />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onValueChange(index + 1)}
      onMouseEnter={() => onHover(index + 1)}
      onMouseLeave={() => onHover(null)}
      className={cn(
        "hover:mtx-scale-125 mtx-px-0.5 mtx-transition-transform",
        readOnly && "mtx-cursor-default hover:mtx-scale-100",
        disabled && "mtx-cursor-default hover:mtx-scale-100 mtx-opacity-70",
      )}
      disabled={disabled}
      aria-label={`Set rating to ${index + 1}`}
    >
      <Icon className={cn("mtx-stroke-gray-500", displayedValue >= index + 1 && "mtx-stroke-current mtx-fill-current")} />
    </button>
  );
};

export { Rating, type RatingProps };
