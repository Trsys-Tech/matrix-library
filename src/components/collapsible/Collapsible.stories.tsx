import { Meta, StoryObj, Decorator } from "@storybook/react/*";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./Collapsible";

const withCustomClass: Decorator = Story => (
  <div className="flex justify-center items-start">
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
    className: "w-96",
  },
  render: ({ ...props }) => (
    <Collapsible {...props}>
      <CollapsibleTrigger className="flex justify-between w-full">Collapsibe title</CollapsibleTrigger>
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
