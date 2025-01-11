import { Meta, StoryObj } from "@storybook/react/*";
import { ConfirmProvider, useConfirm } from "./Confirm";
import { Button } from "../button/Button";

const meta: Meta = {
  title: "Components/Confirm",
  tags: ["autodocs"],
  argTypes: {},
};

type Story = StoryObj<typeof meta>;

const Wrapper = () => {
  return (
    <ConfirmProvider>
      <Component />
    </ConfirmProvider>
  );
};

const Component = () => {
  const confirm = useConfirm();
  const handleConfirm = () => {
    confirm({ title: "Title", description: "Are you sure you want to do this?" })
      .then(() => {
        console.log("confirmed");
      })
      .catch(() => {
        {
          console.log("canceled");
        }
      });
  };

  return <Button onClick={handleConfirm}>Open Confirm</Button>;
};

export const Default: Story = {
  render: () => {
    return <Wrapper />;
  },
};

export default meta;
