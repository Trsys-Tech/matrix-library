import { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  argTypes: {
    children: {},
  },
  tags: ["autodocs"],
};

export const Default: StoryObj<typeof meta> = {
  render: () => {
    return (
      <Tabs defaultValue="tab-1">
        <TabsList className="">
          <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab-2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab-3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab-1">Tab 1 content</TabsContent>
        <TabsContent value="tab-2">Tab 2 content</TabsContent>
        <TabsContent value="tab-3">Tab 3 content</TabsContent>
      </Tabs>
    );
  },
};

export default meta;
