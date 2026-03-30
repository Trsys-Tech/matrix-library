import { ChevronDown } from "@trsys-tech/matrix-icons";
import { Meta, StoryObj, Decorator } from "@storybook/react/*";

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
  argTypes: {},
} satisfies Meta<typeof Collapsible>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "mtx-w-96",
  },
  render: ({ ...props }) => (
    <Collapsible {...props}>
      <CollapsibleTrigger className="mtx-group mtx-flex mtx-justify-between mtx-w-full">
        Collapsibe title
        <ChevronDown className="mtx-text-primary mtx-w-6 mtx-h-6 group-data-[state='open']:mtx-rotate-180 mtx-transition-transform mtx-ms-auto" />
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
