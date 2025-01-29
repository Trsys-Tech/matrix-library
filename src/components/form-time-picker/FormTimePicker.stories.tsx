/* eslint-disable camelcase */
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Meta, StoryObj } from "@storybook/react/*";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "../form/Form";
import { Button } from "../button/Button";
import { FormTimePicker } from "./FormTimePicker";

const meta = {
  title: "Form/FormTimePicker",
  component: FormTimePicker,
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
} satisfies Meta<typeof FormTimePicker>;

export type Story = StoryObj<typeof meta>;

const formSchema = z.object({
  time: z.object(
    {
      hour: z.number({ required_error: "Hours is required" }).nonnegative({ message: "Hour is required" }),
      minute: z.number({ required_error: "Minutes is required" }).nonnegative({ message: "Minute is required" }),
      ampm: z
        .union([z.literal("AM"), z.literal("PM")], { required_error: "AM/PM is required" })
        .refine(value => value !== null, { message: "AM/PM is required" }),
    },
    { required_error: "Time is required" },
  ),
});

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const form = useForm<z.infer<typeof formSchema>>({ defaultValues: { time: undefined }, resolver: zodResolver(formSchema) });

  const handleSubmit = form.handleSubmit(data => console.log(data));
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="w-56 flex flex-col gap-2 items-end">
        {children}
      </form>
    </Form>
  );
};

export const Default: Story = {
  args: {
    label: "Label",
    name: "time",
    disabled: false,
    className: "w-full",
  },
  render: ({ ...args }) => (
    <FormWrapper>
      <FormTimePicker {...args} />
    </FormWrapper>
  ),
};

export const InForm: Story = {
  args: {
    label: "Label",
    name: "time",
    disabled: false,
    className: "w-96",
  },
  render: ({ ...args }) => (
    <FormWrapper>
      <FormTimePicker {...args} />
      <Button type="submit" className="w-24">
        Submit
      </Button>
    </FormWrapper>
  ),
};

export default meta;
