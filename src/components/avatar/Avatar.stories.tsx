import { Meta } from "@storybook/react/*";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  args: {},
  tags: ["autodocs"],
};

export const Default = () => {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default meta;
