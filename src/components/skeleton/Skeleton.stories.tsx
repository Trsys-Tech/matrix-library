import { Meta, StoryObj } from "@storybook/react/*";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
};

export const Default: StoryObj<typeof meta> = {
  render: () => {
    return (
      <div className="mtx-flex mtx-items-center mtx-space-x-4">
        <Skeleton className="mtx-h-12 mtx-w-12 mtx-rounded-full" />
        <div className="mtx-space-y-2">
          <Skeleton className="mtx-h-4 mtx-w-[250px]" />
          <Skeleton className="mtx-h-4 mtx-w-[200px]" />
        </div>
      </div>
    );
  },
};

export default meta;
