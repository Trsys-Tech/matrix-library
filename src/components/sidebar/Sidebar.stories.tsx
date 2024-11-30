import React from "react";
import { Meta } from "@storybook/react/*";

import { Button } from "../button/Button";
import { HomeIcon } from "../Icons/HomeIcon";
import { EyeOpenIcon } from "../Icons/EyeOpenIcon";
import { CalendarIcon } from "../Icons/CalendarIcon";
import { ChevronRightIcon } from "../Icons/ChevronRightIcon";
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

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export const WithRightAndLeft = () => {
  const [leftOpen, setLeftOpen] = React.useState(false);
  const [rightOpen, setRightOpen] = React.useState(false);
  return (
    <SidebarProvider open={rightOpen} onOpenChange={setRightOpen}>
      <SidebarProvider open={leftOpen} onOpenChange={setLeftOpen}>
        <Sidebar collapsible="icon" variant="sidebar" side="left" width="12rem">
          <SidebarContent className="bg-white">
            <SidebarGroup>
              <SidebarGroupLabel>Platform</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="dashboard">
                    <HomeIcon />
                    Dashboard
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup />
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="p-4">
          <div>This is the main content</div>
          <div className="flex justify-between">
            <Button onClick={() => setLeftOpen(prev => !prev)}>Toggle Sidebar Left</Button>
            <Button onClick={() => setRightOpen(prev => !prev)}>Toggle Sidebar Right</Button>
          </div>
        </SidebarInset>
      </SidebarProvider>
      <Sidebar collapsible="offcanvas" variant="sidebar" side="right" widthMobile="12rem">
        <SidebarContent className="bg-gray-0">
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="dashboard">
                  Watch
                  <EyeOpenIcon />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </SidebarProvider>
  );
};

export const WithLeft = () => {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" variant="sidebar" side="left" width="12rem" widthIcon="4rem">
        <SidebarContent className="relative bg-gray-0 pt-8">
          <SidebarTrigger className="absolute end-0 top-0 flex items-center justify-center bg-gray-100 rounded-sm z-10 transition-transform rotate-180 group-data-[state=collapsed]:rotate-0">
            <ChevronRightIcon className="w-4 h-4" />
          </SidebarTrigger>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="dashboard" isActive>
                  <HomeIcon />
                  Home and children
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="calendar">
                  <CalendarIcon />
                  Calendar
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
              <Collapsible asChild className="group/collapsible rounded-e-none border-0 shadow-none">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild className="p-2">
                    <SidebarMenuButton tooltip="Users & Access">
                      <HomeIcon /> Users & Access
                      <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-0">
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
      <SidebarInset className="p-4">
        <div>This is the main content</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default meta;
