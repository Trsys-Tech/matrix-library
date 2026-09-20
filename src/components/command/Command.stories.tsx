import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calculator, Calendar, CreditCard, Settings, Smile, User } from "lucide-react";

import { Button } from "../button/Button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./Command";

const meta = {
  title: "Components/Command",
  component: Command,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    className: {
      control: false,
      description: "Additional classes to apply to the component.",
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Command>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "mtx-rounded-lg mtx-border mtx-shadow-md md:mtx-min-w-[450px]",
  },
  render: props => (
    <Command {...props}>
      <CommandInput aria-label="Search commands" placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <Smile />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem disabled>
            <Calculator />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const WithCommandDialog: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: () => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpen(open => !open);
        }
      };

      document.addEventListener("keydown", down);
      return () => document.removeEventListener("keydown", down);
    }, []);

    return (
      <>
        <div className="mtx-flex mtx-flex-col mtx-items-center mtx-gap-2">
          <Button type="button" onClick={() => setOpen(true)}>
            Open command menu
          </Button>
          <p className="mtx-text-sm mtx-text-muted-foreground">
            Press{" "}
            <kbd className="mtx-pointer-events-none mtx-inline-flex mtx-h-5 mtx-select-none mtx-items-center mtx-gap-1 mtx-rounded mtx-border mtx-bg-muted mtx-px-1.5 mtx-font-mono mtx-text-[10px] mtx-font-medium mtx-text-muted-foreground mtx-opacity-100">
              ⌘/Ctrl+J
            </kbd>
          </p>
        </div>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput aria-label="Search commands" placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <Calendar />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem>
                <Smile />
                <span>Search Emoji</span>
              </CommandItem>
              <CommandItem>
                <Calculator />
                <span>Calculator</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <User />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <CreditCard />
                <span>Billing</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Settings />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>
    );
  },
};

export default meta;
