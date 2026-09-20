import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";

import { Button } from "../button/Button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, type TooltipContentProps } from "./Tooltip";

type TooltipStoryArgs = ComponentProps<typeof Tooltip> & {
  content: string;
  contextProps: Pick<ComponentProps<typeof TooltipProvider>, "delayDuration" | "disableHoverableContent" | "skipDelayDuration">;
  contentProps: Pick<TooltipContentProps, "side" | "align" | "sideOffset" | "avoidCollisions">;
};

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  args: {
    content: "Add to library",
    contextProps: {
      delayDuration: 200,
      skipDelayDuration: 500,
      disableHoverableContent: false,
    },
    contentProps: {
      side: "top",
      align: "center",
      sideOffset: 4,
      avoidCollisions: true,
    },
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    content: {
      control: "text",
    },
    contextProps: {
      control: "object",
      description: "Propes forwarded to TooltipProvider",
      table: {
        category: "Tooltip Provider",
        type: {
          summary:
            "{delayDurarion: The duration from when the pointer enters the trigger until the tooltip gets opened. skipDelayDuration: 'How much time a user has to enter another trigger without incurring a delay again', disableHoverableContent: When true, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger.",
        },
      },
    },
    contentProps: {
      control: "object",
      description: "Props forwarded to TooltipContent to control placement and collision handling.",
      table: {
        category: "Tooltip content",
        type: {
          summary: "{ side: 'top | left | bottom | right', align: 'center | end| start', sideOffset: number, avoidCollisions: boolean }",
        },
        defaultValue: {
          summary: "{ side: 'top', align: 'center', sideOffset: 4, avoidCollisions: true }",
        },
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<TooltipStoryArgs>;

type Story = StoryObj<TooltipStoryArgs>;

export const Default: Story = {
  render: ({ content, contentProps, contextProps, ...args }) => (
    <TooltipProvider {...contextProps}>
      <Tooltip {...args}>
        <TooltipTrigger asChild>
          <Button type="button" variant="outline">
            Hover
          </Button>
        </TooltipTrigger>
        <TooltipContent {...contentProps}>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export default meta;
