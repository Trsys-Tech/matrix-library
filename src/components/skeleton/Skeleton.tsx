import { cn } from "../../lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mtx-animate-pulse mtx-rounded-md mtx-bg-primary/10 ", className)} {...props} />;
}
Skeleton.displayName = "Skeleton";
type SkeletonProps = React.ComponentProps<typeof Skeleton>;

export { Skeleton, type SkeletonProps };
