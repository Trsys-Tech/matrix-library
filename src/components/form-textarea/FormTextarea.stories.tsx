import { Meta, StoryObj } from "@storybook/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "../form/Form";
import { Button } from "../button/Button";
import { FormTextarea } from "./FormTextarea";

const meta = {
  title: "Form/FormTextarea",
  component: FormTextarea,
  args: {
    label: "label",
    name: "name",
    disabled: false,
    control: undefined,
  },
  argTypes: {
    control: {
      table: {
        disable: true,
      },
    },
    slotProps: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FormTextarea>;

export type Story = StoryObj<typeof meta>;

const formSchema = z.object({
  name: z.string().min(3),
});

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const form = useForm<z.infer<typeof formSchema>>({ defaultValues: { name: "" }, resolver: zodResolver(formSchema) });
  const handleSubmit = form.handleSubmit(data => console.log(data));
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="mtx-w-96 mtx-flex mtx-flex-col mtx-gap-2 mtx-items-end">
        {children}
      </form>
    </Form>
  );
};

export const Default: Story = {
  args: {
    label: "Label",
    name: "name",
    disabled: false,
    className: "mtx-w-full",
  },
  render: ({ ...args }) => (
    <FormWrapper>
      <FormTextarea {...args} />
    </FormWrapper>
  ),
};

export const InForm: Story = {
  args: {
    label: "Label",
    name: "name",
    disabled: false,
    className: "mtx-w-full",
  },
  render: ({ ...args }) => (
    <FormWrapper>
      <FormTextarea {...args} />
      <Button type="submit" className="mtx-w-24">
        Submit
      </Button>
    </FormWrapper>
  ),
};

export default meta;
