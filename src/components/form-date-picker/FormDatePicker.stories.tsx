import { Meta, StoryObj } from "@storybook/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "../form/Form";
import { FormDatePicker } from "./FormDatePicker";
import { Button } from "../button/Button";

const meta = {
  title: "Form/FormDatePicker",
  component: FormDatePicker,
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
} satisfies Meta<typeof FormDatePicker>;

export type Story = StoryObj<typeof meta>;

const formSchema = z.object({
  date: z.date({ error: "Date is required" }),
});

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const form = useForm<z.infer<typeof formSchema>>({ defaultValues: { date: undefined }, resolver: zodResolver(formSchema) });
  const handleSubmit = form.handleSubmit(data => console.log(data));
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
    name: "date",
    disabled: false,
    className: "mtx-w-full",
  },
  render: ({ ...args }) => (
    <FormWrapper>
      <FormDatePicker {...args} />
    </FormWrapper>
  ),
};

export const InForm: Story = {
  args: {
    label: "Label",
    name: "date",
    disabled: false,
    className: "mtx-w-96",
  },
  render: ({ ...args }) => (
    <FormWrapper>
      <FormDatePicker {...args} />
      <Button type="submit" className="mtx-w-24">
        Submit
      </Button>
    </FormWrapper>
  ),
};

export default meta;
