import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  argTypes: {
    className: {
      control: false,
      description: "Additional classes to apply to the component.",
    },
  },
  parameters: {
    layout: "centered",
    controls: {
      disable: true,
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab-1" className="mtx-w-96">
      <TabsList aria-label="Example tabs">
        <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab-2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab-3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1">Tab 1 content</TabsContent>
      <TabsContent value="tab-2">Tab 2 content</TabsContent>
      <TabsContent value="tab-3">Tab 3 content</TabsContent>
    </Tabs>
  ),
};

export default meta;
