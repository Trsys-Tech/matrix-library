import { Meta, StoryObj } from "@storybook/react/*";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "../form/Form";
import { Button } from "../button/Button";
import { FormDuration } from "./FormDuration";

const meta = {
  title: "Form/FormDuration",
  component: FormDuration,
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
} satisfies Meta<typeof FormDuration>;

export type Story = StoryObj<typeof meta>;

const formSchema = z.object({
  duration: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, "Invalid time format. Expected HH:MM"),
});

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const form = useForm<z.infer<typeof formSchema>>({ defaultValues: { duration: "01:23" }, resolver: zodResolver(formSchema) });
  const handleSubmit = form.handleSubmit(data => console.log(data));
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="w-96 flex flex-col gap-2 items-end">
        {children}
      </form>
    </Form>
  );
};

export const Default: Story = {
  args: {
    label: "Label",
    name: "duration",
    disabled: false,
    className: "w-full",
  },
  render: ({ ...args }) => (
    <FormWrapper>
      <FormDuration {...args} />
    </FormWrapper>
  ),
};

export const InForm: Story = {
  args: {
    label: "Label",
    name: "duration",
    disabled: false,
    className: "w-full",
  },
  render: ({ ...args }) => (
    <FormWrapper>
      <FormDuration {...args} />
      <Button type="submit" className="w-24">
        Submit
      </Button>
    </FormWrapper>
  ),
};

export default meta;
