import type { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

type AvatarStoryArgs = ComponentProps<typeof Avatar> & {
  src: string;
  alt: string;
  fallback: string;
};

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    src: "https://github.com/shadcn.png",
    alt: "Avatar",
    fallback: "CN",
  },
  argTypes: {
    className: {
      control: false,
      description: "Additional classes to apply to the component.",
    },
    src: {
      control: "text",
      description: "Image source passed to AvatarImage.",
    },
    alt: {
      control: "text",
      description: "Alternative text passed to AvatarImage.",
    },
    fallback: {
      control: "text",
      description: "Text displayed by AvatarFallback while the image is unavailable.",
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<AvatarStoryArgs>;

type Story = StoryObj<AvatarStoryArgs>;

export const Default: Story = {
  render: ({ src, alt, fallback, ...avatarProps }) => (
    <Avatar {...avatarProps}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  ),
};

export default meta;
