"use client";

import React from "react";

import { cn } from "../../lib/utils";
import { tv, VariantProps } from "tailwind-variants";
import { StarIcon } from "../Icons/StartIcon";

const ratingVariants = tv({
  base: "flex items-center gap-0",
  variants: {
    variant: {
      default: "text-yellow-400",
      primary: "text-primary",
      secondary: "text-secondary",
      success: "text-success",
      danger: "text-danger",
      warning: "text-warning",
      info: "text-info",
    },
    size: {
      sm: "[&_*_svg]:h-5 [&_*_svg]:w-5",
      md: "[&_*_svg]:h-6 [&_*_svg]:w-6",
      lg: "[&_*_svg]:h-8 [&_*_svg]:w-8",
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
    Icon = StarIcon,
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
          "relative hover:scale-125 transition-transform px-0.5",
          readOnly && "hover:scale-100",
          disabled && "hover:scale-100 opacity-70",
        )}
      >
        <Icon className={cn("stroke-gray-500")} />
        <button
          type="button"
          className={cn(
            "absolute top-0 w-[calc(50%+2px)] left-0 overflow-hidden h-full",
            readOnly && "cursor-default",
            disabled && "cursor-default hover:scale-100 opacity-70",
          )}
          onClick={() => onValueChange(index + 0.5)}
          onMouseEnter={() => onHover(index + 0.5)}
          onMouseLeave={() => onHover(null)}
          disabled={disabled}
          aria-label={`Set rating to ${index + 0.5}`}
        >
          <Icon
            className={cn(
              "stroke-none absolute left-0.5 top-0 [mask-image:linear-gradient(to_right,_black_50%,_transparent_50%)]",
              displayedValue >= index + 0.5 && "stroke-current fill-current",
            )}
          />
        </button>
        <button
          type="button"
          className={cn(
            "absolute top-0 w-[calc(50%+2px)] right-0 overflow-hidden h-full",
            readOnly && "cursor-default",
            disabled && "cursor-default hover:scale-100 opacity-70",
          )}
          onClick={() => onValueChange(index + 1)}
          onMouseEnter={() => onHover(index + 1)}
          onMouseLeave={() => onHover(null)}
          disabled={disabled}
          aria-label={`Set rating to ${index + 1}`}
        >
          <Icon
            className={cn(
              "stroke-none absolute right-0.5 top-0 [mask-image:linear-gradient(to_left,_black_50%,_transparent_50%)]",
              displayedValue >= index + 1 && "stroke-current fill-current",
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
        "hover:scale-125 px-0.5 transition-transform",
        readOnly && "cursor-default hover:scale-100",
        disabled && "cursor-default hover:scale-100 opacity-70",
      )}
      disabled={disabled}
      aria-label={`Set rating to ${index + 1}`}
    >
      <Icon className={cn("stroke-gray-500", displayedValue >= index + 1 && "stroke-current fill-current")} />
    </button>
  );
};

export { Rating, type RatingProps };
