import React from "react";
import { Meta } from "@storybook/react";
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
                      Dashboard
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
              <SidebarGroup />
            </SidebarContent>
          </Sidebar>
          <SidebarInset className="mtx-p-4">
            <div>This is the main content</div>
            <div className="mtx-flex mtx-justify-between">
              <Button onClick={() => setLeftOpen(prev => !prev)}>Toggle Sidebar Left</Button>
              <Button onClick={() => setRightOpen(prev => !prev)}>Toggle Sidebar Right</Button>
            </div>
          </SidebarInset>
        </SidebarProvider>
        <Sidebar collapsible="offcanvas" variant="sidebar" side="right" widthMobile="12rem">
          <SidebarContent className="mtx-bg-gray-0">
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
    <div className="mtx-h-screen">
      <SidebarProvider>
        <Sidebar collapsible="icon" variant="sidebar" side="left" width="12rem" widthIcon="4rem">
          <SidebarContent className="mtx-relative mtx-bg-gray-0 mtx-pt-8">
            <SidebarTrigger className="mtx-absolute mtx-end-0 mtx-top-0 mtx-flex mtx-items-center mtx-justify-center mtx-bg-gray-100 mtx-rounded-sm mtx-z-10 mtx-transition-transform mtx-rotate-180 group-data-[state=collapsed]:mtx-rotate-0">
              <ChevronRight className="mtx-w-4 mtx-h-4" />
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
                <Collapsible asChild className="mtx-group/collapsible mtx-rounded-e-none mtx-border-0 mtx-shadow-none">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild className="mtx-p-2">
                      <SidebarMenuButton tooltip="Users & Access">
                        <House /> Users & Access
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
};

export default meta;
