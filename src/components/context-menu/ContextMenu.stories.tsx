import { Meta } from "@storybook/react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "./ContextMenu";

const meta: Meta<typeof ContextMenu> = {
  title: "Components/ContextMenu",
  component: ContextMenu,
  args: {},
  tags: ["autodocs"],
};

export const Default = () => {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="mtx-flex mtx-items-center mtx-justify-center mtx-p-2 mtx-w-52 mtx-h-40 mtx-border mtx-border-gray-200 mtx-rounded-sm">
          Right click me
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuItem>Billing</ContextMenuItem>
        <ContextMenuItem>Team</ContextMenuItem>
        <ContextMenuItem>Subscription</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default meta;
