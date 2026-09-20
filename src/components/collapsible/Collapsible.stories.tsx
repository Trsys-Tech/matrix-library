import { ChevronDown } from "@trsys-tech/matrix-icons";
import { fn } from "storybook/test";
import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";

import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./Collapsible";

const withCustomClass: Decorator = Story => (
  <div className="mtx-flex mtx-justify-center mtx-items-start">
    <Story />
  </div>
);

const meta = {
  title: "Components/Collapsible",
  component: Collapsible,
  decorators: [withCustomClass],
  tags: ["autodocs"],
  args: {
    onOpenChange: fn(),
  },
  argTypes: {
    className: {
      control: false,
      description: "Additional classes to apply to the component.",
    },
    defaultOpen: {
      control: "boolean",
    },
    open: {
      control: false,
      description: "Use defaultOpen for the uncontrolled behavior demonstrated by this story.",
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Collapsible>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "mtx-w-96",
    defaultOpen: false,
  },
  render: props => (
    <Collapsible {...props}>
      <CollapsibleTrigger className="mtx-group mtx-flex mtx-justify-between mtx-w-full">
        Collapsible title
        <ChevronDown
          aria-hidden
          className="mtx-text-primary mtx-w-6 mtx-h-6 group-data-[state='open']:mtx-rotate-180 mtx-transition-transform mtx-ms-auto"
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit odio maiores, earum impedit nisi recusandae eligendi! Quibusdam mollitia modi
          voluptatum.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export default meta;
