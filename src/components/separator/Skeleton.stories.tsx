import { Meta, StoryObj } from "@storybook/react/*";
import { Separator } from "./Separator";

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"],
};

export const Default: StoryObj<typeof meta> = {
  render: () => {
    return (
      <div>
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">UI Components</h4>
          <p className="text-sm text-muted-foreground">A UI component library.</p>
        </div>
        <Separator className="my-4" />
        <div className="flex h-5 items-center space-x-4 text-sm">
          <div>Blog</div>
          <Separator orientation="vertical" />
          <div>Docs</div>
          <Separator orientation="vertical" />
          <div>Source</div>
        </div>
      </div>
    );
  },
};

export default meta;
