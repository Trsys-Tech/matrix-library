import { Meta } from "@storybook/react";
import {
  SwipableDrawer,
  SwipableDrawerContent,
  SwipableDrawerDescription,
  SwipableDrawerHeader,
  SwipableDrawerTitle,
  SwipableDrawerTrigger,
} from "./SwipableDrawer";

const meta: Meta<typeof SwipableDrawer> = {
  title: "Components/SwipableDrawer",
  component: SwipableDrawer,
  tags: ["autodocs"],
};

export const Default = () => {
  return (
    <SwipableDrawer>
      <SwipableDrawerTrigger>Toggle</SwipableDrawerTrigger>
      <SwipableDrawerContent className="mtx-h-72">
        <SwipableDrawerHeader>
          <SwipableDrawerTitle>Edit profile</SwipableDrawerTitle>
          <SwipableDrawerDescription>Edit profile</SwipableDrawerDescription>
        </SwipableDrawerHeader>
        <div className="mtx-p-4">This is the content</div>
      </SwipableDrawerContent>
    </SwipableDrawer>
  );
};

export default meta;
