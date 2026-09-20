import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactNode } from "react";

import { Form } from "../form/Form";
import { FormInput } from "./FormInput";
import { Button } from "../button/Button";

const meta = {
  title: "Form/FormInput",
  component: FormInput,
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
} satisfies Meta<typeof FormInput>;

export type Story = StoryObj<typeof meta>;

const formSchema = z.object({
  name: z.string().min(3),
});

const onSubmit = fn();

const FormWrapper = ({ children }: { children: ReactNode }) => {
  const form = useForm<z.infer<typeof formSchema>>({ defaultValues: { name: "" }, resolver: zodResolver(formSchema) });
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
    name: "name",
    disabled: false,
    className: "mtx-w-full",
  },
  render: args => (
    <FormWrapper>
      <FormInput {...args} />
    </FormWrapper>
  ),
};

export const InForm: Story = {
  args: {
    label: "Label",
    name: "name",
    disabled: false,
    required: true,
    className: "mtx-w-full",
  },
  render: args => (
    <FormWrapper>
      <FormInput {...args} />
      <Button type="submit" className="mtx-w-24">
        Submit
      </Button>
    </FormWrapper>
  ),
};

export const Numeric: Story = {
  args: {
    label: "Label",
    name: "name",
    disabled: false,
    readOnly: true,
    required: true,
    className: "mtx-w-full",
  },
  tags: ["autodocs"],
  render: args => (
    <FormWrapper>
      <FormInput {...args} slotProps={{ textFieldProps: { slotProps: { inputProps: { type: "number" } } } }} />
      <Button type="submit" className="mtx-w-24">
        Submit
      </Button>
    </FormWrapper>
  ),
};

export default meta;
