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
        <div className="mtx-space-y-1">
          <h4 className="mtx-text-sm mtx-font-medium mtx-leading-none">UI Components</h4>
          <p className="mtx-text-sm mtx-text-muted-foreground">A UI component library.</p>
        </div>
        <Separator className="mtx-my-4" />
        <div className="mtx-flex mtx-h-5 mtx-items-center mtx-space-x-4 mtx-text-sm">
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
