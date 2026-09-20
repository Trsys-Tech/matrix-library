import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  SwipableDrawer,
  SwipableDrawerContent,
  SwipableDrawerDescription,
  SwipableDrawerHeader,
  SwipableDrawerTitle,
  SwipableDrawerTrigger,
} from "./SwipableDrawer";

const meta = {
  title: "Components/SwipableDrawer",
  component: SwipableDrawer,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    shouldScaleBackground: true,
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    onOpenChange: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof SwipableDrawer>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <SwipableDrawer {...args}>
      <SwipableDrawerTrigger>Toggle</SwipableDrawerTrigger>
      <SwipableDrawerContent className="mtx-h-72">
        <SwipableDrawerHeader>
          <SwipableDrawerTitle>Edit profile</SwipableDrawerTitle>
          <SwipableDrawerDescription>Make changes to your profile.</SwipableDrawerDescription>
        </SwipableDrawerHeader>
        <div className="mtx-p-4">This is the content</div>
      </SwipableDrawerContent>
    </SwipableDrawer>
  ),
};

export default meta;
