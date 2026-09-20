import { z } from "zod";
import { useForm } from "react-hook-form";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import type { ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "../form/Form";
import { Button } from "../button/Button";
import { FormTimePicker } from "./FormTimePicker";

const meta = {
  title: "Form/FormTimePicker",
  component: FormTimePicker,
  args: {
    label: "Label",
    name: "name",
    disabled: false,
    control: undefined,
  },
  argTypes: {
    className: {
      control: false,
      description: "Additional classes to apply to the component.",
    },
    control: {
      table: {
        disable: true,
      },
    },
    defaultValue: {
      table: {
        disable: true,
      },
    },
    name: {
      table: {
        disable: true,
      },
    },
    rules: {
      table: {
        disable: true,
      },
    },
    shouldUnregister: {
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
      hour: z.number({ error: "Hours is required" }).nonnegative({ message: "Hour is required" }),
      minute: z.number({ error: "Minutes is required" }).nonnegative({ message: "Minute is required" }),
      ampm: z
        .union([z.literal("AM"), z.literal("PM")], { error: "AM/PM is required" })
        .refine(value => value !== null, { message: "AM/PM is required" }),
    },
    { error: "Time is required" },
  ),
});

const onSubmit = fn();

const FormWrapper = ({ children }: { children: ReactNode }) => {
  const form = useForm<z.infer<typeof formSchema>>({ defaultValues: { time: undefined }, resolver: zodResolver(formSchema) });

  const handleSubmit = form.handleSubmit(onSubmit);
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="mtx-w-56 mtx-flex mtx-flex-col mtx-gap-2 mtx-items-end">
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
    className: "mtx-w-full",
  },
  render: args => (
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
    required: true,
    className: "mtx-w-96",
  },
  render: args => (
    <FormWrapper>
      <FormTimePicker {...args} />
      <Button type="submit" className="mtx-w-24">
        Submit
      </Button>
    </FormWrapper>
  ),
};

export default meta;
