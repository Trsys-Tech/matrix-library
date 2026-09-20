import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calendar, ChevronRight, House } from "@trsys-tech/matrix-icons";

import { Button } from "../button/Button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../collapsible/Collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "./Sidebar";

const meta = {
  title: "Components/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: {
      disable: true,
    },
  },
  argTypes: {
    className: {
      control: false,
      description: "Additional classes to apply to the component.",
    },
    side: {
      control: false,
      description: "The side of the screen where the sidebar is displayed, either left or right.",
      table: {
        type: { summary: "left | right" },
      },
    },
    variant: {
      control: "select",
      description: "The visual style of the sidebar, either sidebar or drawer.",
      table: {
        type: { summary: "sidebar | floating | inset | sheet" },
      },
    },
    collapsible: {
      control: "select",
      description: "The collapsible behavior of the sidebar, either offcanvas, icon, or none.",
      table: {
        type: { summary: "offcanvas | icon | none" },
      },
    },
    width: {
      control: false,
      description: "The width of the sidebar when it is expanded.",
      table: {
        type: { summary: "string" },
      },
      defaultValue: {
        summary: "16rem",
      },
    },
    widthMobile: {
      control: false,
      description: "The width of the sidebar when it is expanded on mobile devices.",
      table: {
        type: { summary: "string" },
      },
      defaultValue: {
        summary: "18rem",
      },
    },
  },
} satisfies Meta<typeof Sidebar>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    const [open, setOpen] = useState(false);
    return (
      <div className="mtx-h-96 mtx-flex mtx-flex-col mtx-overflow-hidden">
        <SidebarProvider open={open} onOpenChange={setOpen}>
          <Sidebar {...args}>
            <SidebarContent className="mtx-relative mtx-bg-white">
              <SidebarTrigger
                type="button"
                aria-label="Toggle sidebar"
                className="mtx-absolute mtx-end-0 mtx-top-0 mtx-flex mtx-items-center mtx-justify-center mtx-bg-gray-100 mtx-rounded-sm mtx-z-10 mtx-transition-transform mtx-rotate-180 group-data-[state=collapsed]:mtx-rotate-0"
              >
                <ChevronRight className="mtx-w-4 mtx-h-4" />
              </SidebarTrigger>
              <SidebarGroup>
                <SidebarGroupLabel>Platform</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="dashboard">
                      <House />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset className="mtx-p-4">
            <div>This is the main content</div>
            <div className="mtx-flex mtx-justify-between">
              <Button type="button" onClick={() => setOpen(prev => !prev)}>
                Toggle Sidebar
              </Button>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    );
  },
};

export const WithRightAndLeft: Story = {
  render: function Render() {
    const [leftOpen, setLeftOpen] = useState(false);
    const [rightOpen, setRightOpen] = useState(false);

    return (
      <div className="mtx-h-svh mtx-flex mtx-flex-col mtx-overflow-hidden">
        <div className="mtx-w-screen mtx-h-8.5 mtx-bg-gray-50">Header</div>
        <SidebarProvider open={rightOpen} onOpenChange={setRightOpen}>
          <SidebarProvider open={leftOpen} onOpenChange={setLeftOpen}>
            <Sidebar collapsible="icon" variant="sidebar" side="left" width="12rem">
              <SidebarContent className="mtx-bg-white">
                <SidebarGroup>
                  <SidebarGroupLabel>Platform</SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="dashboard">
                        <House />
                        <span>Dashboard</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <SidebarInset className="mtx-p-4">
              <div>This is the main content</div>
              <div className="mtx-flex mtx-justify-between">
                <Button type="button" onClick={() => setLeftOpen(prev => !prev)}>
                  Toggle Sidebar Left
                </Button>
                <Button type="button" onClick={() => setRightOpen(prev => !prev)}>
                  Toggle Sidebar Right
                </Button>
              </div>
            </SidebarInset>
          </SidebarProvider>
          <Sidebar collapsible="offcanvas" variant="sidebar" side="right" widthMobile="12rem">
            <SidebarContent className="mtx-bg-gray-0">
              <SidebarGroup>
                <SidebarGroupLabel>Platform</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="dashboard">
                      <span>Watch</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
          </Sidebar>
        </SidebarProvider>
      </div>
    );
  },
};

export const WithLeft: Story = {
  render: function Render() {
    return (
      <div className="mtx-h-screen">
        <SidebarProvider>
          <Sidebar collapsible="icon" variant="sidebar" side="left" width="12rem" widthIcon="4rem">
            <SidebarContent className="mtx-relative mtx-bg-gray-0 mtx-pt-8">
              <SidebarTrigger
                type="button"
                aria-label="Toggle sidebar"
                className="mtx-absolute mtx-end-0 mtx-top-0 mtx-flex mtx-items-center mtx-justify-center mtx-bg-gray-100 mtx-rounded-sm mtx-z-10 mtx-transition-transform mtx-rotate-180 group-data-[state=collapsed]:mtx-rotate-0"
              >
                <ChevronRight className="mtx-w-4 mtx-h-4" />
              </SidebarTrigger>
              <SidebarGroup>
                <SidebarGroupLabel>Platform</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="dashboard" isActive>
                      <House />
                      <span>Home and children</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="calendar">
                      <Calendar />
                      <span>Calendar</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupLabel>Platform</SidebarGroupLabel>
                <SidebarMenu>
                  <Collapsible asChild className="mtx-group/collapsible mtx-rounded-e-none mtx-border-0 mtx-shadow-none">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild className="mtx-p-2">
                        <SidebarMenuButton tooltip="Users & Access">
                          <House />
                          <span>Users &amp; Access</span>
                          <ChevronRight className="mtx-ml-auto mtx-transition-transform mtx-duration-200 group-data-[state=open]/collapsible:mtx-rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mtx-p-0">
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton isActive>Users</SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton>Roles</SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset className="mtx-p-4">
            <div>This is the main content</div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    );
  },
};

export default meta;
