import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuTrigger } from "./ContextMenu";

const meta = {
  title: "Components/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof ContextMenu>;

type Story = StoryObj<typeof meta>;

const onItemSelect = fn();

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="mtx-flex mtx-items-center mtx-justify-center mtx-p-2 mtx-w-52 mtx-h-40 mtx-border mtx-border-gray-200 mtx-rounded-sm">
          Right click me
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onSelect={() => onItemSelect("Profile")}>Profile</ContextMenuItem>
        <ContextMenuItem onSelect={() => onItemSelect("Billing")}>Billing</ContextMenuItem>
        <ContextMenuItem onSelect={() => onItemSelect("Team")}>Team</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem disabled>Subscription</ContextMenuItem>
        <ContextMenuItem onSelect={() => onItemSelect("Settings")}>
          Settings
          <ContextMenuShortcut>⌘S</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export default meta;
