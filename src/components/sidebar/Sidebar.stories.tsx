import React from "react";
import { Meta } from "@storybook/react/*";
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
    <div className="h-svh flex flex-col overflow-hidden">
      <div className="w-screen h-8.5 bg-gray-50">Header</div>
      <SidebarProvider open={rightOpen} onOpenChange={setRightOpen}>
        <SidebarProvider open={leftOpen} onOpenChange={setLeftOpen}>
          <Sidebar collapsible="icon" variant="sidebar" side="left" width="12rem">
            <SidebarContent className="bg-white">
              <SidebarGroup>
                <SidebarGroupLabel>Platform</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="dashboard">
                      <House />
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
                  <SidebarMenuButton tooltip="dashboard">Watch</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup />
          </SidebarContent>
          <SidebarFooter />
        </Sidebar>
      </SidebarProvider>
    </div>
  );
};

export const WithLeft = () => {
  return (
    <div className="h-screen">
      <SidebarProvider>
        <Sidebar collapsible="icon" variant="sidebar" side="left" width="12rem" widthIcon="4rem">
          <SidebarContent className="relative bg-gray-0 pt-8">
            <SidebarTrigger className="absolute end-0 top-0 flex items-center justify-center bg-gray-100 rounded-sm z-10 transition-transform rotate-180 group-data-[state=collapsed]:rotate-0">
              <ChevronRight className="w-4 h-4" />
            </SidebarTrigger>
            <SidebarGroup>
              <SidebarGroupLabel>Platform</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="dashboard" isActive>
                    <House />
                    Home and children
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="calendar">
                    <Calendar />
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
                        <House /> Users & Access
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
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
    </div>
  );
};

export default meta;
