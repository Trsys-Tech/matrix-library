import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactNode } from "react";

import { Form } from "../form/Form";
import { Button } from "../button/Button";
import { FormDuration } from "./FormDuration";

const meta = {
  title: "Form/FormDuration",
  component: FormDuration,
  args: {
    label: "Label",
    name: "name",
    disabled: false,
    showSeconds: false,
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
    showSeconds: { control: "boolean" },
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FormDuration>;

export type Story = StoryObj<typeof meta>;

const formSchema = z.object({
  duration: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/, "Invalid time format. Expected HH:MM or HH:MM:SS"),
});

const onSubmit = fn();

const FormWrapper = ({ children }: { children: ReactNode }) => {
  const form = useForm<z.infer<typeof formSchema>>({ defaultValues: { duration: "01:23" }, resolver: zodResolver(formSchema) });
  const handleSubmit = form.handleSubmit(onSubmit);
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
    name: "duration",
    disabled: false,
    className: "mtx-w-full",
  },
  render: args => (
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
    required: true,
    className: "mtx-w-full",
  },
  render: args => (
    <FormWrapper>
      <FormDuration {...args} />
      <Button type="submit" className="mtx-w-24">
        Submit
      </Button>
    </FormWrapper>
  ),
};

export default meta;
