import { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./Card";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Card>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: ({ ...props }) => (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, at.</CardDescription>
      </CardHeader>
      <CardContent>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, et. Rerum consequuntur odio velit voluptatibus dolorem amet deserunt. Optio,
        voluptates.
      </CardContent>
      <CardFooter className="mtx-justify-end mtx-gap-2">
        <Button variant="danger" className="mtx-w-24">
          Cancel
        </Button>
        <Button className="mtx-w-24">Ok</Button>
      </CardFooter>
    </Card>
  ),
};

export default meta;
