import { Meta } from "@storybook/react/*";
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
        <div className="flex items-center justify-center p-2 w-52 h-40 border border-gray-200 rounded-sm">Right click me</div>
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
