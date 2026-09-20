import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./Skeleton";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  argTypes: {
    className: {
      control: false,
      description: "Additional classes to apply to the component.",
    },
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div aria-hidden="true" className="mtx-flex mtx-items-center mtx-space-x-4">
      <Skeleton className="mtx-h-12 mtx-w-12 mtx-rounded-full" />
      <div className="mtx-space-y-2">
        <Skeleton className="mtx-h-4 mtx-w-[250px]" />
        <Skeleton className="mtx-h-4 mtx-w-[200px]" />
      </div>
    </div>
  ),
};

export default meta;
